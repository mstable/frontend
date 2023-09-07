export const FlatcoinOracleModuleABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'sellAmount',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'offchain',
        type: 'bool',
      },
    ],
    name: 'getSellPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
