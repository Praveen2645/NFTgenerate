async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT"); //to get the instance of the contract by using ether.js

  // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await MyNFT.deploy();
  console.log("Contract deployed to address:", myNFT.address); //console.log to get the address of the contract 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
