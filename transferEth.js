const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:8545'); // Make sure Ganache is running on this address

const fromAddress = '0xc291DC2243a6a5cf4c2A5De54f568fA99E0A777c'; // Replace with the sender address
const toAddress = '0xc2955B6ff4558DcF20aCfE9eefD108895aAC8362'; // Replace with the receiver address
const privateKey = '96d8e56e78a7d8c35e56f343af17095fb27f6a83ee29d3c387718e226adff4ab'; // Replace with the sender's private key

const transferETH = async () => {
  const tx = {
    from: fromAddress,
    to: toAddress,
    value: web3.utils.toWei('95', 'ether'),
    gas: 2000000
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

  web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    .on('receipt', console.log)
    .on('error', console.error);
};

transferETH();

