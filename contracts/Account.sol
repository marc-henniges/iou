pragma solidity >=0.5.8 <0.6.0;

import "node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Account is Ownable {
    using SafeMath for uint256;

    mapping(address => uint256) private _addressAccountMapping;
    mapping(uint256 => address[]) private _accountAddressMapping;
    uint256 public numOfAccounts;

    event AccountCreated(
        address indexed creatingAddress,
        uint256 indexed accountNumber
    );

    event AddressAddedToAccount(
        address indexed senderAddress,
        uint256 indexed accountNumber,
        address indexed addedAddress
    );

    constructor() public Ownable() {
        numOfAccounts = 0;
    }

    // modifier firstModifier() {
    //   if (msg.sender === owner) _;
    // }

    function createAccount() public {
        uint256 thisAccountNumber = numOfAccounts.add(1);
        _addressAccountMapping[_msgSender()] = thisAccountNumber;
        _accountAddressMapping[thisAccountNumber].push(_msgSender());
        numOfAccounts = thisAccountNumber;
        emit AccountCreated(_msgSender(), thisAccountNumber);
    }

    function addAddressToAccount(address addressToAdd) public {
        uint256 thisAccountNumber = getMyAccountId();
        require(thisAccountNumber > 0, 'Addresses can only be added to existing accounts.');
        _accountAddressMapping[thisAccountNumber].push(addressToAdd);
        _addressAccountMapping[addressToAdd] = thisAccountNumber;
        emit AddressAddedToAccount(_msgSender(), thisAccountNumber, addressToAdd);
    }

    function getMyAccountId() public view returns (uint256) {
        return _addressAccountMapping[_msgSender()];
    }

    function getMyAddresses() public view returns (address[] memory){
        return _accountAddressMapping[getMyAccountId()];
    }


}
