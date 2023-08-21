export const FlatcoinKeeperFeeABI = [
  {
    inputs: [],
    name: 'GAS_PRICE_ORACLE_ADDRESS',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getConfig',
    outputs: [
      { internalType: 'uint256', name: 'profitMarginUSD', type: 'uint256' },
      { internalType: 'uint256', name: 'profitMarginPercent', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'minKeeperFeeUpperBound',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minKeeperFeeLowerBound',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'gasUnitsL1', type: 'uint256' },
      { internalType: 'uint256', name: 'gasUnitsL2', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getKeeperFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];
