pragma solidity ^0.8.0;

import "hardhat/console.sol";


interface IERC20{
    function balanceOf(address account) external view returns (uint256); 
    function transfer(address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}