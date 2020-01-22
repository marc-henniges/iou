var Account = artifacts.require("./Account.sol");

contract("Account", function (accounts) {
    var accountInstance;

    // define roles:
    ownerAddress = accounts[0];
    firstAccountAddress = accounts[1];

    it("initializes account", function () {
        return Account.deployed()
            // Owner may change the value:
            .then(function (instance) {
                accountInstance = instance;
                return accountInstance.setFirstVariable(42, { from: ownerAddress });
            })
            .then(function () {
                return myValue = accountInstance.firstVariable();
            })
            .then(function (readVariable) {
                console.log(readVariable);
                assert.equal(readVariable, 42);
            });
    });

});
