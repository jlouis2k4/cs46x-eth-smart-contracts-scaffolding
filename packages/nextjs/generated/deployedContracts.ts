const contracts = {
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        Crowdfunding: {
          address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "projectAddress",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "contributedAmount",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "contributor",
                  type: "address",
                },
              ],
              name: "ContributionReceived",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "projectContractAddress",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "minContribution",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "projectDeadline",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "targetAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currentAmount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "noOfContributors",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "title",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "desc",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currentState",
                  type: "uint256",
                },
              ],
              name: "ProjectCreation",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_projectAddress",
                  type: "address",
                },
              ],
              name: "contribute",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "minimumContribution",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "targetContribution",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "projectTitle",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "projectDesc",
                  type: "string",
                },
              ],
              name: "createProject",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "returnAllProjects",
              outputs: [
                {
                  internalType: "contract Project[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        Project: {
          address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_creator",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_minimumContribution",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_deadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_targetContribution",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_projectTitle",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_projectDesc",
                  type: "string",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "requestId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "noOfVotes",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "isApproved",
                  type: "bool",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
              ],
              name: "AmountWithdrawSuccessful",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "contributor",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currentTotal",
                  type: "uint256",
                },
              ],
              name: "FundingReceived",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "requestId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "noOfVotes",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "isApproved",
                  type: "bool",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "recipient",
                  type: "address",
                },
              ],
              name: "WithdrawRequestCreated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "voter",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalVote",
                  type: "uint256",
                },
              ],
              name: "WithdrawVote",
              type: "event",
            },
            {
              inputs: [],
              name: "completedAt",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_contributor",
                  type: "address",
                },
              ],
              name: "contribute",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "contributors",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_description",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "address payable",
                  name: "_recipient",
                  type: "address",
                },
              ],
              name: "createWithdrawRequest",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "creator",
              outputs: [
                {
                  internalType: "address payable",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "deadline",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getContractBalance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getProjectDetails",
              outputs: [
                {
                  internalType: "address payable",
                  name: "projectOwner",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "minContribution",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "projectDeadline",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "goalAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "timeOfCompletion",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "currentAmount",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "title",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "desc",
                  type: "string",
                },
                {
                  internalType: "enum Project.State",
                  name: "currentState",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "balance",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "minimumContribution",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "noOfContributers",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "numOfWithdrawRequests",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "projectDesc",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "projectTitle",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "raisedAmount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "requestRefund",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "state",
              outputs: [
                {
                  internalType: "enum Project.State",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "targetContribution",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_requestId",
                  type: "uint256",
                },
              ],
              name: "voteWithdrawRequest",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_requestId",
                  type: "uint256",
                },
              ],
              name: "withdrawRequestedAmount",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "withdrawRequests",
              outputs: [
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "noOfVotes",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "isApproved",
                  type: "bool",
                },
                {
                  internalType: "address payable",
                  name: "recipient",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
