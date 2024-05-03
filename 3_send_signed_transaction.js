const { ethers } = require("ethers");

const INFURA_ID = "b8679ab2f22446f5bf31f4321ffec88b"
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`)

const account1 = "0xD40F3B20db1c39B3A17C36c9221d753e9602E71A" // sender
const account2 = "0xdBa8e0dba49DBDcd311825BdC52702B45b8e352E" // receiver

const privateKey1 = "69c2442b077c4659c86905750c91a52633933795d7d5cfd515aa88ee182093e0"  // sender private key
const wallet = new ethers.Wallet(privateKey1, provider)

const main = async () => {

  // Sender balance before transfer
  const senderBalanceBefore = await provider.getBalance(account1)
  // Receiver balance before transfer
  const receiverBalanceBefore = await provider.getBalance(account2)

  console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
  console.log(`Receiver balance before: ${ethers.utils.formatEther(receiverBalanceBefore)}\n`)

  // Send Ether
  const tx = await wallet.sendTransaction({
    to: account2,
    value: ethers.utils.parseEther("0.0025")
  })

  // Wait for Transaction to be mined
  await tx.wait()
  console.log(tx)

  // Sender balance after transfer
  const senderBalanceAfter = await provider.getBalance(account1)
  // Receiver balance after transfer
  const receiverBalanceAfter = await provider.getBalance(account2)

  console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
  console.log(`Receiver balance after: ${ethers.utils.formatEther(receiverBalanceAfter)}`)
}

main()