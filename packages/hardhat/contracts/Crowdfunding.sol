// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9 < 0.9.0;

import "./Project.sol";

contract Crowdfunding {
    // @dev Initializes a project
    // @return null
    event ProjectCreation(
        address projectContractAddress,
        address creator,
        uint256 minContribution,
        uint256 projectDeadline,
        uint256 targetAmount,
        uint256 currentAmount,
        uint256 noOfContributors,
        string title,
        string desc,
        uint256 currentState
    );

    event ContributionReceived(
        address projectAddress,
        uint256 contributedAmount,
        address indexed contributor
    );

    Project[] private projects;

    // External functions

    // @dev Get list of projects
    // @return array
    function returnAllProjects() external view returns (Project[] memory) {
        return projects;
    }

    // Public functions

    // @dev Anyone can contribute to a project
    // @return null
    function contribute(address _projectAddress) public payable {
        uint256 minContributionAmount = Project(_projectAddress)
            .minimumContribution();
        Project.State projectState = Project(_projectAddress).state();
        require(projectState == Project.State.Open, "Invalid state");
        require(
            msg.value >= minContributionAmount,
            "Contribution amount is too low!"
        );
        Project(_projectAddress).contribute{value: msg.value}(msg.sender); // Send fund txn to _projectAddress
        emit ContributionReceived(_projectAddress, msg.value, msg.sender); // Trigger logging event
    }

    // @dev Anyone is allowed to create a project funding request
    // @return null
    function createProject (
        uint256 minimumContribution,
        uint256 deadline,
        uint256 targetContribution,
        string memory projectTitle,
        string memory projectDesc
    ) 
        public
    {
		deadline += block.timestamp;
        require(deadline > block.timestamp, "Deadline must be in the future");

        Project newProject = new Project (
            msg.sender,
            minimumContribution,
            deadline,
            targetContribution,
            projectTitle,
            projectDesc
        );
        projects.push(newProject);

        emit ProjectCreation (
            address(newProject),
            msg.sender,
            minimumContribution,
            deadline,
            targetContribution,
            0,
            0,
            projectTitle,
            projectDesc,
            0
        );
    }
}
