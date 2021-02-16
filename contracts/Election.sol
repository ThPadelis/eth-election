// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract Election {
    // Store candidate
    // Read candidate
    string public candidate;

    // Constructor
    constructor() {
        candidate = "Candidate 1";
    }
}
