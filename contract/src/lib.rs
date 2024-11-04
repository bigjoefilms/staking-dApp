use concordium_std::*;
use core::fmt::Debug;
use std::collections::BTreeMap;

// ======== Type Definitions ========

#[derive(Serialize, SchemaType, Clone, Debug)]
pub struct StakingParams {
    minimum_stake: Amount,
    maximum_stake: Amount, // Added maximum stake limit
    reward_rate: u64,
    unbonding_period: u64,
    accepting_stakes: bool,
    slashing_rate: u64,  // Added slashing rate (in basis points)
    auto_compound: bool, // Added auto-compound flag
}

#[derive(Serialize, SchemaType, Clone, Debug)]
pub struct Unbounding {
    amount: Amount,
    unlock_time: Timestamp,
}

#[derive(Serialize, SchemaType, Clone)]
pub struct StakerInfo {
    staked_amount: Amount,
    last_reward_timestamp: Timestamp,
    pending_rewards: Amount,
    unbonding: Vec<Unbounding>,
    slashed: bool, // Track if staker has been slashed
}

#[derive(Serialize, SchemaType)]
pub struct State {
    admin: AccountAddress,
    params: StakingParams,
    total_staked: Amount,
    stakers_history: BTreeMap<AccountAddress, StakerInfo>,
    active_stakers: BTreeMap<AccountAddress, StakerInfo>,
}

#[derive(Debug, Serialize, Clone)]
enum StakingEvent {
    Staked {
        staker: AccountAddress,
        amount: Amount,
    },
    UnstakingInitiated {
        staker: AccountAddress,
        amount: Amount,
        unlock_time: Timestamp,
    },
    UnstakingCompleted {
        staker: AccountAddress,
        amount: Amount,
    },
    RewardsClaimed {
        staker: AccountAddress,
        amount: Amount,
    },
    ParamsUpdated {
        new_params: StakingParams,
    },
    Slashed {
        staker: AccountAddress,
        amount: Amount,
    },
    RewardsCompounded {
        staker: AccountAddress,
        amount: Amount,
    },
}

#[derive(Debug, PartialEq, Eq, Reject, Serial, Clone, SchemaType)]
enum StakingError {
    ParseParamsError,
    NotAdmin,
    StakingDisabled,
    InsufficientStakeAmount,
    ExcessiveStakeAmount,
    InsufficientBalance,
    NoStakeFound,
    TransferError,
    NoUnbondingFound,
    ArithmeticError,
    AlreadySlashed,
    // InvalidAmount,
}

// ======== Contract Implementation ========

#[init(contract = "staking", parameter = "StakingParams")]
fn contract_init(ctx: &InitContext, _state_builder: &mut StateBuilder) -> InitResult<State> {
    let params = StakingParams {
        minimum_stake: Amount::from_micro_ccd(1000),
        maximum_stake: Amount::from_micro_ccd(1_000_000_000), // 1000 CCD
        reward_rate: 1000,
        unbonding_period: 86400,
        accepting_stakes: true,
        slashing_rate: 500, // 5% in basis points
        auto_compound: false,
    };

    Ok(State {
        admin: ctx.init_origin(),
        params,
        total_staked: Amount::from_micro_ccd(0),
        stakers_history: BTreeMap::new(),
        active_stakers: BTreeMap::new(),
    })
}

#[receive(
    contract = "staking",
    name = "stake",
    payable,
    error = "StakingError",
    mutable
)]
fn stake(ctx: &ReceiveContext, host: &mut Host<State>, amount: Amount) -> Result<(), StakingError> {
    let state = host.state_mut();

    ensure!(state.params.accepting_stakes, StakingError::StakingDisabled);
    ensure!(
        amount >= state.params.minimum_stake,
        StakingError::InsufficientStakeAmount
    );
    ensure!(
        amount <= state.params.maximum_stake,
        StakingError::ExcessiveStakeAmount
    );

    let staker = ctx.sender();
    let staker_account = match staker {
        Address::Account(account_addr) => account_addr,
        _ => return Err(StakingError::NoStakeFound),
    };

    let mut staker_info = if let Some(info) = state.stakers_history.get(&staker_account) {
        ensure!(!info.slashed, StakingError::AlreadySlashed);

        let pending =
            calculate_pending_rewards(info, state.params.reward_rate, ctx.metadata().slot_time())?;
        let mut updated_info = info.clone();

        if state.params.auto_compound {
            // Auto-compound by adding pending rewards to staked amount
            updated_info.staked_amount = updated_info
                .staked_amount
                .checked_add(pending)
                .ok_or(StakingError::ArithmeticError)?;

            // Emit compounding event
            // host.emit(&StakingEvent::RewardsCompounded {
            //     staker: staker_account,
            //     amount: pending,
            // });
        } else {
            updated_info.pending_rewards = updated_info
                .pending_rewards
                .checked_add(pending)
                .ok_or(StakingError::ArithmeticError)?;
        }
        updated_info
    } else {
        StakerInfo {
            staked_amount: Amount::from_micro_ccd(0),
            last_reward_timestamp: ctx.metadata().slot_time(),
            pending_rewards: Amount::from_micro_ccd(0),
            unbonding: Vec::new(),
            slashed: false,
        }
    };

    staker_info.staked_amount = staker_info
        .staked_amount
        .checked_add(amount)
        .ok_or(StakingError::ArithmeticError)?;
    staker_info.last_reward_timestamp = ctx.metadata().slot_time();

    state.total_staked = state
        .total_staked
        .checked_add(amount)
        .ok_or(StakingError::ArithmeticError)?;

    state
        .stakers_history
        .insert(staker_account, staker_info.clone());
    state
        .active_stakers
        .insert(staker_account, staker_info.clone());

    // Emit staking event
    // host.emit(&StakingEvent::Staked {
    //     staker: staker_account,
    //     amount,
    // });

    Ok(())
}

