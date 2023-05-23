let web3;
let contractInstance;
/*Connection to Toll Based Smart Contract*/
const contractAddress = "0x515ca45702925EF19a1fcb7e8392dC8b9734d131";

async function init() {
  /*Connect to the MetaMask Wallet*/
  if (window.ethereum) {
    console.log("Ethereum object found"); // Log when Ethereum object is found
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      console.log("Connection to MetaMask successful"); // Log when connection to MetaMask is successful
    } catch (error) {
      console.error("User denied account access");
    }
  } else if (window.web3) {
    console.log("Web3 object found"); // Log when web3 object is found
    web3 = new Web3(window.web3.currentProvider);
  } else {
    console.error("No web3 provider detected");
    return;
  }

  contractInstance = new web3.eth.Contract(contractABI, contractAddress);
  console.log("Contract instance created"); // Log when contract instance is created

  listenForEvents();
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let infName = document.getElementById("infName").value;

  addUserToDatabase(firstname, lastname, infName);
}

function listenForEvents() {
  /* Listener for each event in sc*/
  contractInstance.events.CreateAccount({}, (error, event) => {
    if (error) console.error(error);
    document.getElementById("CreateAccount").innerHTML = JSON.stringify(event);
  });
}

async function getAllInfArrayItems() {
  try {
    const accounts = await web3.eth.getAccounts();
    await contractInstance.methods.getAllInfArrayItems().send({ from: accounts[0] });
    // Listen for the printinfArray event from the contract
    contractInstance.events.printinfArray((error, event) => {
      if (error) {
        console.error(error);
      } else {
        // Display the infrastructure array items
        console.log(event); // log the entire event object
        const content = document.getElementById("getAllInfArrayItemsResult");
        content.textContent += `Infrastructure Name: ${event.returnValues[0]}, Infrastructure Wallet: ${event.returnValues[1]}, Total Revenue: ${event.returnValues[2]}, Withdrawable Revenue: ${event.returnValues[3]}, Total Visits: ${event.returnValues[4]}\n`;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

async function addUserToDatabase() {
  try {
    // Fetch values from form
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let infName = document.getElementById("infName").value;

    // Debug logs to check variable values
    console.log("firstname:", firstname);
    console.log("lastname:", lastname);
    console.log("infName:", infName);

    // Assumes that accounts[0] is the connected account
    const accounts = await web3.eth.getAccounts();
    await contractInstance.methods.addUserToDataBase(firstname, lastname, infName).send({ from: accounts[0] });
  } catch (error) {
    console.error(error);
  }
}

async function addInfStructure(
  infWallet,
  infName,
  member_type1_cost,
  member_type2_cost,
  member_type3_cost,
  member_type1_threshold,
  member_type2_threshold,
  member_type3_threshold,
) {
  try {
    // Assumes that accounts[0] is the connected account
    const accounts = await web3.eth.getAccounts();

    // Call the addInfStructure function
    await contractInstance.methods
      .addInfStructure(
        infWallet,
        infName,
        member_type1_cost,
        member_type2_cost,
        member_type3_cost,
        member_type1_threshold,
        member_type2_threshold,
        member_type3_threshold,
      )
      .send({ from: accounts[0] });

    console.log("addInfStructure called successfully");
  } catch (error) {
    console.error(error);
  }
}

function callAddInfStructure() {
  let infWallet = document.getElementById("infWallet").value;
  let infName = document.getElementById("infName").value;
  let member_type1_cost = document.getElementById("member_type1_cost").value;
  let member_type2_cost = document.getElementById("member_type2_cost").value;
  let member_type3_cost = document.getElementById("member_type3_cost").value;
  let member_type1_threshold = document.getElementById("member_type1_threshold").value;
  let member_type2_threshold = document.getElementById("member_type2_threshold").value;
  let member_type3_threshold = document.getElementById("member_type3_threshold").value;

  addInfStructure(
    infWallet,
    infName,
    member_type1_cost,
    member_type2_cost,
    member_type3_cost,
    member_type1_threshold,
    member_type2_threshold,
    member_type3_threshold,
  );
}

async function getAllIndUsersArrayItems() {
  try {
    const accounts = await web3.eth.getAccounts();
    await contractInstance.methods.getAllIndUsersArrayItems().send({ from: accounts[0] });
    // Listen for the printIndUserArray event from the contract
    contractInstance.events.printIndUserArray((error, event) => {
      if (error) {
        console.error(error);
      } else {
        // Display the individual user array items
        console.log(event);
        const content = document.getElementById("getAllIndUsersArrayItemsResult");
        content.textContent += `First Name: ${event.returnValues[0]}, Last Name: ${event.returnValues[1]}, Wallet: ${event.returnValues[2]}, Total Payed: ${event.returnValues[3]}, User Type: ${event.returnValues[4]}\n`;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

init();
