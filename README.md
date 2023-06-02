# 🏗 BeaverFund: Blockchain-based Smart Contracts for Infrastructure Funding

Our primary objective is to eliminate delays and minimize cost overruns in the development of infrastructure projects by utilizing blockchain-based smart contracts to streamline the management of funding and ownership of these assets. By harnessing the power of blockchain technology, we aim to significantly enhance the transparency and accountability of transactions, thereby fostering trust among all stakeholders, including investors, developers, and end-users.

# Project Structure

- `Project-Docs/` contains our project designs & requirements, research information, and whitepaper describing our intended features. 
- Our smart contracts are located in `packages/hardhat/contracts`
  - Crowdfunding.sol: manages new projects deployed by a "contractor", routes user investments to specified project addresses
  - Project.sol: manages a specific projects current information (view the .sol file for datatypes & variables)
- The front-end interface is at `packages/nextjs/pages`
- Contracts were deployed via hardhat w/ scripts in `packages/hardhat/deploy`
- [SKIP TO QUICKSTART GUIDE](#scaffold-toolkit--framework)

# Architecture Diagram

![image](https://github.com/michaelgadda/CS46X_ETH_SMART_CONTRACTS/assets/62987541/252b31f7-fc98-426d-9686-4f0b7ff2e7d6)

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


