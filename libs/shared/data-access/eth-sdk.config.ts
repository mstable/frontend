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
      ERC20: {
        WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        FXS: '0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0',
        stkMTA: '0x8f2326316ec696f6d023e37a9931c2b2c177a3d7',
        stkBPT: '0xefbe22085d9f29863cfb77eed16d3cc0d927b011',
      },
      MerkleDropMBPTBAL: '0x783cc67242fd639a7621ea1a1c511e4c64d7c66d',
    },
    ropsten: {
      MTA: '0x273bc479e5c21caa15aa8538decbf310981d14c0',
      vMTA: '0x77f9bf80e0947408f64faa07fd150920e6b52015',
      UniswapRouter02_Like: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      ERC20: {
        WETH: '0xc778417e063141139fce010982780140aa0cd5ab',
      },
    },
    // goerli: {
    //   MTA: '0x273bc479e5c21caa15aa8538decbf310981d14c0',
    //   vMTA: '0x77f9bf80e0947408f64faa07fd150920e6b52015',
    //   FeederWrapper: '0x17fd342630518E5AA2E96fbd2B8d895D7B3519e5',
    //   SaveWrapper: '0x5047Ee646E3425264416bf7d2a651985E513Ff32',
    //   UniswapRouter02_Like: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    //   ERC20: {
    //     WETH: '0xc778417e063141139fce010982780140aa0cd5ab',
    //   },
    // },
    // kovan: {
    //   MTA: '0xe9553b420eab4ebe7237ac3f97035ef090f15e1d',
    //   vMTA: '0x77f9bf80e0947408f64faa07fd150920e6b52015',
    //   stkMTA: '0x9157233faFC65B5193c016B04fA847DB49677c3b',
    //   FeederWrapper: DEAD_ADDRESS,
    //   UniswapRouter02_Like: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    //   ERC20: {
    //     WETH: '0xE131AbCD2114bf457B1fBc5cE01593E06c435A63',
    //   },
    //   MerkleDropMBPTBAL: '0x4912c0fa9ed21f8f5420bdfaa097220120610082',
    // },
    polygon: {
      MTA: '0xf501dd45a1198c2e1b5aef5314a68b9006d842e0',
      // vMTA: '0x77f9bf80e0947408f64faa07fd150920e6b52015', // Mainnet
      // FeederWrapper: '0x17fd342630518E5AA2E96fbd2B8d895D7B3519e5', // Mainnet
      SaveWrapper: '0x299081f52738A4204C3D58264ff44f6F333C6c88',
      UniswapRouter02_Like: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff', // QuickSwap
      ERC20: {
        wMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
        FXS: '0x3e121107F6F22DA4911079845a470757aF4e1A1b',
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
    // polygonMumbai: {
    //   MTA: '0x273bc479e5c21caa15aa8538decbf310981d14c0', // Mainnet
    //   vMTA: '0x77f9bf80e0947408f64faa07fd150920e6b52015', // Mainnet
    //   FeederWrapper: '0x17fd342630518E5AA2E96fbd2B8d895D7B3519e5', // Mainnet
    //   SaveWrapper: '0xeB2A92Cc1A9dC337173B10cAbBe91ecBc805C98B',
    //   UniswapRouter02_Like: '0xFCB5348111665Cf95a777f0c4FCA768E05601760', // QuickSwap
    //   ERC20: {
    //     wMATIC: '0x5B67676a984807a212b1c59eBFc9B3568a474F0a',
    //   },
    // },
  },
  rpc: {
    mainnet: 'https://mainnet.infura.io/v3/a6daf77ef0ae4b60af39259e435a40fe',
    ropsten: 'https://ropsten.infura.io/v3/62bdcedba8ba449d9a795ef6310e713c',
    polygon: 'https://rpc-mainnet.matic.quiknode.pro',
  },
});
