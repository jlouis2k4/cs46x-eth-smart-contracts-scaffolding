let web3;
let contractInstance;
/*Connection to Lenders Smart Contract*/
const contractAddress = "0x898ae2b5209F99d405804146F9fbf882716247D0";

async function init() {
  const getAddressButton = document.getElementById("getAddressButton");
  const scAddress = document.getElementById("scAddress");

  //For Create Loan
  const createLoanButton = document.getElementById("createLoanButton");
  createLoanButton.addEventListener("click", createLoan);

  //For Get MyActiveLoans
  const getMyActiveLoansButton = document.getElementById("getMyActiveLoansButton");
  const myActiveLoans = document.getElementById("myActiveLoans");
  getMyActiveLoansButton.addEventListener("click", () => getMyActiveLoans(myActiveLoans));

  //For LendLoan loanIdLL = loan Id for LendLoan
  const lendLoanButton = document.getElementById("lendLoanButton");
  const loanIdLLInput = document.getElementById("loanIdLend");
  const lendLoanResult = document.getElementById("lendLoanResult");
  lendLoanButton.addEventListener("click", async () => {
    const loanIdLL = parseInt(loanIdLLInput.value);
    if (!isNaN(loanIdLL)) {
      await lendLoan(loanIdLL);
      lendLoanResult.innerHTML = "Loan lended successfully!";
    } else {
      lendLoanResult.innerHTML = "Invalid loan ID. Please enter a valid loan ID.";
    }
  });

  //For repayInstallment
  const repayInstallmentButton = document.getElementById("repayInstallmentButton");
  const installmentIdInput = document.getElementById("loanIdInstallment");
  const repayInstallmentResult = document.getElementById("repayInstallmentResult");
  repayInstallmentButton.addEventListener("click", async () => {
    const installmentId = parseInt(installmentIdInput.value);
    if (!isNaN(installmentId)) {
      await repayInstallment(installmentId);
      repayInstallmentResult.innerHTML = "Installment repaied successfully!";
    } else {
      repayInstallmentResult.innerHTML = "Invalid loan ID. Please enter a valid loan ID.";
    }
  });

  //For repayInterest
  const repayInterestButton = document.getElementById("repayInterestButton");
  const interestIdInput = document.getElementById("loanIdInterest");
  const repayInterestResult = document.getElementById("repayInterestResult");
  repayInterestButton.addEventListener("click", async () => {
    const interestId = parseInt(interestIdInput.value);
    if (!isNaN(interestId)) {
      await repayInterest(interestId);
      repayInterestResult.innerHTML = "Installment repaied successfully!";
    } else {
      repayInterestResult.innerHTML = "Invalid loan ID. Please enter a valid loan ID.";
    }
  });

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
    } catch (error) {
      console.error("User denied account access");
    }
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    console.error("No web3 provider detected");
    return;
  }

  contractInstance = new web3.eth.Contract(contractABI, contractAddress);

  getAddressButton.addEventListener("click", getSmartContractAddress);

  listenForEvents();

  async function getSmartContractAddress() {
    const accounts = await web3.eth.getAccounts();
    scAddress.innerHTML = "getting message.";

    // Reference the "getThisSmartContractAddress" function from smart contract
    const getThisSmartContractAddressFunction = contractInstance.methods.getThisSmartContractAddress();

    // Call the "getThisSmartContractAddress" function
    try {
      const receipt = await getThisSmartContractAddressFunction.send({ from: accounts[0] });
      console.log("Transaction receipt:", receipt);

      // Check if the event is present in the transaction receipt
      if (receipt.events.thisSCAddress) {
        scAddress.innerHTML = `Smart Contract Address: ${receipt.events.thisSCAddress.returnValues[1]}`;
      } else {
        scAddress.innerHTML = "Error: Event not found in the transaction receipt.";
      }
    } catch (error) {
      console.error(error);
      scAddress.innerHTML = "Error: Failed to get smart contract address.";
    }
  }
}

function listenForEvents() {
  contractInstance.events
    .thisSCAddress()
    .on("data", event => {
      console.log("Event received:", event);
      document.getElementById("scAddress").innerHTML = `Smart Contract Address: ${event.returnValues[1]}`;
    })
    .on("error", console.error);
}

