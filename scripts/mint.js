// Import necessary modules from Hardhat and SwisstronikJS
const hre = require("hardhat");
const { SwisstronikPlugin } = require("@swisstronik/web3-plugin-swisstronik");

hre.web3.registerPlugin(new SwisstronikPlugin(hre.network.config.url));

async function main() {
    const replace_contractAddress = "0x6E9a78C3E08df84A137E4257c8051EFd54FaBdEC";
    const [from] = await hre.web3.eth.getAccounts();
    const contractFactory = await hre.ethers.getContractFactory("TestNFT");

    const ABI = JSON.parse(contractFactory.interface.formatJson());
    const contract = new hre.web3.eth.Contract(ABI, replace_contractAddress);
    const replace_functionArgs = "0x8Ab77353aC866B7Ab690890e620c249A8D3e92D0"; // Recipient address

    const amountMinted = hre.ethers.formatEther("1000000000000000000"); // Set the desired amount to mint (optional)
    // Display message only if amountMinted is defined
    console.log(`Minting ${amountMinted ? amountMinted : 1} token...`);

    try {

        const transaction = await contract.methods.safeMint(replace_functionArgs).send({ from });
        console.log("Transaction submitted! Transaction details:", transaction);


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