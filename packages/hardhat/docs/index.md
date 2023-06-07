# Solidity API

## Crowdfunding

### ProjectCreation

```solidity
event ProjectCreation(address projectContractAddress, address creator, uint256 minContribution, uint256 projectDeadline, uint256 targetAmount, uint256 currentAmount, uint256 noOfContributors, string title, string desc, uint256 currentState)
```

_Initializes a project_

### ContributionReceived

```solidity
event ContributionReceived(address projectAddress, uint256 contributedAmount, address contributor)
```

### returnAllProjects

```solidity
function returnAllProjects() external view returns (contract Project[])
```

_Get list of projects_

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract Project[] | array |

### contribute

```solidity
function contribute(address _projectAddress) public payable
```

_Anyone can contribute to a project_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _projectAddress | address | The project address where funds are deposited |

### createProject

```solidity
function createProject(uint256 minimumContribution, uint256 deadline, uint256 targetContribution, string projectTitle, string projectDesc) public
```

_Anyone is allowed to create a project funding request_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| minimumContribution | uint256 | Minumum accepted ETH per transaction |
| deadline | uint256 | Amount of seconds until the project stops accepting investments |
| targetContribution | uint256 | Amount of ETH the project requires to start development |
| projectTitle | string | Title of infrastructure project |
| projectDesc | string | Description of infrastructure project |

## CREDITOR

```solidity
bytes32 CREDITOR
```

## END_USER

```solidity
bytes32 END_USER
```

## Project

### constructor

```solidity
constructor(address _creator, uint256 _minimumContribution, uint256 _deadline, uint256 _targetContribution, string _projectTitle, string _projectDesc) public
```

_Initializes project information_

### State

```solidity
enum State {
  Open,
  Expired,
  Successful
}
```

### WithdrawRequest

```solidity
struct WithdrawRequest {
  string description;
  uint256 amount;
  uint256 noOfVotes;
  mapping(address => bool) voters;
  bool isApproved;
  address payable recipient;
}
```

### creator

```solidity
address payable creator
```

### minimumContribution

```solidity
uint256 minimumContribution
```

### deadline

```solidity
uint256 deadline
```

### targetContribution

```solidity
uint256 targetContribution
```

### completedAt

```solidity
uint256 completedAt
```

### raisedAmount

```solidity
uint256 raisedAmount
```

### noOfContributers

```solidity
uint256 noOfContributers
```

### projectTitle

```solidity
string projectTitle
```

### projectDesc

```solidity
string projectDesc
```

### state

```solidity
enum Project.State state
```

### contributors

```solidity
mapping(address => uint256) contributors
```

### withdrawRequests

```solidity
mapping(uint256 => struct Project.WithdrawRequest) withdrawRequests
```

### noOfWithdrawRequests

```solidity
uint256 noOfWithdrawRequests
```

### isCreator

```solidity
modifier isCreator()
```

### atState

```solidity
modifier atState(enum Project.State _state)
```

### FundingReceived

```solidity
event FundingReceived(address contributor, uint256 amount, uint256 currentTotal)
```

### WithdrawRequestCreated

```solidity
event WithdrawRequestCreated(uint256 requestId, string description, uint256 amount, uint256 noOfVotes, bool isApproved, address recipient)
```

### WithdrawRequestVote

```solidity
event WithdrawRequestVote(address voter, uint256 totalVote)
```

### AmountWithdrawSuccessful

```solidity
event AmountWithdrawSuccessful(uint256 requestId, string description, uint256 amount, uint256 noOfVotes, bool isApproved, address recipient)
```

### contribute

```solidity
function contribute(address _contributor) public payable
```

_Any user can contribute to a project._

### getContractBalance

```solidity
function getContractBalance() public view returns (uint256)
```

_Get the contract's current balance._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint |

### getProjectDetails

```solidity
function getProjectDetails() public view returns (address payable projectOwner, uint256 minContribution, uint256 projectDeadline, uint256 goalAmount, uint256 timeOfCompletion, uint256 currentAmount, string title, string desc, enum Project.State currentState, uint256 balance)
```

_Get contract information._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| projectOwner | address payable |  |
| minContribution | uint256 |  |
| projectDeadline | uint256 |  |
| goalAmount | uint256 |  |
| timeOfCompletion | uint256 |  |
| currentAmount | uint256 |  |
| title | string |  |
| desc | string |  |
| currentState | enum Project.State |  |
| balance | uint256 |  |

