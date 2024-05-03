const { ethers } = require("ethers");

const INFURA_ID = "b8679ab2f22446f5bf31f4321ffec88b"
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`)

const account1 = "0xD40F3B20db1c39B3A17C36c9221d753e9602E71A" // sender
const account2 = "0xDd7fC3F6412e3C24150573b843834554AaD55292" // receiver

const privateKey1 = "69c2442b077c4659c86905750c91a52633933795d7d5cfd515aa88ee182093e0"  // sender private key
const wallet = new ethers.Wallet(privateKey1, provider)

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
];

const address = "0x779877A7B0D9E8603169DdbD7836e478b4624789";
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
  const balance = await contract.balanceOf(account1)

  console.log(`\nReading from ${address}\n`)
  console.log(`Balance of sender: ${balance}\n`)

  const contractWithWallet = contract.connect(wallet)
  const tx = await contractWithWallet.transfer(account2, balance)

  await tx.wait()
  console.log(tx)

  const balanceOfSender = await contract.balanceOf(account1)
  const balanceOfReceiver = await contract.balanceOf(account2)

  console.log(`\nBalance of sender: ${balanceOfSender}`)
  console.log(`Balance of receiver: ${balanceOfReceiver}\n`)
}

main()