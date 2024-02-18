/// <reference types="ethers" />
// This line is a TypeScript directive that includes type definitions for ethers, helping with type checking and intellisense in your IDE.

import { expect } from "chai";
import { ethers } from "hardhat";
// Importing necessary modules: `expect` from Chai for assertions and `ethers` from the Hardhat package to interact with Ethereum.

import { SaveERC20 } from "../typechain-types";
import { ShibaInu } from "../typechain-types";
// Importing the type definitions for your contracts from TypeChain.
//This provides TypeScript types for your contract's methods and properties.

describe("SaveERC20 Contract", () => {
    // Starting a test suite with Mocha's `describe`.
    let saveErc20: SaveERC20;
    let shibainu: ShibaInu;
    // Declaring variables to hold instances of your contracts. These will be initialized before each test.

    beforeEach(async () => {
        // `beforeEach` is a hook that runs before each test case in the `describe` block. It's used to set up the test environment.

        const initialOwner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        // Hardcoded address, presumably intended to be the initial owner, but it's not used in the setup.

        const ShibaInu = await ethers.getContractFactory("ShibaInu")
        // Getting the contract factory for "ShibaInu" which is used to deploy new instances of the contract.

        shibainu = await ShibaInu.deploy()
        // Deploying a new instance of the "ShibaInu" contract.

        const SaveERC20 = await ethers.getContractFactory("SaveERC20")
        // Getting the contract factory for "SaveERC20".

        saveErc20 = await SaveERC20.deploy(shibainu.target)
    })

    describe("Deposit", () => {
        // Nested `describe` block specifically for testing deposit functionality.

        it.only("Should deposit Properly", async () => {
            // `it.only` means this is the only test that will run in the suite. The test is intended to check the deposit functionality.

            const depositAmount = 0
            // Setting the deposit amount to 0, which is used to test the validation that prevents 0-value deposits.

            const [owner] = await ethers.getSigners();
            // Getting the list of signers (accounts) from Hardhat and destructuring to get the first account as `owner`.

            const ownerbal = await shibainu.connect(owner).balanceOf(owner.address);
            // Querying the balance of "ShibaInu" tokens for the `owner` account.

            console.log(ownerbal)
            // Logging the `owner`'s token balance to the console.

            await shibainu.connect(owner).approve(saveErc20.target, depositAmount);
            // Approving the "SaveERC20" contract to spend `depositAmount` of "ShibaInu" tokens on behalf of `owner`.

            await expect(saveErc20.connect(owner).deposit(depositAmount)).to.be.revertedWith("can't save zero value")
            // Expecting the deposit transaction to fail and revert with the message "can't save zero value" since `depositAmount` is 0.

            const contractBal = await saveErc20.connect(owner).checkContractBalance()
            // Querying the "SaveERC20" contract's balance of "ShibaInu" tokens after the attempted deposit.

            console.log(contractBal)
            // Logging the contract's token balance to the console.
        })
    })
})