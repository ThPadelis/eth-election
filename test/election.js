const { assert } = require("chai");

const Election = artifacts.require("../contracts/Election.sol");

contract("Election", (accounts) => {
  let meta;
  it("initializes with two candidates", () => {
    return Election.deployed()
      .then((instance) => instance.candidatesCount())
      .then((count) => {
        const c = count.toNumber();
        assert.equal(c, 4);
      })
      .catch();
  });

  it("initializes the candidates with the correct values", () => {
    return Election.deployed()
      .then((instance) => {
        meta = instance;
        return meta.candidates(1);
      })
      .then((candidate) => {
        const id = candidate[0].toNumber();
        const name = candidate[1];
        const votes = candidate[2].toNumber();
        assert.equal(id, 1, "contains the correct id");
        assert.equal(name, "Jane Doe", "contains the corrent name");
        assert.equal(votes, 0, "contains the corrent votes count");
        return meta.candidates(2);
      })
      .then((candidate) => {
        const id = candidate[0].toNumber();
        const name = candidate[1];
        const votes = candidate[2].toNumber();

        assert.equal(id, 2, "contains the correct id");
        assert.equal(name, "John Doe", "contains the corrent name");
        assert.equal(votes, 0, "contains the corrent votes count");
      });
  });

  it("allows a voter to cast a vote", () => {
    return Election.deployed()
      .then((instance) => {
        meta = instance;
        candidateId = 1;
        return meta.vote(candidateId, { from: accounts[0] });
      })
      .then((receipt) => {
        assert.equal(receipt.logs.length, 1, "an event was triggered");
        assert.equal(receipt.logs[0].event, "VotedEvent", "the event type is correct");
        assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, "the candidate id is correct");
        return meta.voters(accounts[0]);
      })
      .then((voted) => {
        assert(voted, "the voter was marked as voted");
        return meta.candidates(candidateId);
      })
      .then((candidate) => {
        let voteCount = candidate[2].toNumber();
        assert.equal(voteCount, 1, "increments the candidate's vote count");
      })
      .catch((error) => {
        console.warn({ error });
      });
  });

  it("throws an exception for invalid candiates", () => {
    return Election.deployed()
      .then((instance) => {
        meta = instance;
        return meta.vote(99, { from: accounts[1] });
      })
      .then(assert.fail)
      .catch((error) => {
        assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        return meta.candidates(1);
      })
      .then((candidate1) => {
        let voteCount = candidate1[2].toNumber();
        assert.equal(voteCount, 1, "Padelis Theodosiou did not receive any votes");
        return meta.candidates(2);
      })
      .then((candidate2) => {
        let voteCount = candidate2[2].toNumber();
        assert.equal(voteCount, 0, "Jonh Doe did not receive any votes");
      })
      .catch((error) => {
        console.warn(error);
      });
  });

  it("throws an exception for double voting", () => {
    return Election.deployed()
      .then((instance) => {
        meta = instance;
        candidateId = 2;
        meta.vote(candidateId, { from: accounts[1] });
        return meta.candidates(candidateId);
      })
      .then((candidate) => {
        let voteCount = candidate[2].toNumber();
        assert.equal(voteCount, 1, "accepts first vote");
        // Try to vote again
        return meta.vote(candidateId, { from: accounts[1] });
      })
      .then(assert.fail)
      .catch((error) => {
        assert(error.message.indexOf("revert") >= 0, "error message must contain revert");
        return meta.candidates(1);
      })
      .then((candidate1) => {
        let voteCount = candidate1[2].toNumber();
        assert.equal(voteCount, 1, "Padelis Theodosiou did not receive any votes");
        return meta.candidates(2);
      })
      .then((candidate2) => {
        let voteCount = candidate2[2].toNumber();
        assert.equal(voteCount, 1, "Jonh Doe did not receive any votes");
      })
      .catch((error) => {
        console.warn(error);
      });
  });
});
