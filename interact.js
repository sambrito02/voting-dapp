// interact.js
const Web3 = require('web3');
const contract = require('@truffle/contract');
const VotingArtifact = require('./build/contracts/Voting.json');

const init = async () => {
    // Connect to the local blockchain
    const web3 = new Web3('http://localhost:8545');

    // Create a contract instance
    const Voting = contract(VotingArtifact);
    Voting.setProvider(web3.currentProvider);

    // Get accounts
    const accounts = await web3.eth.getAccounts();

    // Get the deployed instance of the contract
    const instance = await Voting.deployed();

    // Interact with the contract
    const candidate = await instance.candidate();
    console.log('Candidate:', candidate);

    // Vote for the candidate 
    await instance.vote({ from: accounts[0] }); 

    // Get updated cote count 
    const voteCount = await instance.voteCount(); 
    console.log('Vote Count: ' , voteCount.toString()); 
};

init();

