# Box Defi

[Box Defi](https://box-defi.vercel.app) presents Defi farming the gamified way on Tezos blockchain. It aligns incentives and the fun of gamification using a combination of concepts like liquidity pools, semi-fungible tokens and flash loans with a low risk playing model.

## Features

- 🌊 **Box Pool -** Here players can lock up kUSD tokens and receive SEED tokens that represent their share of the liquidity pool. These SEED tokens can be used to unlock back the kUSD share locked up.
- 🪴 **Box Farm -** The SEED tokens received in the Box Pool can be planted in magical boxes in Box Farm. The planted seeds must be watered every watering period until they are fully grown.
- 🍎 **Fruits -** A FRUIT is a semi fungible token that is farmed in the Box Farm. There are 5 different fruits of varying rarity that can be farmed. FRUIT is generated randomly and only revealed when a fully grown plant is harvested.
- 🔪 **De-seeding -** A FRUIT can be deseeded and the original SEED tokens used to farm the fruit can be retrieved in the dapp. The FRUIT token gets burnt and SEED tokens are credited into the wallet of the player.
- 🧙 **Fruit Wizard -** Fruit wizards can turn a combination of less rare fruits into more rarer ones. The original set of less rare FRUIT tokens are burnt and the newly generated rare FRUIT is given to the player.
- ⚡️ **Flash Loans -** The Box Pool exposes a flash loan system that can be used to retrieve loans in kUSD that can be returned with a 1% fee in the same block.

**NOTE:** Other relevant instructions regarding the gameplay are listed on the website [box-defi.vercel.app](https://box-defi.vercel.app)

## Crypto-Economics

The mechanics of Box Defi creates a gameplay environment that is highly risk free and incentivised - provided the player plays it right. Starting from the kUSD stablecoin deposit in the Box Pool to the generation (and possibly selling on secondary) of FRUIT tokens, the hierarchy is such that all items (related to the game) in circulation will have a **minimum risk free value** and a free-floating rate above that, depending on the market.

**SEED** tokens can always be exchanged for their underlying kUSD. A stablecoin is chosen to prevent intense price fluctuation of SEED in a volatile secondary market. Additionally, the flash loan system incentivises large deposits in the pool, as the fee can accumulate over time and provide a decent return to those unlocking the liqudity by burning SEED.

**FRUIT** tokens can be de-seeded and the original SEED tokens could be retrieved back, thereby giving the FRUITs a minimum exchange value. Since, these tokens can have a free-floating value above this minimum price, theoretically the more rarer fruits could be selling for a higher price than less rarer ones in the secondary market. This incentivises users to generate FRUIT with a higher rarity index using Fruit Wizard.

The burnt FRUIT tokens ensure that the underlying SEED cannot be retrieved, thus the associated kUSD liquidity is permanently locked up in the Box Pool - which further promotes flash loan usage and accumulation of fee in the pool.

## Repo Structure

- `contracts`: Smart Contracts running Box Defi - all written in SmartPy.
- `dapp`: Front-end to interact with Box Defi system.
- `deploy`: Helper scripts to deploy Box Defi contracts.
- `indexer`: Box Farm tracking indexer

## Relevent Links

- Demo Video: https://youtu.be/zPnL_2UDKtc
- Website: https://box-defi.vercel.app

## Deployed Contracts

- **SEED token -** [KT1HGNudtKV1XGQGruPt3in2USu7pSUzjf13](https://hangzhou2net.tzkt.io/KT1HGNudtKV1XGQGruPt3in2USu7pSUzjf13)
- **Test kUSD token -** [KT1Wm5fogUZU2TVc6WGXZptuMDCvz6hi9N7V](https://hangzhou2net.tzkt.io/KT1Wm5fogUZU2TVc6WGXZptuMDCvz6hi9N7V)
- **Faucet -** [KT1G2a32hJHhvoM3j629fCoLmwU3H7NrH9Rd](https://hangzhou2net.tzkt.io/KT1G2a32hJHhvoM3j629fCoLmwU3H7NrH9Rd)
- **FRUIT token -** [KT1MBELr7iVwZRx58LqCvQQp3YCnPb7RTqWM](https://hangzhou2net.tzkt.io/KT1MBELr7iVwZRx58LqCvQQp3YCnPb7RTqWM)
- **Box Pool -** [KT1EqdGnZ4eUZFbgcUUuebC8w4zq9QMrkfTa](https://hangzhou2net.tzkt.io/KT1EqdGnZ4eUZFbgcUUuebC8w4zq9QMrkfTa)
- **Box Farm -** [KT19QzTze2PdBfwUcQNugZMvAmbneAawCjQ4](https://hangzhou2net.tzkt.io/KT19QzTze2PdBfwUcQNugZMvAmbneAawCjQ4)

## Task Breakdowns

- [x] On-paper Designing
- [x] Smart Contracts
- [x] Unit Testing of Contracts
- [x] Deployment System
- [x] Art and UI design
- [x] Front end components
- [x] Indexing system
- [x] Connection of front end with the contracts
- [x] UI polishing
