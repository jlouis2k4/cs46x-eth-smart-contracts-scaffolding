# 🏗 BeaverFund: Blockchain-based Smart Contracts for Infrastructure Funding

Our primary objective is to eliminate delays and minimize cost overruns in the development of infrastructure projects by utilizing blockchain-based smart contracts to streamline the management of funding and ownership of these assets. By harnessing the power of blockchain technology, we aim to significantly enhance the transparency and accountability of transactions, thereby fostering trust among all stakeholders, including investors, developers, and end-users.

# Project Structure

- `Project-Docs/` contains our project designs & requirements, research information, and whitepaper describing our intended features. 
- Our smart contracts are located in `packages/hardhat/contracts`
  - Crowdfunding.sol: manages new projects deployed by a "contractor", routes user investments to specified project addresses
  - Project.sol: manages a specific projects current information (view the .sol file for datatypes & variables)
- The front-end interface is at `packages/nextjs/pages`
- Contracts were deployed via hardhat w/ scripts in `packages/hardhat/deploy`
- [SKIP TO QUICKSTART GUIDE FOR SCAFFOLD FRAMEWORK](https://github.com/scaffold-eth/scaffold-eth-2)


# Front End Dependencies

Metamask Extension (https://metamask.io/download/)

Yarn (https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

Alchemy Web3 (https://www.npmjs.com/package/@alch/alchemy-web3)

Node.js (https://nodejs.org/en/download)

# Backend Dependencies 

Etherscan Goreli Testnet (https://goerli.etherscan.io/)

Solidity (https://docs.soliditylang.org/en/v0.8.17/installing-solidity.html)

# Architecture Diagram
Front-End-
![image](https://github.com/michaelgadda/CS46X_ETH_SMART_CONTRACTS/assets/62987541/252b31f7-fc98-426d-9686-4f0b7ff2e7d6)

# Smart Contracts-
Lenders Contract- (For developer details please refer to the wiki page here _)

The lenders contract contains multiple public and private functions within the contract. The code contains several functions that are used to manage, lenders, lendees, and loans stored in a database. Within the     contract, one is able to check the remaining loan balance, create a loan, check the remaining time on the loan, and pay debt. There are also multiple functions that check whether a user has requested a loan, if a user is in debt, and getting a list of all investors.
![image](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/62987541/ab8ae692-96a5-4318-8f50-a9af15141c25)

Staking Contract-

The staking contract contains a couple public functions that pay investors that have funded a company. An investor is payed a determined fraction of the invested amount. The payout function is used to distribute the payout to every investor. It transfers the payout amount to each address and updates that last payout time.
![image](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/62987541/9d326159-e2d7-4b2b-97d7-907c5ea693fb)

Toll-based Contract- (For developer details pelase refer to the wiki page here _ )

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

### 7. Since you are editing this in a web-based ide you will have to move your edited code to a place that you can push your changes to GitHub. (This can be any local text editer where Git is installed - i.e notepad, sublime vs code, etc.)


  





# Demo Project Funding Request

![image](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/assets/61107440/c2514e39-bdc0-4e97-b990-0d07bb95fc28)

# Roadmap

  ○ Done so Far:
  
  ○ Design project protocol + token requirements & develop our dApp.
  
  ○ Implement protocols for the lending process between lenders & public contractors.
  
  ○ Model how retail investors will receive incentives from providing liquidity to a loan pool.
  
  ○ Integrate loan terms (repayment schedule, interest, & more)
  
  ○ Refine our very simple dApp user interface

# Future Milestones:

  ■ Tokens can be transacted through our dApp network to access certain tolled infrastructure (i.e. road tolls, bridges, ferries, etc).
  
  ■ Integrate additional DeFi loan protocols
  
  ■ Explore tokenomic models & bonding curves
  
  ■ Implement cross-chain investment bridge protocols

# For More Information Check Out Our Whitepaper!
[Whitepaper-ETH Smart Contracts for Infrastructure Funding (1).pdf](https://github.com/KnoxSamuel/cs46x-eth-smart-contracts-scaffolding/files/11657715/Whitepaper-ETH.Smart.Contracts.for.Infrastructure.Funding.1.pdf)