### requestRefund

```solidity
function requestRefund() public returns (bool)
```

_Contributors can get refund if a project ends before reaching goal._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | boolean |

### createWithdrawRequest

```solidity
function createWithdrawRequest(string _description, uint256 _amount, address payable _recipient) public
```

_Project funding must be complete & owner must request contributors to withdraw some amount._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _description | string | Memo attached to request |
| _amount | uint256 | The amount of ETH owner requested |
| _recipient | address payable | The address where owner wants withdrawal |

### voteWithdrawRequest

```solidity
function voteWithdrawRequest(uint256 _requestId) public
```

_Contributors are allowed to vote once for each WithdrawRequest._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _requestId | uint256 | Index of the withdraw request |

### withdrawRequestedAmount

```solidity
function withdrawRequestedAmount(uint256 _requestId) public
```

_Owner can withdraw the requested amount after quorum is met._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _requestId | uint256 | Index of the withdraw request |

### checkFundingCompleteOrExpired

```solidity
function checkFundingCompleteOrExpired() internal
```

_TODO-DEBUG: Seems that project state is set to `Successful` after one contribution
Sets project state if expired or funded_

## Lending

### lender

```solidity
struct lender {
  address payable lenderAddress;
  uint256[] loanIds;
}
```

### lendee

```solidity
struct lendee {
  address payable lendeeAddress;
  uint256[] loanIds;
}
```

### loan

```solidity
struct loan {
  address payable lendee;
  address payable lender;
  uint256 loanId;
  uint256 loanAmount;
  uint256 loanAmountLeft;
  uint256 totalReceivedAmount;
  uint256 totalInterest;
  uint256 principleLoanPayed;
  uint256 interestPayed;
  uint256 interestRate;
  uint256 loanPeriod;
  uint256 loanInstallmentPeriod;
  uint256 loanStart;
  uint256 loanEnd;
  bool loanRepaid;
  bool interestRepaid;
  uint256 lateFee;
  uint256 gracePeriod;
  uint256 defaultAmount;
  uint256 installmentAmount;
  uint256 previousLoanInstallmentDate;
  uint256 daysBetweenInstallments;
  uint256 interestLeft;
}
```

### nextLoanId

```solidity
uint256 nextLoanId
```

### owner

```solidity
address owner
```

### LoanCreated

```solidity
event LoanCreated(string message, uint256 loanId, address payable lender, address payable lendee, uint256 loanAmount, uint256 interestRate, uint256 loanPeriod, uint256 loanInstallmentPeriod, uint256 installmentAmount)
```

### Lended

```solidity
event Lended(address payable lendee, address payable lender, uint256 loanAmount)
```

### InstallmentRepaid

```solidity
event InstallmentRepaid(address payable lender, address payable lendee, uint256 loanAmountLeft, uint256 totalReceivedAmount, uint256 principleLoanPayed, bool LoanRepaid)
```

### LoanLate

```solidity
event LoanLate(address payable lender, address payable lendee)
```

### LoanDefaulted

```solidity
event LoanDefaulted(address payable lender, address payable lendee)
```

### LoanRepaidInFull

```solidity
event LoanRepaidInFull(address payable lender, address payable lendee, uint256 interestPayed, uint256 principleLoanPayed)
```

### InterestRepaid

```solidity
event InterestRepaid(address payable lender, address payable lendee, uint256 interestLeft, uint256 InterestRepaid, uint256 totalReceivedAmount)
```

### basicString

```solidity
event basicString(string basicString)
```

### amountLeft

```solidity
event amountLeft(uint256 loanId, uint256 amountLeft)
```

### myActiveLoans

```solidity
event myActiveLoans(string message, uint256[] _loanIds, uint256[] loanIds)
```

### thisSCAddress

```solidity
event thisSCAddress(string message, address scAddress)
```

### emitUint

```solidity
event emitUint(uint256 blank)
```

### constructor

```solidity
constructor() public
```

### createLoan

```solidity
function createLoan(address payable _lendee, address payable _lender, uint256 _loanAmount, uint256 _interestRate, uint256 _loanPeriod, uint256 _loanInstallmentPeriod) public
```

### deposit

```solidity
function deposit(address walletAddress) public payable
```

### lendLoan

