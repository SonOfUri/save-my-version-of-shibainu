// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ShibaInu is ERC20 {
    constructor() ERC20("Shiba Inu", "Shib") {
        _mint(msg.sender, 10000000 * 10**decimals());
    }
}
