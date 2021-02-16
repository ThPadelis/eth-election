// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

contract Election {
    // Model a candidate
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    // Store candidates
    mapping(uint256 => Candidate) public candidates;
    // Store candidates count
    uint256 public candidatesCount;

    // Constructor
    constructor() {
        addCandidate("Padelis Theodosiou");
        addCandidate("Jonh Doe");
    }

    // Add a candidate
    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}