#[derive(Serialize, SchemaType)]
pub struct UnstakeParam {
    amount: Amount,
}

#[receive(
    contract = "staking",
    name = "initiate_unstake",
    error = "StakingError",
    parameter = "UnstakeParam",
    mutable
)]
fn initiate_unstake(ctx: &ReceiveContext, host: &mut Host<State>) -> ReceiveResult<()> {
    let state = host.state_mut();
    let staker = ctx.sender();

    let staker_account = match staker {
        Address::Account(account_addr) => account_addr,
        _ => return Err(StakingError::NoStakeFound.into()),
    };

    let params: UnstakeParam = ctx
        .parameter_cursor()
        .get()
        .map_err(|_| StakingError::ParseParamsError)?;

    // Get a reference to the staker info
    let staker_info_ref = state
        .stakers_history
        .get(&staker_account)
        .ok_or(StakingError::NoStakeFound)?;

    // Create a mutable copy that we'll modify
    let mut staker_info = staker_info_ref.clone();

    ensure!(!staker_info.slashed, StakingError::AlreadySlashed.into());
    ensure!(
        staker_info.staked_amount >= params.amount,
        StakingError::InsufficientBalance.into()
    );

    let pending = calculate_pending_rewards(
        &staker_info,
        state.params.reward_rate,
        ctx.metadata().slot_time(),
    )?;

    if state.params.auto_compound {
        staker_info.staked_amount = staker_info
            .staked_amount
            .checked_add(pending)
            .ok_or(StakingError::ArithmeticError)?;
    } else {
        staker_info.pending_rewards = staker_info
            .pending_rewards
            .checked_add(pending)
            .ok_or(StakingError::ArithmeticError)?;
    }

    staker_info.staked_amount = staker_info
        .staked_amount
        .checked_sub(params.amount)
        .ok_or(StakingError::ArithmeticError)?;

    let unlock_time = ctx
        .metadata()
        .slot_time()
        .checked_add(Duration::from_seconds(state.params.unbonding_period))
        .ok_or(StakingError::ArithmeticError)?;

    // Push to unbonding vector
    staker_info.unbonding.push(Unbounding {
        amount: params.amount,
        unlock_time,
    });

    // Update total staked amount
    state.total_staked = state
        .total_staked
        .checked_sub(params.amount)
        .ok_or(StakingError::ArithmeticError)?;

    // Update the state with the modified staker info
    state.stakers_history.insert(
        staker_account,
        StakerInfo {
            last_reward_timestamp: staker_info.last_reward_timestamp,
            pending_rewards: staker_info.pending_rewards,
            staked_amount: staker_info.staked_amount,
            unbonding: staker_info.unbonding,
            slashed: staker_info.slashed,
        },
    );

    Ok(())
}

