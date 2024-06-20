// test/Voting.test.js
const Voting = artifacts.require("Voting");

contract("Voting", accounts => {
    it("should initialize with the correct candidate", async () => {
        const instance = await Voting.deployed();
        const candidate = await instance.candidate();
        assert.equal(candidate, "Alice", "The candidate is not Alice");
    });
    it ("should increment vote count when a vote is cast", async() => {
        const instance = await Voting.deployed(); 
        await instance.vote({ from: accounts[0] }); 
        const voteCount = await instance.voteCount(); 
        assert.equal(voteCount.toString(), "1", "The vote count should be 1"); 
});
});
