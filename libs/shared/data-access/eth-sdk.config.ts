import { defineConfig } from '@dethcrypto/eth-sdk';

export default defineConfig({
  contracts: {
    mainnet: {
      MTA: '0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2',
      vMTA: '0xae8bc96da4f9a9613c323478be181fdb2aa0e1bf',
      WBTC: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      stkMTA: '0x8f2326316ec696f6d023e37a9931c2b2c177a3d7',
      stkBPT: '0xefbe22085d9f29863cfb77eed16d3cc0d927b011',
      FeederWrapper: '0x7C1fD068CE739A4687BEe9F69e5FD2275C7372d4',
      SaveWrapper: '0x0CA7A25181FC991e3cC62BaC511E62973991f325',
      UniswapRouter02_Like: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      mUSD: '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5',
      ERC20: {
        WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        FXS: '0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0',
        stkMTA: '0x8f2326316ec696f6d023e37a9931c2b2c177a3d7',
        stkBPT: '0xefbe22085d9f29863cfb77eed16d3cc0d927b011',
      },
      MerkleDropMBPTBAL: '0x783cc67242fd639a7621ea1a1c511e4c64d7c66d',
    },
    goerli: {
      ERC20: {
        USDC: '0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557',
        USDT: '0x509Ee0d083DdF8AC028f2a56731412edD63223B9',
        DAI: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844',
        TAG: '0x5A036AFae87e6AEBf4eBc01bbEfb3F009eB01772',
      },
      ERC4626: {
        TVG: '0x0145A7fB49402b29BE7C52D38aeACB5e1aCAe11b',
      },
    },
    polygon: {
      MTA: '0xf501dd45a1198c2e1b5aef5314a68b9006d842e0',
      // vMTA: '0x77f9bf80e0947408f64faa07fd150920e6b52015', // Mainnet
      // FeederWrapper: '0x17fd342630518E5AA2E96fbd2B8d895D7B3519e5', // Mainnet
      SaveWrapper: '0x299081f52738A4204C3D58264ff44f6F333C6c88',
      UniswapRouter02_Like: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff', // QuickSwap
      ERC20: {
        wMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        FXS: '0x3e121107F6F22DA4911079845a470757aF4e1A1b',
        USDC: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        USDT: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
        FRAX: '0x104592a158490a9228070e0a8e5343b499e125d0',
        DAI: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
      },
      FRAX: {
        stakingContract: '0xc425Fd9Ed3C892d849C9E1a971516da1C1B29696',
        rewardsTokens: {
          FXS: '0x3e121107f6f22da4911079845a470757af4e1a1b',
          MTA: '0xf501dd45a1198c2e1b5aef5314a68b9006d842e0',
        },
        stakingToken: '0xb30a907084ac8a0d25dddab4e364827406fd09f0',
        feederPool: '0xb30a907084ac8a0d25dddab4e364827406fd09f0',
      },
    },
  },
  rpc: {
    mainnet: 'https://mainnet.infura.io/v3/a6daf77ef0ae4b60af39259e435a40fe',
    polygon: 'https://rpc-mainnet.matic.quiknode.pro',
    goerli: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  },
});
