pragma solidity >=0.5.8 <0.6.0;

import "node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Account is Ownable {
    using SafeMath for uint256;

    mapping(address => uint256) private _accounts;
    mapping(uint256 => address[]) private _accountAddresses;
    uint256 public numOfAccounts;

    event AccountCreated(
        address indexed creatingAddress,
        uint256 indexed accountNumber
    );

    constructor() public Ownable() {
        numOfAccounts = 0;
    }

    // modifier firstModifier() {
    //   if (msg.sender === owner) _;
    // }

    function createAccount() public returns (bool) {
        uint256 thisAccountNumber = numOfAccounts.add(1);
        _accounts[_msgSender()] = thisAccountNumber;
        _accountAddresses[thisAccountNumber].push(_msgSender());
        numOfAccounts = thisAccountNumber;
        emit AccountCreated(_msgSender(), thisAccountNumber);
    }

    function getMyAccountId() public view returns (uint256) {
        return _accounts[_msgSender()];
    }

}