#[receive(
    contract = "staking",
    name = "complete_unstake",
    error = "StakingError",
    mutable
)]
fn complete_unstake(ctx: &ReceiveContext, host: &mut Host<State>) -> Result<(), StakingError> {
    let state = host.state_mut();
    let staker = ctx.sender();
    let staker_account = match staker {
        Address::Account(account_addr) => account_addr,
        _ => return Err(StakingError::NoStakeFound),
    };

    let staker_info = state
        .stakers_history
        .get_mut(&staker_account)
        .ok_or(StakingError::NoStakeFound)?;

    ensure!(!staker_info.slashed, StakingError::AlreadySlashed);

    let current_time = ctx.metadata().slot_time();
    let mut total_withdrawal = Amount::from_micro_ccd(0);

    staker_info.unbonding.retain(
        |Unbounding {
             amount,
             unlock_time,
         }| {
            if current_time >= *unlock_time {
                total_withdrawal = total_withdrawal
                    .checked_add(*amount)
                    .expect("Withdrawal amount overflow");
                false
            } else {
                true
            }
        },
    );

    ensure!(
        total_withdrawal > Amount::from_micro_ccd(0),
        StakingError::NoUnbondingFound
    );

    // Apply slashing if needed
    if staker_info.slashed {
        let slash_amount = total_withdrawal
            .micro_ccd()
            .checked_mul(state.params.slashing_rate as u64)
            .and_then(|v| v.checked_div(10000))
            .ok_or(StakingError::ArithmeticError)?;

        total_withdrawal = Amount::from_micro_ccd(
            total_withdrawal
                .micro_ccd()
                .checked_sub(slash_amount)
                .ok_or(StakingError::ArithmeticError)?,
        );
    }

    host.invoke_transfer(&staker_account, total_withdrawal)
        .map_err(|_| StakingError::TransferError)?;

    Ok(())
}
#[receive(
    contract = "staking",
    name = "claim_rewards",
    error = "StakingError",
    mutable
)]
fn claim_rewards(ctx: &ReceiveContext, host: &mut Host<State>) -> Result<(), StakingError> {
    let state = host.state_mut();
    let staker = ctx.sender();

    let staker_account = match staker {
        Address::Account(account_addr) => account_addr,
        _ => return Err(StakingError::NoStakeFound),
    };

    // Scope to limit the mutable borrow of `state`
    let (pending_rewards, staker_empty) = {
        let staker_info = state
            .stakers_history
            .get_mut(&staker_account)
            .ok_or(StakingError::NoStakeFound)?;

        ensure!(!staker_info.slashed, StakingError::AlreadySlashed);

        let pending = calculate_pending_rewards(
            &staker_info,
            state.params.reward_rate,
            ctx.metadata().slot_time(),
        )?;

        let total_rewards = staker_info
            .pending_rewards
            .checked_add(pending)
            .ok_or(StakingError::ArithmeticError)?;

        // Ensure rewards are greater than zero
        ensure!(
            total_rewards > Amount::zero(),
            StakingError::InsufficientBalance
        );

        // Reset rewards and update the last reward timestamp
        staker_info.pending_rewards = Amount::zero();
        staker_info.last_reward_timestamp = ctx.metadata().slot_time();

        // Check if staker should be removed after claiming rewards
        let is_empty = staker_info.staked_amount == Amount::from_micro_ccd(0)
            && staker_info.unbonding.is_empty();

        (total_rewards, is_empty)
    };

    if staker_empty {
        state.active_stakers.remove(&staker_account);
    }

    // Transfer rewards after mutable borrow of `state` is released
    host.invoke_transfer(&staker_account, pending_rewards)
        .map_err(|_| StakingError::TransferError)?;

    Ok(())
}

#[receive(contract = "staking", name = "slash", error = "StakingError", mutable)]
fn slash(ctx: &ReceiveContext, host: &mut Host<State>) -> Result<(), StakingError> {
    let state = host.state_mut();

    ensure!(
        ctx.sender() == Address::Account(state.admin),
        StakingError::NotAdmin
    );

    let params: AccountAddress = ctx
        .parameter_cursor()
        .get()
        .map_err(|_| StakingError::ParseParamsError)?;

    let staker_info = state
        .stakers_history
        .get_mut(&params)
        .ok_or(StakingError::NoStakeFound)?;

    ensure!(!staker_info.slashed, StakingError::AlreadySlashed);

    // Calculate slash amount
    let slash_amount = staker_info
        .staked_amount
        .micro_ccd()
        .checked_mul(state.params.slashing_rate as u64)
        .and_then(|v| v.checked_div(10000))
        .ok_or(StakingError::ArithmeticError)?;

    let slash_amount = Amount::from_micro_ccd(slash_amount);

    // Update staker's slashed status
    staker_info.slashed = true;
    staker_info.staked_amount = staker_info
        .staked_amount
        .checked_sub(slash_amount)
        .ok_or(StakingError::ArithmeticError)?;

    // Emit slashing event
    // host.emit(&StakingEvent::Slashed {
    //     staker: params,
    //     amount: slash_amount,
    // });

    Ok(())
}

