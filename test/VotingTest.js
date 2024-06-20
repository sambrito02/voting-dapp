const Voting = artifacts.require("Voting");

contract("Voting", accounts => {
  const [deployerAccount, voter1, voter2] = accounts;

  before(async () => {
    this.voting = await Voting.new("Alice", { from: deployerAccount });
  });

  it("should initialize with the correct candidate", async () => {
    const candidate = await this.voting.candidate();
    assert.equal(candidate, "Alice", "The initial candidate should be Alice");
  });

  it("should increment vote count when a vote is cast", async () => {
    const initialVoteCount = await this.voting.voteCount();
    await this.voting.vote({ from: voter1 });
    const newVoteCount = await this.voting.voteCount();
    assert.equal(newVoteCount.toNumber(), initialVoteCount.toNumber() + 1, "Vote count should increment");
  });

  it("should not increment vote count when a vote is cast by the same account again", async () => {
    try {
      await this.voting.vote({ from: voter1 });
      assert.fail("The vote should have been reverted");
    } catch (error) {
      assert.include(error.message, "revert", "The error message should contain 'revert'");
    }
  });
});

