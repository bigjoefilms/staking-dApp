use concordium_std::*;

// Contract state
#[derive(Serialize, SchemaType, Clone)]
pub struct State {
    stakes: StateMap<AccountAddress, Stake>,
    total_staked: Amount,
    daily_reward_rate: u64, // Basis points (1/10000)
    owner: AccountAddress,
}

// Stake structure
#[derive(Serialize, SchemaType, Clone)]
pub struct Stake {
    amount: Amount,
    token_type: TokenType,
    start_time: Timestamp,
    duration: Duration,
    accumulated_reward: Amount,
}

// Token types
#[derive(Serialize, SchemaType, Clone, PartialEq)]
pub enum TokenType {
    CCD,
    CID2,
}

// Contract events
#[derive(Serialize, SchemaType, Clone)]
pub enum Event {
    Staked(AccountAddress, Amount, TokenType, Duration),
    Unstaked(AccountAddress, Amount, Amount), // (address, principal, reward)
    RewardRateUpdated(u64),
}

// Custom errors
#[derive(Debug, PartialEq, Eq, Reject, Serial, SchemaType)]
enum ContractError {
    ParseParamsError,
    StakeNotFound,
    StakingPeriodNotCompleted,
    InsufficientFunds,
    UnauthorizedOperation,
}

// Contract functions
#[init(contract = "staking", enable_logger, parameter = "AccountAddress")]
fn contract_init(
    ctx: &InitContext,
    state_builder: &mut StateBuilder,
) -> InitResult<State> {
    let owner = ctx.parameter_cursor().get()?;
    Ok(State {
        stakes: StateMap::new(state_builder),
        total_staked: Amount::from_micro_ccd(0),
        daily_reward_rate: 10, // 0.1% daily reward as default
        owner,
    })
}

#[receive(
    contract = "staking",
    name = "stake",
    payable,
    enable_logger,
    parameter = "Duration"
)]
fn stake(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
    amount: Amount,
) -> Result<(), ContractError> {
    let sender = ctx.sender();
    let duration: Duration = ctx.parameter_cursor().get()?;

    let stake = Stake {
        amount,
        token_type: TokenType::CCD,
        start_time: ctx.metadata().slot_time(),
        duration,
        accumulated_reward: Amount::zero(),
    };

    host.state_mut().stakes.insert(sender, stake);
    host.state_mut().total_staked = host.state().total_staked.add(amount);

    host.logger().log(&Event::Staked(sender, amount, TokenType::CCD, duration))?;

    Ok(())
}

#[receive(
    contract = "staking",
    name = "stake_cid2",
    enable_logger,
    parameter = "(ContractAddress, u64, Duration)"
)]
fn stake_cid2(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
) -> Result<(), ContractError> {
    let sender = ctx.sender();
    let params: (ContractAddress, u64, Duration) = ctx.parameter_cursor().get()?;
    let (token_address, amount, duration) = params;

    let amount = Amount::from_micro_ccd(amount);

    // Transfer CID-2 tokens from sender to this contract
    host.invoke_contract(
        &token_address,
        &(sender, host.self_address(), amount.micro_ccd()),
        EntrypointName::new("transfer").unwrap(),
        Amount::zero(),
    )?;

    let stake = Stake {
        amount,
        token_type: TokenType::CID2,
        start_time: ctx.metadata().slot_time(),
        duration,
        accumulated_reward: Amount::zero(),
    };

    host.state_mut().stakes.insert(sender, stake);
    host.state_mut().total_staked = host.state().total_staked.add(amount);

    host.logger().log(&Event::Staked(sender, amount, TokenType::CID2, duration))?;

    Ok(())
}

