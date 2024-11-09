# Concordium Staking

An implementation for staking CCD tokens on the Concordium blockchain with features for reward distribution, unbonding, and slashing.

## Features

- Token staking with minimum and maximum stake limits
- Automatic reward calculation and distribution
- Configurable unbonding period
- Auto-compound rewards option
- Slashing mechanism for protocol violations
- Administrative controls for parameter updates
- Frontend dApp for easy interaction
- Comprehensive technical documentation

## Key Functions

- `stake`: Stake CCD tokens and earn rewards
- `initiate_unstake`: Begin the token unbonding process
- `complete_unstake`: Withdraw unbonded tokens
- `claim_rewards`: Claim accumulated staking rewards
- `view_staker_info`: Check staking position and rewards
- `view_staking_params`: View current staking parameters

## Configuration

Initial parameters include:
- Minimum stake: 1,000 microCCD
- Maximum stake: 1,000,000,000 microCCD
- Default unbonding period: 86400 seconds (24 hours)
- Default slashing rate: 5%
- Auto-compound: Disabled by default

## Useful Resources

- **Demo Website**: https://concordium-staking-dapp.vercel.app/ 
- **Demo Video:** https://www.loom.com/share/755af47827f9400181455967049c7c0d?sid=365f05ef-2c70-47c2-8dae-9665aaf878c9
- **Technical Guide**: Detailed documentation covering contract architecture, functions, and implementation details can be found [here](https://docs.google.com/document/d/1mHLZS9ARk23irieS1lyk2tIizlAh_ZK7Q0Prt-VSKZo/edit?usp=sharing)
- **Concordium Guide**: Step-by-step instructions for installing the concordium client in the [documentation](https://developer.concordium.software/en/mainnet/smart-contracts/guides/setup-tools.html)
- **Frontend Interface**: [Simple UI for interacting with the staking contract](https://concordium-staking-dapp.vercel.app/)
- **Concordium Documentation:** https://developer.concordium.software/
- **Concordium Website:** https://www.concordium.com/
- **Concordium Support:** https://support.concordium.software/
- **Discord:** https://discord.com/invite/GpKGE2hCFx

## Frontend Local Host Setup
- Cd into the `frontend` folder
- Run `npm install`
- Run `npm run dev` to start the server


## Security Features

- Slashing mechanism for protocol violations
- Protected admin functions
- Arithmetic overflow protection
- Proper access control checks

## Support

For technical support and questions, please refer to the documentation or open an issue in this repository.
