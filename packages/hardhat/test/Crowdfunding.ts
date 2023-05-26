import { expect } from "chai";
import { ethers } from "hardhat";
import { Crowdfunding } from "../typechain-types";

const etherToWei = n => {
  return ethers.utils.parseUnits(n, "ether");
};

describe("Crowdfunding", () => {
  let user0;
  let user1;
  let user;
  let crowdfundingContract: Crowdfunding;

  before(async function () {
    [user0, user1, ...user] = await ethers.getSigners();

    const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    crowdfundingContract = (await Crowdfunding.deploy()) as Crowdfunding;
    await crowdfundingContract.deployed();
  });

  describe("Request for funding", async function () {
    it("Start a project", async function () {
      const minimumContribution = etherToWei("0.1");
      const deadline = 604800; // one week in seconds
      const targetContribution = etherToWei("10");
      const projectTitle = "SomePublicProject";
      const projectDesc = "ABlockchainInfrastructureProjectFund";

      const project = await crowdfundingContract
        .connect(user0)
        .createProject(minimumContribution, deadline, targetContribution, projectTitle, projectDesc);
      const event = await project.wait();

      const projectList = await crowdfundingContract.returnAllProjects();

      expect(event.events.length).to.equal(2);
      expect(event.events[0].args.creator).to.equal(user0.address);
      expect(event.events[0].args.minimumContribution).to.equal(minimumContribution);
      expect(Number(event.events[0].args.deadline)).to.greaterThan(0);
      expect(event.events[0].args.targetContribution).to.equal(targetContribution);
      expect(event.events[0].args.raisedAmount).to.equal(0);
      expect(event.events[0].args.noOfContributors).to.equal(0);
      expect(event.events[0].args.projectTitle).to.equal(projectTitle);
      expect(event.events[0].args.projectDesc).to.equal(projectDesc);
      expect(event.events[0].args.currentState).to.equal(0);
    });

    it("Get data", async function () {
      const minimumContribution = etherToWei("0.1");
      const deadline = 604800; // one week in seconds
      const targetContribution = etherToWei("10");
      const projectTitle = "Temp2";
      const projectDesc = "Test2";

      await crowdfundingContract
        .connect(user0)
        .createProject(minimumContribution, deadline, targetContribution, projectTitle, projectDesc);
      const projectList = await crowdfundingContract.returnAllProjects();
      console.log(projectList);
      const contribute = await crowdfundingContract
        .connect(user0)
        .contribute(projectList[0], { value: etherToWei("2") });

      const event = await contribute.wait();
      expect(event.events.length).to.equal(2);
      expect(event.events[1].event).to.equal("ContributionReceived");
      expect(event.events[1].args.projectAddress).to.equal(projectList[0]);
      expect(event.events[1].args.contributedAmount).to.equal(etherToWei("2"));
      expect(event.events[1].args.contributor).to.equal(user0.address);
    });
  });
});

/* describe("Crowdfunding", function () {
  // We define a fixture to reuse the same setup in every test.

  let crowdfunding: Crowdfunding;
  before(async () => {
    const [user0] = await ethers.getSigners();
    
    //user1, user2, user3, user4, creditor5
    const yourContractFactory = await ethers.getContractFactory("Crowdfunding");
    crowdfunding = (await yourContractFactory.deploy(user0.address)) as Crowdfunding;
    await crowdfunding.deployed();
  });

  it("Create the first project", async function () {
    const minumumContribution = etherToWei("0.1");
    const deadline = 604800; // one week in seconds
    const targetContribution = etherToWei("10");
    const projectTitle = "SomePublicProject";
    const projectDesc = "ABlockchainInfrastructureProjectFund";

    const project = await crowdfunding
      .connect(user1.address)
      .createProject(minumumContribution, deadline, targetContribution, projectTitle, projectDesc);

    expect(await crowdfunding()).to.equal("Building Unstoppable Apps!!!");
  });

  it("Should allow setting a new message", async function () {
    const newGreeting = "Learn Scaffold-ETH 2! :)";

    await crowdfunding.setGreeting(newGreeting);
    expect(await crowdfunding.greeting()).to.equal(newGreeting);
  });
}); */
