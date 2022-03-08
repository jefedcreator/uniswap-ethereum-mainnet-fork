import { ethers, network } from "hardhat";
import { hrtime } from "process";
const uniRouter ="0xf164fC0Ec4E93095b804a4795bBe1e041497b92a";
const usdt ="0xdAC17F958D2ee523a2206206994597C13D831ec7";
const usdtHolder = "0x428e42d4ccbd57e2b4613dc066bcbc28c82a16fc";
const uni = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
const amountIn = 10000e6
const wrappedEth = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"

async function swap() {
    const usdtSigner = await ethers.getSigner(usdtHolder);
    const router = await ethers.getContractAt("IRouter", uniRouter,usdtSigner);
    const usdtContract = await ethers.getContractAt("IERC20", usdt,usdtSigner);
    const uniContract = await ethers.getContractAt("IERC20",uni);
    console.log(`balance before ${await uniContract.balanceOf(usdtHolder)}`);
    
    await network.provider.send('hardhat_setBalance',[
            usdtHolder,
            '0x1000000000000000000000000000',
        ]);
      const usdtBal = await ethers.provider.getBalance(usdtHolder);
        console.log(usdtBal);
      
    await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [usdtHolder],
      });
    console.log(`approving ${uniRouter} to spend ${amountIn}`);
    await usdtContract.approve(uniRouter, amountIn);
    console.log(`swapping ${amountIn} USDT`);
    let usdtBalance = await usdtContract.balanceOf(usdtHolder);
    console.log("balance -> ",  usdtBalance, "\n")


    await router.swapExactTokensForTokens(amountIn,0,[usdt,wrappedEth,uni],usdtHolder,1646778404);
    console.log(`Balance now is ${await uniContract.balanceOf(usdtHolder)}`)
}
swap().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });