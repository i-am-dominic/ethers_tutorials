// Having ethers in our project
const { ethers } = require("ethers");

// Connection to the blockchain. This is what ethers uses to talk to the blockchain
const INFURA_ID = "b8679ab2f22446f5bf31f4321ffec88b";
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

const address = "0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e";

const main = async () => {
  const balance = await provider.getBalance(address);
  console.log(`\nETH Balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`)
}

main()