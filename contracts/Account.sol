pragma solidity >=0.5.11 < 0.6.0;

import "node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Account {
  using SafeMath for uint256;

  address public owner;
  uint256 public firstVariable;

  constructor() public {
    owner = msg.sender;
  }

  modifier firstModifier() {
    if (msg.sender == owner) _;
   }

  function setFirstVariable(uint256 _inputVariable) public firstModifier returns (bool) {
    firstVariable = _inputVariable;
    return true;
  }

}
