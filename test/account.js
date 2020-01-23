
const { BN, constants, expectEvent, shouldFail } = require('openzeppelin-test-helpers');
const chai = require('chai');
chai.should();

var Account = artifacts.require("./Account.sol");

contract("Account", function (accounts) {
    const initialAccountNumber = new BN(0);
    const firstAccountNumber = new BN(1);
    // define roles:
    ownerAddress = accounts[0];
    firstAccountAddress = accounts[1];


    beforeEach(async function () {
        this.token = await Account.new({ from: ownerAddress });
        // Run additional preparing functions:
        //await this.token.mint(initialHolder, initialSupply, { from: initialHolder });
    });

    describe('Account creation', function () {
        it('Check initial account state', async function () {
            (await this.token.numOfAccounts()).should.be.bignumber.equal(initialAccountNumber);
        });

        it('Create account', async function () {
            (await this.token.createAccount({ from: firstAccountAddress }));
            (await this.token.getMyAccountId({ from: firstAccountAddress })).should.be.bignumber.equal(firstAccountNumber);
        });
    });

});