#[receive(
    contract = "staking",
    name = "update_params",
    parameter = "StakingParams",
    error = "StakingError",
    mutable
)]
fn update_params(ctx: &ReceiveContext, host: &mut Host<State>) -> Result<(), StakingError> {
    let state = host.state_mut();

    let params = ctx
        .parameter_cursor()
        .get()
        .map_err(|_| StakingError::ParseParamsError)?;

    ensure!(
        ctx.sender() == Address::Account(state.admin),
        StakingError::NotAdmin
    );

    // Emit params updated event
    // host.emit(&StakingEvent::ParamsUpdated {
    //     new_params: params.clone(),
    // });

    state.params = params;

    Ok(())
}

// #[receive(
//     contract = "staking",
//     name = "transfer_to_contact",
//     error = "StakingError",
//     payable,
//     mutable
// )]
// fn trasfer_to_contract(
//     _ctx: &ReceiveContext,
//     _host: &mut Host<State>,
//     amount: Amount,
// ) -> Result<(), StakingError> {
//     if amount.micro_ccd == 0 {
//         return Err(StakingError::InvalidAmount);
//     }

//     Ok(())
// }

// ======== Helper Functions ========

/// Calculates pending rewards with safety checks and overflow protection
fn calculate_pending_rewards(
    staker_info: &StakerInfo,
    reward_rate: u64,
    current_time: Timestamp,
) -> Result<Amount, StakingError> {
    if staker_info.staked_amount == Amount::zero() || staker_info.slashed {
        return Ok(Amount::from_micro_ccd(0));
    }

    let duration_since_last_reward = current_time
        .duration_since(staker_info.last_reward_timestamp)
        .ok_or(StakingError::ArithmeticError)?;

    let time_staked = duration_since_last_reward.seconds();

    // Use u128 for intermediate calculations to prevent overflow
    let staked_micro_ccd = staker_info.staked_amount.micro_ccd() as u128;

    // Calculate reward: (staked_amount * reward_rate * time_staked) / (365 * 24 * 60 * 60 * 10000)
    // The 10000 divisor is because reward_rate is in basis points (1% = 100)
    let reward = staked_micro_ccd
        .checked_mul(reward_rate as u128)
        .and_then(|v| v.checked_mul(time_staked as u128))
        .and_then(|v| v.checked_div(365 * 24 * 60 * 60 * 10000u128))
        .ok_or(StakingError::ArithmeticError)?;

    // Ensure reward doesn't exceed u64::MAX before converting
    if reward > u64::MAX as u128 {
        return Err(StakingError::ArithmeticError);
    }

    Ok(Amount::from_micro_ccd(reward as u64))
}

/// View function to get staker information, including current pending rewards.
#[receive(
    contract = "staking",
    name = "view_staker_info",
    parameter = "AccountAddress",
    return_value = "Option<StakerInfo>",
    mutable
)]
fn view_staker_info(
    ctx: &ReceiveContext,
    host: &mut Host<State>,
) -> ReceiveResult<Option<StakerInfo>> {
    let state = host.state();

    let staker_account: AccountAddress = ctx.parameter_cursor().get()?;

    // Retrieve staker information
    if let Some(staker_info) = state.stakers_history.get(&staker_account) {
        // Calculate pending rewards based on the last reward timestamp
        let additional_pending_rewards = calculate_pending_rewards(
            &staker_info,
            state.params.reward_rate,
            ctx.metadata().slot_time(),
        )?;

        // Update the `pending_rewards` field to reflect both stored and additional pending rewards
        let total_pending_rewards = staker_info
            .pending_rewards
            .checked_add(additional_pending_rewards)
            .ok_or(StakingError::ArithmeticError)?;

        // Return updated staker info with total pending rewards
        Ok(Some(StakerInfo {
            staked_amount: staker_info.staked_amount,
            last_reward_timestamp: staker_info.last_reward_timestamp,
            pending_rewards: total_pending_rewards,
            unbonding: staker_info.unbonding.clone(),
            slashed: staker_info.slashed,
        }))
    } else {
        // If the staker account is not found, return None
        Ok(None)
    }
}

/// View function to get current staking parameters
#[receive(
    contract = "staking",
    name = "view_staking_params",
    return_value = "StakingParams"
)]
fn view_staking_params(_ctx: &ReceiveContext, host: &Host<State>) -> ReceiveResult<StakingParams> {
    Ok(host.state().params.clone())
}

#[derive(Serialize, SchemaType, Clone, Debug)]
pub struct ViewState {
    total_staked: Amount,
    stakers_length: u64,
    active_stakers: u64,
}

/// View function to get total staked amount
#[receive(contract = "staking", name = "view_state", return_value = "ViewState")]
fn view_state(_ctx: &ReceiveContext, host: &Host<State>) -> ReceiveResult<ViewState> {
    let state = host.state();

    Ok(ViewState {
        total_staked: state.total_staked,
        stakers_length: state.stakers_history.len() as u64,
        active_stakers: state.active_stakers.len() as u64,
    })
}
