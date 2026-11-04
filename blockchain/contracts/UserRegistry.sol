// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserRegistry {
    struct User {
        address wallet;
        string username;
        uint256 reputationScore;
        bool exists;
        uint256 registeredAt;
    }

    address public owner;
    mapping(address => bool) private authorizedCallers;

    mapping(address => User) private users;
    mapping(string => address) private usernameToAddress;
    address[] private userAddresses;

    event UserRegistered(address indexed wallet, string username, uint256 timestamp);
    event ReputationUpdated(address indexed wallet, uint256 newScore, uint256 timestamp);
    event CallerAuthorized(address indexed caller);
    event CallerRevoked(address indexed caller);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier onlyAuthorized() {
        require(authorizedCallers[msg.sender], "Not authorized to update reputation");
        _;
    }

    modifier onlyRegistered() {
        require(users[msg.sender].exists, "User not registered");
        _;
    }

    modifier notRegistered() {
        require(!users[msg.sender].exists, "User already registered");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function authorizeCaller(address _caller) external onlyOwner {
        authorizedCallers[_caller] = true;
        emit CallerAuthorized(_caller);
    }

    function revokeCaller(address _caller) external onlyOwner {
        authorizedCallers[_caller] = false;
        emit CallerRevoked(_caller);
    }

    function registerUser(string calldata _username) external notRegistered {
        require(bytes(_username).length > 0 && bytes(_username).length <= 32, "Invalid username length");
        require(usernameToAddress[_username] == address(0), "Username taken");

        users[msg.sender] = User({
            wallet: msg.sender,
            username: _username,
            reputationScore: 100,
            exists: true,
            registeredAt: block.timestamp
        });

        usernameToAddress[_username] = msg.sender;
        userAddresses.push(msg.sender);

        emit UserRegistered(msg.sender, _username, block.timestamp);
    }

    function getUser(address _wallet) external view returns (
        string memory username,
        uint256 reputationScore,
        bool exists,
        uint256 registeredAt
    ) {
        User storage u = users[_wallet];
        return (u.username, u.reputationScore, u.exists, u.registeredAt);
    }

    function isRegistered(address _wallet) external view returns (bool) {
        return users[_wallet].exists;
    }

    function getReputationScore(address _wallet) external view returns (uint256) {
        require(users[_wallet].exists, "User does not exist");
        return users[_wallet].reputationScore;
    }

    function updateReputation(address _wallet, uint256 _newScore) external onlyAuthorized {
        require(users[_wallet].exists, "User does not exist");
        require(_newScore <= 1000, "Score exceeds maximum");
        users[_wallet].reputationScore = _newScore;
        emit ReputationUpdated(_wallet, _newScore, block.timestamp);
    }

    function getUserCount() external view returns (uint256) {
        return userAddresses.length;
    }

    function resolveUsername(string calldata _username) external view returns (address) {
        return usernameToAddress[_username];
    }
}
