export const FlatcoinViewerABI = [
  {
    inputs: [
      {
        internalType: 'contract IFlatcoinVault',
        name: '_vault',
        type: 'address',
      },
      {
        internalType: 'contract ILeverageModule',
        name: '_leverageModule',
        type: 'address',
      },
      {
        internalType: 'contract IStableModule',
        name: '_stableModule',
        type: 'address',
      },
      {
        internalType: 'contract IOracleModule',
        name: '_oracleModule',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getAccountLeveragePositionData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'entryPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marginDeposited',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'additionalSize',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'entryCumulativeFunding',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'profitLoss',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'accruedFunding',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'marginAfterSettlement',
            type: 'int256',
          },
        ],
        internalType: 'struct Viewer.LeveragePositionData[]',
        name: 'positionData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFlatcoinTVL',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tvl',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
