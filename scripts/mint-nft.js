require("dotenv").config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3} = require ("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract =require("../artifacts/contracts/nft.sol/MyNFT.json");
//console.log(JSON.stringify(contract.abi));

const contractAddress = "0xbb26ef0e7fc708F2B0b8DD4b7aE2f647C90c5Ee9";

const nftContract= new web3.eth.Contract(contract.abi,contractAddress); // to create a instance of the contract

// to create transactions 
async function mintNFT(tokenURI){
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY,"latest"); 

    const txn = {
        'from': PUBLIC_KEY,
        'to':contractAddress,
        'nonce': nonce,
        'gas': 600000,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY,tokenURI).encodeABI()
    };

    const signPromise = web3.eth.accounts.signTransaction(txn, PRIVATE_KEY);
    signPromise
      .then((signedTxn) => {
        web3.eth.sendSignedTransaction(
          signedTxn.rawTransaction, //using web3 for signning the transaction
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              );
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              );
            }
          }
        );
      })
      .catch((err) => {
        console.log(" Promise failed:", err);
      });
  }
  //calling the mintNFT function
  mintNFT(
    "QmYEJw7EBj3UhSTtv8yCjHLgJan9n8kN9BpyYAzPjspAfW" //this is the uri of metadata.json uploaded on pinata
  );


