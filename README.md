## Swisstronik: Mint an ERC-721 Token with Hardhat (README.md)

This guide details how to mint an ERC-721 token using Hardhat and the OpenZeppelin Contracts Wizard, deploying it on the Swisstronik blockchain.

### Prerequisites

* Visual Studio Code
* Node.js and npm installed
* Basic understanding of Solidity and smart contracts
* MetaMask wallet with funds and private key

### Steps

**1. Setting Up the Project**

1. Open your terminal and create a new project directory:

```bash
mkdir MyERC721Token
cd MyERC721Token
```

2. Install Hardhat:

```bash
npm install --save-dev hardhat
```

3. Initialize a Hardhat project:

```bash
npx hardhat init



also install 

npm install @nomicfoundation/hardhat-web3-v4 web3-utils @openzeppelin/contracts @swisstronik/web3-plugin-swisstronik web3 --save-dev



```

4. Open the project in VS Code:

```bash
code .
```

5. Delete unnecessary files:

- `Lock.sol` in the `Contracts` folder
- `Ignition` file

6. Set a variable with your private key (copied from MetaMask):

```bash
npx hardhat vars set PRIVATE_KEY
```

7. Configure the Swisstronik network in `hardhat.config.js`:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-web3-v4");

// Remember to use the private key of a testing account
// For better security practices, it's recommended to use npm i dotenv for storing secret variables

//use configuration-variables in hardhat to set PRIVATE_KEY variable
const PRIVATE_KEY = vars.get("PRIVATE_KEY");

module.exports = {
  defaultNetwork: "swisstronik",
  solidity: "0.8.20",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/",
      accounts: [`0x` + `${PRIVATE_KEY}`],
    },
  },
};

```

**2. Creating the ERC-721 Smart Contract**

1. Navigate to the OpenZeppelin Contracts Wizard website and choose ERC-721.
2. Set your token name and symbol, enable "Mintable" and "Auto Increment Ids".
3. Copy the generated Solidity code.


//TestNFT.sol
```solidity 

// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestNFT is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("TestNFT", "TNFT")
        Ownable(initialOwner)
    {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}


```


4. Create a new file named `TestNFT.sol` in the `Contracts` folder and paste the code.

**3. Deploying the Smart Contract**

1. Create a new file named `deploy.js` in the `scripts` folder.
2. Paste the following script:

```javascript
const { ethers } = require("hardhat");


async function main() {
    // Get the ContractFactory and Signers here.
    const [deployer] = await ethers.getSigners();


    console.log("Deploying contracts with the account:", deployer.address);


    // We get the contract to deploy
    const TokenContract = await ethers.getContractFactory("TestNFT");
   
    // Deploy the contract and pass the initialOwner address
    const initialOwner = deployer.address;
    const myToken = await TokenContract.deploy(initialOwner);


    console.log("Non Fungible Token Contract address:", myToken.target);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

```

3. Run the deployment script:

```bash
npx hardhat run scripts/deploy.js --network swisstronik
```

4. Copy the deployed contract address.

**4. Minting 1 ERC-721 Token**
`

1. Create a new file named `mint.js` in the `scripts` folder.
2. Paste the following script:

```javascript
// Import necessary modules from Hardhat and SwisstronikJS
const hre = require("hardhat");
const { SwisstronikPlugin } = require("@swisstronik/web3-plugin-swisstronik");

hre.web3.registerPlugin(new SwisstronikPlugin(hre.network.config.url));

async function main() {
    const replace_contractAddress = " <Replace with Contract Address>  ";
    const [from] = await hre.web3.eth.getAccounts();
    const contractFactory = await hre.ethers.getContractFactory("TestNFT");

    const ABI = JSON.parse(contractFactory.interface.formatJson());
    const contract = new hre.web3.eth.Contract(ABI, replace_contractAddress);
    const replace_functionArgs = "<Replace with Wallet Address to mint NFT>"; // Recipient address

    const amountMinted = hre.ethers.formatEther("1000000000000000000"); // Set the desired amount to mint (optional)
    // Display message only if amountMinted is defined
    console.log(`Minting ${amountMinted ? amountMinted : 1} token...`);

    try {
        const transaction = await contract.methods.safeMint(replace_functionArgs).send({ from });
        console.log("Transaction submitted! Transaction hash:", transaction);

        // Display success message with recipient address
        console.log(`Transaction completed successfully! ✅  ${amountMinted}  Non-Fungible Token minted to ${replace_functionArgs}`);
        console.log("Transaction hash:", transaction.logs[0].transactionHash);
    } catch (error) {
        console.error(`Transaction failed! Could not mint NFT.`);
        console.error(error);
    }
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

```


**5. Publishing the Code to GitHub**

1. Create a new GitHub repository.
2. Push your project files to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repository-url>
git push -u origin main
```




**6. Submitting Task Details on Swisstronik Testnet 2 Dashboard**

1. Fill in the required details on the dashboard:
   - **Deployed ERC-721 Contract Address:** Paste the address from your terminal.
   - **GitHub Repository:** Paste the URL of your GitHub repository.
   - **Transaction Link:** Paste the transaction link from the Swisstronik EVM explorer.

2. Submit the task.

**Congratulations!** You've successfully minted an ERC-721 token, deployed a smart contract using Hardhat, and submitted all the necessary details to complete the task.










```
 npx hardhat run scripts/deploy.js --network swisstronik
Deploying contracts with the account: 0x8Ab77353aC866B7Ab690890e620c249A8D3e92D0
Non Fungible Token Contract address: 0xe7bc1B0dDA2956809a512F8963c007E761b479f1
```