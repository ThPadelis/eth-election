const { assert } = require("chai");

const Election = artifacts.require("../contracts/Election.sol");

contract("Election", (accounts) => {
    let meta;
    it("initializes with two candidates", () => {
        return Election.deployed()
            .then((instance) => instance.candidatesCount())
            .then((count) => {
                const c = count.toNumber();
                assert.equal(c, 2)
            }).catch()
    });

    it("initializes the candidates with the correct values", () => {
        return Election.deployed()
            .then(instance => {
                meta = instance;
                return meta.candidates(1);
            })
            .then((candidate) => {
                const id = candidate[0].toNumber();
                const name = candidate[1];
                const votes = candidate[2].toNumber();
                assert.equal(id, 1, "contains the correct id");
                assert.equal(name, "Padelis Theodosiou", "contains the corrent name");
                assert.equal(votes, 0, "contains the corrent votes count");
                return meta.candidates(2);
            })
            .then((candidate) => {
                const id = candidate[0].toNumber();
                const name = candidate[1];
                const votes = candidate[2].toNumber();

                assert.equal(id, 2, "contains the correct id");
                assert.equal(name, "Jonh Doe", "contains the corrent name");
                assert.equal(votes, 0, "contains the corrent votes count");
            })
    })
})