import { expect } from "chai";
import { ethers } from "hardhat";
import { Project } from "../typechain-types";

describe("Project", function () {
  // We define a fixture to reuse the same setup in every test.

  let project: Project;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const yourContractFactory = await ethers.getContractFactory("Project");
    project = (await yourContractFactory.deploy(owner.address)) as Project;
    await project.deployed();
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      expect(await project.greeting()).to.equal("Building Unstoppable Apps!!!");
    });

    it("Should allow setting a new message", async function () {
      const newGreeting = "Learn Scaffold-ETH 2! :)";

      await project.setGreeting(newGreeting);
      expect(await project.greeting()).to.equal(newGreeting);
    });
  });
});