```solidity
function lendLoan(uint256 loanId) public payable
```

### repayInstallment

```solidity
function repayInstallment(uint256 loanId) public payable
```

### repayInterest

```solidity
function repayInterest(uint256 loanId) public payable
```

### balanceOf

```solidity
function balanceOf() public view returns (uint256)
```

### remainingLoanBalance

```solidity
function remainingLoanBalance(uint256 loanId) public
```

### remainingInterestBalance

```solidity
function remainingInterestBalance(uint256 loanId) public
```

### remainingTimeForLoan

```solidity
function remainingTimeForLoan(uint256 loanId) public
```

### checkPaidBalance

```solidity
function checkPaidBalance(uint256 loanId) public returns (uint256)
```

### repayCustAmountLoan

```solidity
function repayCustAmountLoan(uint256 loanId) public payable
```

### defaultLoan

```solidity
function defaultLoan(uint256 loanId) public
```

### getMyActiveLoans

```solidity
function getMyActiveLoans() public
```

### getThisSmartContractAddress

```solidity
function getThisSmartContractAddress() public
```

## BeaverFund

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize() public
```

### snapshot

```solidity
function snapshot() public
```

### mint

```solidity
function mint(address to, uint256 amount) public
```

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from, address to, uint256 amount) internal
```

### _afterTokenTransfer

```solidity
function _afterTokenTransfer(address from, address to, uint256 amount) internal
```

### _mint

```solidity
function _mint(address to, uint256 amount) internal
```

### _burn

```solidity
function _burn(address account, uint256 amount) internal
```

## tollInfrastructure

### accountWarning

```solidity
string accountWarning
```

### infNotFoundWarning

```solidity
string infNotFoundWarning
```

### individualUser

```solidity
struct individualUser {
  address payable userWallet;
  string userFirstName;
  string userLastName;
  uint256 userType;
  uint256 totalInfrastructureUsage;
  uint256 totalPayed;
  string infName;
}
```

### infrastructure

```solidity
struct infrastructure {
  address payable infWallet;
  string infName;
  uint256 member_type1_threshold;
  uint256 member_type2_threshold;
  uint256 member_type3_threshold;
  uint256 member_type1_cost;
  uint256 member_type2_cost;
  uint256 member_type3_cost;
  uint256 totalRevenue;
  uint256 withdrawableRevenue;
  uint256 totalVisits;
}
```

### CreateAccount

```solidity
event CreateAccount(string accountWarning)
```

### noInfFound

```solidity
event noInfFound(string infNotFoundWarning)
```

### userPaymentSuccess

```solidity
event userPaymentSuccess(uint256 userCost, string firstName, string lastName, string infName)
```

### printinfArray

```solidity
event printinfArray(string name, address payable wallet, uint256 totalRevenue, uint256 withdrawableRevenue, uint256 totalVisits)
```

### printIndUserArray

```solidity
event printIndUserArray(string fname, string lname, address payable wallet, uint256 totalPayed, uint256 userType)
```

### insufficientFunds

```solidity
event insufficientFunds(uint256 amountToWithdraw, uint256 withdrawableRevenue, string infName, address payable infWallet)
```

### successfulWithdrawal

```solidity
event successfulWithdrawal(string infName, address payable wallet, string successMessage)
```

### sendCost

```solidity
event sendCost(string costString, uint256 userCost)
```

### constructor

```solidity
constructor() public
```

### deposit

```solidity
function deposit(address walletAddress) public payable
```

### addInfStructure

```solidity
function addInfStructure(address payable infWallet, string infName, uint256 member_type1_cost, uint256 member_type2_cost, uint256 member_type3_cost, uint256 member_type1_threshold, uint256 member_type2_threshold, uint256 member_type3_threshold) public
```

### addUserToDataBase

```solidity
function addUserToDataBase(string firstname, string lastname, string infName) public
```

### getAllInfArrayItems

```solidity
function getAllInfArrayItems() public
```

### getAllIndUsersArrayItems

```solidity
function getAllIndUsersArrayItems() public
```

### withdrawRevenue

```solidity
function withdrawRevenue(uint256 amountToWithdraw) public
```

### checkHowMuchIOwe

```solidity
function checkHowMuchIOwe(string infName) public
```

### IndUsrpayInfrustuctureWallet

```solidity
function IndUsrpayInfrustuctureWallet(string infName) public payable
```

