import { expect } from "chai";
import { ethers } from "hardhat";
import { Crowdfunding } from "../typechain-types";

describe("Crowdfunding", function () {
  // We define a fixture to reuse the same setup in every test.

  let crowdfunding: Crowdfunding;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const yourContractFactory = await ethers.getContractFactory("Crowdfunding");
    crowdfunding = (await yourContractFactory.deploy(owner.address)) as Crowdfunding;
    await crowdfunding.deployed();
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      expect(await crowdfunding.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";

      await crowdfunding.setGreeting(newGreeting);
      expect(await crowdfunding.greeting()).to.equal(newGreeting);
    });
  });
});
