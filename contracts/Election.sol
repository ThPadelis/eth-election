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
    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store candidates count
    uint256 public candidatesCount;

    event VotedEvent(uint256 _candidateId);

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

    // Vote
    function vote(uint256 _candidateId) public {
        // Require that they haven't voted before
        require(!voters[msg.sender], "this address has already voted");

        // Required a valid candidate
        require(
            _candidateId > 0 && _candidateId <= candidatesCount,
            "there is no candidate with such and id"
        );

        // Record that voter has voted
        voters[msg.sender] = true;

        // Update candidate
        candidates[_candidateId].voteCount++;

        // Fire voted event
        emit VotedEvent(_candidateId);
    }
}
