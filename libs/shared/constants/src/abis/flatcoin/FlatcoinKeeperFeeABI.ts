// TODO: remove unused methods
export const FlatcoinKeeperFeeABI = [
  {
    inputs: [
      { internalType: 'address', name: '_owner', type: 'address' },
      { internalType: 'address', name: 'oracleModule', type: 'address' },
      { internalType: 'address', name: 'assetToPayWith', type: 'address' },
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
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
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
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
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
    name: 'setParameters',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
