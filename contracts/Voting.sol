// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    string public candidate;
    uint public voteCount;

    event Voted(address voter, uint votes);

    constructor(string memory _candidate) {
        candidate = _candidate;
        voteCount = 0;
    }

    function vote() public {
        voteCount += 1;
        emit Voted(msg.sender, voteCount);
    }
}