async function createLoan() {
  const accounts = await web3.eth.getAccounts();
  const lendeeAddress = document.getElementById("lendeeAddress").value;
  const loanAmount = document.getElementById("loanAmount").value;
  const interestRate = document.getElementById("interestRate").value;
  const loanPeriod = document.getElementById("loanPeriod").value;
  const loanInstallmentPeriod = document.getElementById("loanInstallmentPeriod").value;

  try {
    const receipt = await contractInstance.methods
      .createLoan(
        lendeeAddress,
        accounts[0],
        web3.utils.toWei(loanAmount, "ether"),
        interestRate,
        loanPeriod,
        loanInstallmentPeriod,
      )
      .send({ from: accounts[0] });

    console.log("Transaction receipt:", receipt);
  } catch (error) {
    console.error(error);
  }
}

async function getMyActiveLoans(outputElement) {
  const accounts = await web3.eth.getAccounts();

  // Reference the "getMyActiveLoans" function from smart contract
  const getMyActiveLoansFunction = contractInstance.methods.getMyActiveLoans();

  // Call the "getMyActiveLoans" function
  try {
    const gasEstimate = await getMyActiveLoansFunction.estimateGas({ from: accounts[0] });
    const receipt = await getMyActiveLoansFunction.send({ from: accounts[0], gas: gasEstimate });
    console.log("Transaction receipt:", receipt);

    // Check if the event is present in the transaction receipt
    if (receipt.events.myActiveLoans) {
      const event = receipt.events.myActiveLoans.returnValues;
      outputElement.innerHTML = `
                <p>${event[0]}</p>
                <p>Lendee Loan IDs: ${event[1].toString()}</p>
                <p>Lender Loan IDs: ${event[2].toString()}</p>
            `;
    } else {
      outputElement.innerHTML = "Error: Event not found in the transaction receipt.";
    }
  } catch (error) {
    console.error(error);
    outputElement.innerHTML = "Error: Failed to get active loans.";
  }
}

async function lendLoan(loanId) {
  const accounts = await web3.eth.getAccounts();

  // Reference the "lendLoan" function from smart contract
  const lendLoanFunction = contractInstance.methods.lendLoan(loanId);

  // Call the "lendLoan" function
  try {
    const gasEstimate = await lendLoanFunction.estimateGas({
      from: accounts[0],
      value: web3.utils.toWei("100", "ether"),
    });
    const receipt = await lendLoanFunction.send({
      from: accounts[0],
      gas: gasEstimate,
      value: web3.utils.toWei("100", "ether"),
    });
    console.log("Transaction receipt:", receipt);

    // Check if the event is present in the transaction receipt
    if (receipt.events.Lended) {
      console.log("Loan Lended:", receipt.events.Lended.returnValues);
    } else {
      console.log("Error: Event not found in the transaction receipt.");
    }
  } catch (error) {
    console.error(error);
    console.log("Error: Failed to lend loan.");
  }
}

async function repayInstallment(loanId) {
  const accounts = await web3.eth.getAccounts();

  // Reference the "repayInstallment" function from smart contract
  const repayInstallmentFunction = contractInstance.methods.repayInstallment(loanId);

  // Call the "repayInstallment" function
  try {
    const gasEstimate = await repayInstallmentFunction.estimateGas({
      from: accounts[0],
      value: web3.utils.toWei("100", "ether"),
    });
    const receipt = await repayInstallmentFunction.send({
      from: accounts[0],
      gas: gasEstimate,
      value: web3.utils.toWei("100", "ether"),
    });
    console.log("Transaction receipt:", receipt);

    // Check if the event is present in the transaction receipt
    if (receipt.events.InstallmentRepaid) {
      console.log("Installment repaid:", receipt.events.InstallmentRepaid.returnValues);
    } else {
      console.log("Error: Event not found in the transaction receipt.");
    }
  } catch (error) {
    console.error(error);
    console.log("Error: Failed to repay installment.");
  }
}

async function repayInterest(loanId) {
  const accounts = await web3.eth.getAccounts();

  // Reference the "repayInterest" function from smart contract
  const repayInterest = contractInstance.methods.repayInterest(loanId);

  // Call the "repayInterest" function
  try {
    const gasEstimate = await repayInterest.estimateGas({ from: accounts[0], value: web3.utils.toWei("100", "ether") });
    const receipt = await repayInterest.send({
      from: accounts[0],
      gas: gasEstimate,
      value: web3.utils.toWei("100", "ether"),
    });
    console.log("Transaction receipt:", receipt);

    // Check if the event is present in the transaction receipt
    if (receipt.events.InterestRepaid) {
      console.log("Intrest repaid:", receipt.events.InterestRepaid.returnValues);
    } else {
      console.log("Error: Event not found in the transaction receipt.");
    }
  } catch (error) {
    console.error(error);
    console.log("Error: Failed to repay intrest.");
  }
}

init();
