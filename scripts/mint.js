// Import necessary modules from Hardhat and SwisstronikJS
const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

// Function to send a shielded transaction using the provided signer, destination, data, and value
const sendShieldedTransaction = async (signer, destination, data, value) => {
    // Get the RPC link from the network configuration
    const rpcLink = hre.network.config.url;

    // Encrypt transaction data
    const [encryptedData] = await encryptDataField(rpcLink, data);

    // Construct and sign transaction with encrypted data
    return await signer.sendTransaction({
        from: signer.address,
        to: destination,
        data: encryptedData,
        value,
    });
};

async function main() {
    const replace_contractAddress = "0x0d2a0920Ba67Dcb2426148a5eb9F1b4eB10d0432";
    const [signer] = await hre.ethers.getSigners();
    const replace_contractFactory = await hre.ethers.getContractFactory("TestNFT");
    const contract = replace_contractFactory.attach(replace_contractAddress);

    const replace_functionName = "safeMint"; // Corrected function name
    const replace_functionArgs = ["0xC12E78Bd247b8510E53D4a353d12f51Eb90a367F"]; // Recipient address

    try {
        const transaction = await sendShieldedTransaction(signer, replace_contractAddress, contract.interface.encodeFunctionData(replace_functionName, replace_functionArgs), 0);
        console.log(`Transaction submitted! Transaction hash: ${transaction.hash}`);
        await transaction.wait();

        // Display success message with recipient address
        console.log(`Transaction completed successfully! ✅   Non-Fungible Token minted to ${replace_functionArgs[0]}.`);
        console.log(`Transaction hash: ${transaction.hash}`);
    } catch (error) {
        console.error(`Transaction failed! Could not mint NFT.`);
        console.error(error);
    }
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});