#[receive(contract = "staking", name = "unstake", enable_logger)]
fn unstake(ctx: &ReceiveContext, host: &mut Host<State>) -> Result<(), ContractError> {
    let sender = ctx.sender();
    let stake = host.state().stakes.get(&sender).ok_or(ContractError::StakeNotFound)?;

    let current_time = ctx.metadata().slot_time();
    let staking_period = current_time.duration_between(&stake.start_time);

    if staking_period < stake.duration {
        return Err(ContractError::StakingPeriodNotCompleted);
    }

    let reward = calculate_reward(&stake, staking_period, host.state().daily_reward_rate);

    // Transfer staked amount + reward back to the user
    let total_amount = stake.amount.add(reward);
    if stake.token_type == TokenType::CCD {
        host.invoke_transfer(&sender, total_amount)?;
    } else {
        // Transfer CID-2 tokens back to the user
        let token_address = host.state().stakes.get(&sender).unwrap().token_address;
        host.invoke_contract(
            &token_address,
            &(host.self_address(), sender, total_amount.micro_ccd()),
            EntrypointName::new("transfer").unwrap(),
            Amount::zero(),
        )?;
    }

    host.state_mut().stakes.remove(&sender);
    host.state_mut().total_staked = host.state().total_staked.sub(stake.amount);

    host.logger().log(&Event::Unstaked(sender, stake.amount, reward))?;

    Ok(())
}

#[receive(
    contract = "staking",
    name = "update_reward_rate",
    enable_logger,
    parameter = "u64"
)]
fn update_reward_rate(ctx: &ReceiveContext, host: &mut Host<State>) -> Result<(), ContractError> {
    let sender = ctx.sender();
    ensure!(sender == host.state().owner, ContractError::UnauthorizedOperation);

    let new_rate: u64 = ctx.parameter_cursor().get()?;
    host.state_mut().daily_reward_rate = new_rate;

    host.logger().log(&Event::RewardRateUpdated(new_rate))?;

    Ok(())
}

// View functions
#[receive(contract = "staking", name = "view_stake", return_value = "Option<Stake>")]
fn view_stake(ctx: &ReceiveContext, host: &Host<State>) -> ReceiveResult<Option<Stake>> {
    let sender = ctx.sender();
    Ok(host.state().stakes.get(&sender).cloned())
}

#[receive(contract = "staking", name = "view_total_staked", return_value = "Amount")]
fn view_total_staked(_ctx: &ReceiveContext, host: &Host<State>) -> ReceiveResult<Amount> {
    Ok(host.state().total_staked)
}

// New function to view accumulated reward
#[receive(contract = "staking", name = "view_accumulated_reward", return_value = "Amount")]
fn view_accumulated_reward(ctx: &ReceiveContext, host: &Host<State>) -> ReceiveResult<Amount> {
    let sender = ctx.sender();
    let stake = host.state().stakes.get(&sender).ok_or(ContractError::StakeNotFound)?;

    let current_time = ctx.metadata().slot_time();
    let staking_period = current_time.duration_between(&stake.start_time);

    let reward = calculate_reward(&stake, staking_period, host.state().daily_reward_rate);
    Ok(reward)
}

// Helper function to calculate rewards
fn calculate_reward(stake: &Stake, staking_period: Duration, daily_reward_rate: u64) -> Amount {
    let days_staked = staking_period.millis() / (86400 * 1000); // 86400000 milliseconds in a day
    let base_reward_rate = (daily_reward_rate as u128) * (days_staked as u128);
    
    // Increase reward rate for longer staking periods
    let bonus_rate = match stake.duration.millis() / (86400 * 1000) {
        d if d >= 365 => 50, // 50% bonus for 1 year or more
        d if d >= 180 => 25, // 25% bonus for 6 months or more
        d if d >= 90 => 10,  // 10% bonus for 3 months or more
        _ => 0,
    };
    
    let total_reward_rate = base_reward_rate + (base_reward_rate * bonus_rate as u128) / 100;
    let reward = ((stake.amount.micro_ccd() as u128 * total_reward_rate) / 1_000_000) as u64;
    Amount::from_micro_ccd(reward)
}
