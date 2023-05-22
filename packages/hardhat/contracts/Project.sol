// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9 < 0.9.0;

contract Project {
    // @dev Initializes project information
    // @return null
    constructor(
        address _creator,
        uint256 _minimumContribution,
        uint256 _deadline,
        uint256 _targetContribution,
        string memory _projectTitle,
        string memory _projectDesc
    ) {
        creator = payable(_creator);
        minimumContribution = _minimumContribution;
        deadline = _deadline;
        targetContribution = _targetContribution;
        projectTitle = _projectTitle;
        projectDesc = _projectDesc;
        raisedAmount = 0;
    }

    // Project State
    enum State {
        Open,
        Expired,
        Successful
    }

    // Structs
    struct WithdrawRequest {
        string description;
        uint256 amount;
        uint256 noOfVotes;
        mapping(address => bool) voters;
        bool isApproved;
        address payable recipient;
    }

    // Variables
    address payable public creator; // Owner's address of the project
    uint256 public minimumContribution; // The minumum a user can contribute to a project each transaction
    uint256 public deadline;
    uint256 public targetContribution; // Project's crowdfunding goal to start development
    uint256 public completedAt;
    uint256 public raisedAmount; // Count of total amount crowdfunded
    uint256 public noOfContributers;
    string public projectTitle;
    string public projectDesc;
    State public state = State.Open;

    mapping(address => uint256) public contributors;
    mapping(uint256 => WithdrawRequest) public withdrawRequests;

    uint256 public numOfWithdrawRequests = 0;

    // Modifiers
    modifier isCreator() {
        require(
            msg.sender == creator,
            "You dont have access to perform this operation !"
        );
        _;
    }

    modifier isNotExpired(State _state) {
        require(state == _state, "Invalid state");
        require(block.timestamp < deadline, "Deadline has passed !");
        _;
    }

    // Events

    // Event that will be emitted whenever funding will be received
    event FundingReceived(
        address contributor,
        uint256 amount,
        uint256 currentTotal
    );

    // Event that will be emitted whenever withdraw request created
    event WithdrawRequestCreated(
        uint256 requestId,
        string description,
        uint256 amount,
        uint256 noOfVotes,
        bool isApproved,
        address recipient
    );

    // Event that will be emitted whenever contributor vote for withdraw request
    event WithdrawVote(address voter, uint256 totalVote);

    // Event that will be emitted whenever contributor vote for withdraw request
    event AmountWithdrawSuccessful(
        uint256 requestId,
        string description,
        uint256 amount,
        uint256 noOfVotes,
        bool isApproved,
        address recipient
    );

    // Public Functions

    // @dev Any user can contribute to a project.
    // @return null
    function contribute(address _contributor) public payable isNotExpired(State.Open) {
        require(
            msg.value >= minimumContribution,
            "Contribution amount is too low!"
        );

        if (contributors[_contributor] == 0) {
            noOfContributers++;
        }

        contributors[_contributor] += msg.value;
        raisedAmount += msg.value;
        emit FundingReceived(_contributor, msg.value, raisedAmount);
        checkFundingCompleteOrExpire();
    }

    // @dev Get the contract's current balance.
    // @return uint
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // @dev Get contract information.
    // @return Project's initial information + timeofCompletion, currentAmount, currentState, balance.
    function getProjectDetails()
        public
        view
        returns (
            address payable projectOwner,
            uint256 minContribution,
            uint256 projectDeadline,
            uint256 goalAmount,
            uint256 timeOfCompletion,
            uint256 currentAmount,
            string memory title,
            string memory desc,
            State currentState,
            uint256 balance
        )
    {
        projectOwner = creator;
        minContribution = minimumContribution;
        projectDeadline = deadline;
        goalAmount = targetContribution;
        timeOfCompletion = completedAt;
        currentAmount = raisedAmount;
        title = projectTitle;
        desc = projectDesc;
        currentState = state;
        balance = address(this).balance;
    }

    // @dev Contributors can get refund if a project ends before reaching goal.
    // @return boolean
    function requestRefund() public isNotExpired(State.Expired) returns (bool) {
        require(
            contributors[msg.sender] > 0,
            "You don't have any assets contributed to this project!"
        );
        address payable user = payable(msg.sender);
        uint256 refundAmount = contributors[msg.sender]; // this prevents against reentrancy attacks
        contributors[msg.sender] = 0; 
        user.transfer(refundAmount);
        return true;
    }

    // @dev Project owner must request contributors to withdraw some amount.
    // @return null
    function createWithdrawRequest(
        string memory _description,
        uint256 _amount,
        address payable _recipient
    ) 
        public
        isCreator
        isNotExpired(State.Successful)
    {
        require(_amount <= getContractBalance(), "Requested amount exceeds contract balance");

        WithdrawRequest storage newRequest = withdrawRequests[
            numOfWithdrawRequests
        ];
        numOfWithdrawRequests++;

        newRequest.description = _description;
        newRequest.amount = _amount;
        newRequest.noOfVotes = 0;
        newRequest.isApproved = false;
        newRequest.recipient = _recipient;

        emit WithdrawRequestCreated(
            numOfWithdrawRequests,
            _description,
            _amount,
            0,
            false,
            _recipient
        );
    }

    // @dev Contributors are allowed to vote once for each WithdrawRequest.
    // @return null
    function voteWithdrawRequest(uint256 _requestId) public {
        require(contributors[msg.sender] > 0, "Only contributors are allowed to vote on WithdrawRequests!");
        WithdrawRequest storage requestDetails = withdrawRequests[_requestId];
        require(
            requestDetails.voters[msg.sender] == false,
            "You have already voted!"
        );
        requestDetails.voters[msg.sender] = true;
        requestDetails.noOfVotes += 1;
        emit WithdrawVote(msg.sender, requestDetails.noOfVotes);
    }

    // @dev Owner can withdraw the requested amount after quorum is met.
    // @return null
    function withdrawRequestedAmount(uint256 _requestId)
        public
        isCreator
        isNotExpired(State.Successful)
    {
        WithdrawRequest storage requestDetails = withdrawRequests[_requestId];
        require(
            requestDetails.isApproved == false,
            "This withdrawal request was already approved."
        );
        require(
            requestDetails.noOfVotes >= (noOfContributers * 2) / 3,
            "More than 66% of contributors need to approve this request."
        );
        requestDetails.recipient.transfer(requestDetails.amount);
        requestDetails.isApproved = true;

        emit AmountWithdrawSuccessful(
            _requestId,
            requestDetails.description,
            requestDetails.amount,
            requestDetails.noOfVotes,
            true,
            requestDetails.recipient
        );
    }

    // Internal Functions

    // @dev Changes project state to Successful if raisedAmount exceeds goal.
    //      Changes project state to Expired if deadline has passed.
    // @return null
    function checkFundingCompleteOrExpire() internal {
        if (raisedAmount >= targetContribution) {
            state = State.Successful;
        } else if (block.timestamp > deadline) {
            state = State.Expired;
        }
        completedAt = block.timestamp;
    }
}
