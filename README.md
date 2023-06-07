# 🏗 BeaverFund: Blockchain-based Smart Contracts for Infrastructure Funding

Our primary objective is to eliminate delays and minimize cost overruns in the development of infrastructure projects by utilizing blockchain-based smart contracts to streamline the management of funding and ownership of these assets. By harnessing the power of blockchain technology, we aim to significantly enhance the transparency and accountability of transactions, thereby fostering trust among all stakeholders, including investors, developers, and end-users.

# Project Structure
- `Project-Docs/` contains our project designs & requirements, research information, and whitepaper describing our intended features. 
- Our smart contracts are located in `packages/hardhat/contracts`
  - ```Crowdfunding.sol: manages new projects deployed by a "contractor", routes user investments to specified project addresses```

  - ```Project.sol: manages a specific projects current information (view the .sol file for datatypes & variables)```
- The front-end interface is at `packages/nextjs/pages`
- Contracts were deployed via hardhat w/ scripts in `packages/hardhat/deploy`

- *View the `scaffold-eth-2` framework & documentation [here](https://github.com/scaffold-eth/scaffold-eth-2) for the default developer stack, hardhat commands/scripts, changing config files for network deployment & `.env` secrets management, and finally the next.js framework packaged w/ pre-built scaffold react hooks to simplify smart contract interactions.*


## NatSpec Documentation for Developers + End-Users
- [link to natspec solidity contract documentation](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/blob/24e534c31099814dbb25319512ff9fdcc8721788/packages/hardhat/docs/index.md)

- compile & create new natspec docs from contracts using:
`yarn docgen`


# Front End Dependencies

- [Yarn (classic stable v1.22.19 or v2+)](https://classic.yarnpkg.com/lang/en/docs/install/)

- [Node v18+](https://nodejs.org/en/download/)

- [Alchemy API](https://docs.alchemy.com/docs)

- [Metamask Wallet](https://metamask.io/download/)

# Backend Dependencies 

- [Hardhat](https://hardhat.org/tutorial)  `(listed in package.json)`

  ``` `yarn install` configures default developer environment```

- [Sepolia Network (Testnet)](https://goerli.etherscan.io/)

- [Solidity (+ solc/solcjs compiler)](https://docs.soliditylang.org/en/v0.8.20/installing-solidity.html#installing-solidity)

# Architecture Diagram
Front-End-
![image](https://github.com/michaelgadda/CS46X_ETH_SMART_CONTRACTS/assets/62987541/252b31f7-fc98-426d-9686-4f0b7ff2e7d6)

# Smart Contracts-
Project Contract- 

The `Project.sol` contract contains multiple public and private functions within it, and is the majority of the dapp's logic. The code contains several functions that are used to manage the roles of lenders (creditors vs. "normal" investor), lendees (the owner of each project loan reqest), and funds of corresponding loan payments. 

Within the contract, one is able to check the current loan balance, intialize a loan (the "parent" contract, `Crowdfunding.sol`, calls the constructor), check the remaining time on the loan, and pay debt. There are also multiple modifier functions that checks the projects current state, whether a project owner has requested a loan withdrawal, the authorization level of any given user, and getting a list of all investors and payments. 

The `crowdfunding` contract mainly tracks all created project contract addresses in `Project[] private projects`, and sends information about investors transactions to the `project` in `mapping(address => uint256) public contributors`.
![image](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/62987541/ab8ae692-96a5-4318-8f50-a9af15141c25)

Staking Contract-

The staking contract contains a couple public functions that pay investors that have funded a company. An investor is payed a determined fraction of the invested amount. The payout function is used to distribute the payout to every investor. It transfers the payout amount to each address and updates that last payout time.
![image](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/62987541/9d326159-e2d7-4b2b-97d7-907c5ea693fb)

Toll-based Contract- 

The toll-based contract is used to create a new project and list it. We are able to add users that invested into the project and we plan to communicate with the lending contract in future iterations. As of now we are able to deposit a test token, add infrastructures, and add users to a database. When the contract is complete, users will be able to see what infrastructure they are invested in, and how much of a stake they have in the project. 
![image](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/62987541/19e61d91-a05d-4fb0-b680-dbc59625bf14)

## Developer Guide to working on the Smart Contracts

In order to work on any of the .sol smart contracts use the Remix IDE. Please follow the steps below. 

### 1. In your browser open up remix (https://remix.ethereum.org/) 

### 2. Once in remix upload any of the smart contracts you want to edit. 
      You can do this by simply dragging and dropping a downloaded smart contract into the contracts folder. (See Image below)
<img src="https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/71783038/77cb62e1-48b2-495b-aa99-7724ce5d7e3c" width=50% height=50%>


### 3. Once it is uploaded into Remix simply make the changes you want by editing the file in Remix.
<img src="https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/71783038/e44f8a7a-6685-4095-be80-c43275526990" width=50% height=50%>

### 4. In order to compile the smart contract click on the Solidity symbol on the left side-bar and then click compile. 
<img src="https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/71783038/030c2fb4-7a63-40f5-90e8-540f0bc1eee2" width=50% height=50%>

### 5. Once compiled you can now use the smart contract. In order to do this click on the Ethereum logo on the same left side bar.
<img src="https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/71783038/655b7420-6f96-4e74-8024-0fb9269d9173" width=50% height=50%>

### 6. Once on this page you can now select the deployed contract you want to interact with. 
<img src="https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/71783038/0694d413-3fb8-4c06-a484-2cd9f650218c" width=50% height=50%>

### 7. Since you are editing this in a web-based ide you will have to move your edited code to a place that you can push your changes to GitHub. (This can be any local text editer where Git is installed - i.e notepad, sublime vs code, etc.)  <br><br>

# Guide to Local DApp Development: <br>Testing with Hardhat + Local Ethereum Blockchain and using the auto-updating Next.js Front-end Interface for debugging

1. Clone the repository
```
git clone https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding.git
```

2. Navigate to the top level of the repository directory
```
cd cs46x-eth-smart-contracts-scaffolding
```

3. Make sure Node and Yarn from the dependency list above are installed correctly on your machine. Then use yarn to install the required package dependencies.

This will setup hardhat, next-js, and other sub-dependencies such as the OpenZeppelin contract library and solhint (a solidity code linter).
```
yarn install //note: may take ~20mins on first install
```
![image](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/61107440/07acfdd0-916d-4608-9fa7-6bdf4fc9b91c)

4. Start running a local ethereum blockchain network in your terminal. 

This command starts a local Ethereum blockchain w/ Hardhat. The network runs on your local machine for testing and development. Customize network configuration in `hardhat.config.ts`.
```
yarn chain
```
![image](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/61107440/6521a159-8a9d-451d-ad0e-cbc58eee79ae)

5. In a second terminal, compile & deploy the contracts in `packages/hardhat/contracts`. 

The `yarn deploy` command compiles all contracts and then, by default, deploys them to localhost. Contracts are located in `packages/hardhat/contracts`. This command uses the customized deploy scripts in `packages/hardhat/deploy` to deploy contracts to the network. 

To change the network where contracts are deployed, you'll need to edit the network configuration in `packages/hardhat/hardhat.config.ts`.<br> ( e.g. a development cycle would deploy contracts to test in the following order: `localhost->sepolia->mainnet` )
```
yarn deploy
```
![image](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/61107440/e0e948eb-ee07-4777-aa81-06c1e0c8da0b)

6. In the third terminal, start the NextJS app. Visit the app on: `http://localhost:3000`. You can interact with the smart contracts using the contract debugging screen. You can edit the app configuration in `packages/nextjs/scaffold.config.ts`.
```
yarn start
```
![image](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/61107440/256dbe68-a254-415d-bf93-52bf84f31b29)
![image](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/61107440/5d5cfd8a-b489-4797-b965-51b05297d764)

## Important Dependencies
- OpenZeppelin
- solhint
- ethers library
- solidity-docgen
- dotenv
- envfile
- qrcode
- chai for assertions in tests
- mocha javascript testing library

- next.js and react
- eslint + prettier for next.js
- typechain, library for converting Ethereum smart contract ABIs to typescript bindings 
- wagmi
- rainbowkit


## Development Scripts
- When new changes to contracts are detected, hardhat will update nessecary changes. Had I added a new function or changed one from the deployed contracts, the front-end would also auto-update the debug screen and fields for the public functions.    
![image](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/61107440/294dd1a9-ff92-4bfa-9e54-c2714d5020d4)

- top level yarn package.json scripts link the hardhat and next.js workspace scripts together
- hardhat commands/scripts, hardhat/deploy/
```
"scripts": {
    "account": "hardhat run scripts/listAccount.ts",
    "chain": "hardhat node --network hardhat --no-deploy",
    "compile": "hardhat compile",
    "deploy": "hardhat deploy --export-all ./temp/hardhat_contracts.json \"$@\" && hardhat run scripts/generateTsAbis.ts",
    "fork": "MAINNET_FORKING_ENABLED=true hardhat node --network hardhat --no-deploy",
    "generate": "hardhat run scripts/generateAccount.ts",
    "lint": "eslint --config ./.eslintrc.json --ignore-path ./.eslintignore ./*.ts ./deploy/**/*.ts ./scripts/**/*.ts ./test/**/*.ts",
    "lint-staged": "eslint --config ./.eslintrc.json --ignore-path ./.eslintignore",
    "test": "REPORT_GAS=true hardhat test --network hardhat",
    "verify": "hardhat etherscan-verify"
  }
```

- enforcing linting and type-checks on deploy time
- next.js commands/scripts
```
"scripts": {
    "dev": "next dev",
    "start": "next dev",
    "build": "next build",
    "serve": "next start",
    "lint": "next lint",
    "format": "prettier --write . '!(node_module|.next|contracts)/**/*'",
    "check-types": "tsc --noEmit --incremental",
    "vercel": "vercel",
    "vercel:yolo": "vercel --build-env NEXT_PUBLIC_IGNORE_BUILD_ERROR=true"
  }
```


## Recap
- `Project-Docs/` contains our project designs & requirements, research information, and whitepaper describing our intended features. 

- Edit smart contracts in `packages/hardhat/contracts/`
  - ```Crowdfunding.sol: manages new projects deployed by a "contractor", routes user investments to specified project addresses```

  - ```Project.sol: manages a specific projects current information (view the .sol file for datatypes & variables)```
- Edit deployment scripts in `packages/hardhat/deploy/`
- Run smart contract tests with `yarn hardhat:test`
- Interact with and test the contracts using the debug page in the next.js app
<br><br>

## Best Ethereum and Blockchain Development Resources
- github links
- tools
- blockchain APIs
- best development & contract practices, linting, type checks
- solidity docs
- learning by example, gamification sites, standardized contract examples
- research forums, vitalik blog 
<br><br>

## Pre-built `scaffold-eth-2` React Hooks
- Edit the frontend in `packages/nextjs/pages/`

- View [scaffold-eth-2; Interacting with your Smart Contracts](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/README.md#interacting-with-your-smart-contracts-se-2-custom-hooks) for simple custom react hooks to communicate with contracts. Here's their description of each `useScaffold*()` react functions:
    - [`useScaffoldContractRead`](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/README.md#usescaffoldcontractread): for reading public variables and getting data from read-only functions of your contract.
    - [`useScaffoldContractWrite`](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/README.md#usescaffoldcontractwrite): for sending transactions to your contract to write data or perform an action.
    - [`useScaffoldEventSubscriber`](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/README.md#usescaffoldeventsubscriber): for subscribing to your contract events and receiving real-time updates when events are emitted.
    - [`useScaffoldEventHistory`](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/README.md#usescaffoldeventhistory): for retrieving historical event logs for your contract, providing past activity data.
    - [`useDeployedContractInfo`](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/README.md#usedeployedcontractinfo): for fetching details from your contract, including the ABI and address.
    - [`useScaffoldContract`](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/README.md#usescaffoldcontract): for obtaining a contract instance that lets you interact with the methods of your deployed smart contract.


## Guide to Deploying Smart Contracts to a live Ethereum Testnet & Configuring Local Private `.env` variables
1. Select the network

By default, `yarn deploy` will deploy the contract to the local network. Either change `defaultNetwork` in `packages/hardhat/hardhat.config.ts.` or run `yarn deploy --network target_network` to deploy to another network.  
e.g. to deploy contracts to the Sepolia test network:
```
yarn deploy --network sepolia
```
The hardhat config `hardhat.config.ts` contains pre-configured networks provided by the scaffold team. You can also add other network settings to the `hardhat.config.ts` file. You may find the [Alchemy docs](https://docs.alchemy.com/docs/how-to-add-alchemy-rpc-endpoints-to-metamask) helpful for configuring specific networks.<br><br>

2. Generate a new account (or add one to `.env`) to deploy the contracts from. You will need to add an Alchemy API key when deploying to an external network. Fill the required keys in `.env`.

The deployer account is the private address of the account that will deploy the contracts. The deployer account also executes any function calls that are a part of the deployment scripts. Note that this file is included in `.gitignore`.
```
# Template for environment variables
ALCHEMY_API_KEY=
DEPLOYER_PRIVATE_KEY=
ETHERSCAN_API_KEY=
```
You need to either generate a random account (public + private key) with `yarn generate`, or add the private key of your crypto wallet (from metamask, and probably a wallet dedicated to testnet development so as to not commingle keys & other information). `yarn generate` will create a random account and automatically add the DEPLOYER_PRIVATE_KEY to the .env file. You can view your generated account with `yarn account`.<br><br>

3. Deploying the smart contracts

Run the command below to deploy contracts to the target network. Ensure you have some funds in your deployer account for target network to pay the gas fees.
```
yarn deploy --network network_name
```

4. Verifying the smart contracts deployed with Etherscan (optional but not)
```
yarn verify --network network_name
```
<br>

## Guide to Deploying the NextJS App to Vercel
**Ensure `packages/nextjs/scaffold.config.ts` file has the correct values.**

***We used the Vercel UI to connect the GitHub repo to Vercel. This lets us automatically deploy production changes when pushing to `main`.***

To instead deploy from the CLI, run `yarn vercel` and follow the steps to deploy to Vercel. You'll need to log in through the CLI (email, github, etc), and then the default options should work. 

From the CLI, to redeploy to the same production URL, run `yarn vercel --prod`. By not using the `--prod` flag, it will instead deploy it to a preview/test URL.


# Demo Project Funding Request

![image](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/61107440/c2514e39-bdc0-4e97-b990-0d07bb95fc28)


# This is a [link](Project-Docs/frontend_guide_for_future.pdf) to our old front end documentation if the next capstone group wishes to revisit it.
![image](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/62987541/b3e9395b-d74d-4cab-bf97-cc6cb0c899f6)
<br><br>

# Roadmap
- **Done so Far**:
  
  ○ Design project protocol + token requirements & develop our dApp.
  
  ○ Implement protocols for the lending process between lenders & public contractors.
  
  ○ Model how retail investors will receive incentives from providing liquidity to a loan pool.
  
  ○ Integrate loan terms (repayment schedule, interest, & more)

  ○ Refine our very simple dApp user interface

- **Future Milestones**:

  ■ Tokens can be transacted through our dApp network to access certain tolled infrastructure (i.e. road tolls, bridges, ferries, etc).

  ■ Explore tokenomic models & bonding curves
  
  ■ Integrate additional DeFi loan protocols (OpenZeppelin, IPFS, Chainlink)
  
  ■ Implement cross-chain investment bridge protocols
<br><br>

# Test Strategy 

Throughout this project we did not deploy formal unit tests at any point. However due to the security risks associated with Smart Contracts dealing with large amounts of money testing is and was needed. 

In order to test our smart contracts on a blockchain network we used Remix's IDE. 

Remix's IDE provides a safe, quick and easy way to compile, deploy and interact with smart contracts. This allowed for us to do lots of manual testing to ensure that the smart contract's functionality was properly functioning. 

At the core of our testing we wanted to make sure that money was not able to be sent, received, deposited, or withdrawn by the wrong person. As this would be the most devasting error. 
<br><br>

# Risk Analysis 

The only risks associated with project are the security concerns regarding transferring money via the blockchain. 

Our only concern would be that money is transferred to the wrong hands or someone that was not supposed to be able to withdraw money is able to withdraw money. 

In order to address these concerns we did major testing in these areas and put in plenty of validation to ensure that this could never happen. 
<br><br>

# Questions/Concerns From Code Walkthrough
[Concerns From Code Walkthrough.pdf](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/files/11657807/Concerns.From.Code.Walkthrough.pdf)


# For More Information Check Out Our Whitepaper!
[Whitepaper-ETH Smart Contracts for Infrastructure Funding.pdf](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/files/11657782/Whitepaper-ETH.Smart.Contracts.for.Infrastructure.Funding.pdf)
