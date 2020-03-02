
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
    firstAccountAddressTwo = accounts[2];


    beforeEach(async function () {
        this.token = await Account.new({ from: ownerAddress });
        // Run additional preparing functions:
        //await this.token.mint(initialHolder, initialSupply, { from: initialHolder });
    });

    /*
    beforeEach(function () {
        this.token = Account.new({ from: ownerAddress });
        // Run additional preparing functions:
        //await this.token.mint(initialHolder, initialSupply, { from: initialHolder });
    });
    */

    describe('Account creation', function () {
        it('Check initial account state', async function () {
            (await this.token.numOfAccounts()).should.be.bignumber.equal(initialAccountNumber);
        });

        it('Create account', async function () {
            (await this.token.createAccount({ from: firstAccountAddress }));
            (await this.token.getMyAccountId({ from: firstAccountAddress })).should.be.bignumber.equal(firstAccountNumber);
        });

        it('Adding address fails if account doesn\'t exist', async function () {
            this.token.addAddressToAccount(firstAccountAddressTwo, { from: firstAccountAddress 
            }).catch(function(error) {
                if (error.toString().indexOf('Addresses can only') == -1 ) {
                    assert(false, error.toString());
                }     
            })
        });
        
        it('Add address to account', async function (){
            (await this.token.createAccount({ from: firstAccountAddress }));
            (await this.token.addAddressToAccount(firstAccountAddressTwo, { from: firstAccountAddress }));
            (await this.token.getMyAccountId({ from: firstAccountAddressTwo })).should.be.bignumber.equal(firstAccountNumber);
        });


        it('Getting all added addresses', async function (){
            (await this.token.createAccount({ from: firstAccountAddress }));
            (await this.token.addAddressToAccount(firstAccountAddressTwo, { from: firstAccountAddress }));
            ((await this.token.getMyAddresses({ from: firstAccountAddress })).length).should.be.equal(2);
        })
    });


});
