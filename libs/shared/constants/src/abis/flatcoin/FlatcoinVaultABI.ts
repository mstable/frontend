// TODO: remove unused methods
export const FlatcoinVaultABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'ZeroAddress', type: 'error' },
  { inputs: [], name: 'ZeroValue', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' },
    ],
    name: 'Initialized',
    type: 'event',
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
    inputs: [
      { internalType: 'bytes32', name: 'modKey', type: 'bytes32' },
      { internalType: 'address', name: 'modAddress', type: 'address' },
    ],
    name: 'addAuthorizedModule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes32[]', name: 'modKeys', type: 'bytes32[]' },
      { internalType: 'address[]', name: 'modAddresses', type: 'address[]' },
    ],
    name: 'addAuthorizedModules',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'collateral',
    outputs: [
      { internalType: 'contract IERC20Upgradeable', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cumulativeFundingRate',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'deleteGlobalPositions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentFundingRate',
    outputs: [
      { internalType: 'int256', name: 'currentFundingRate', type: 'int256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getGlobalPositions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'marginDepositedTotal',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'averageEntryPrice',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'sizeOpenedTotal', type: 'uint256' },
        ],
        internalType: 'struct FlatcoinStructs.GlobalPositions',
        name: 'globalPositions',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getVaultSummary',
    outputs: [
      {
        components: [
          { internalType: 'int256', name: 'marketSkew', type: 'int256' },
          {
            internalType: 'int256',
            name: 'cumulativeFundingRate',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'lastRecomputedFundingRate',
            type: 'int256',
          },
          {
            internalType: 'uint64',
            name: 'lastRecomputedFundingTimestamp',
            type: 'uint64',
          },
          {
            internalType: 'uint256',
            name: 'stableCollateralTotal',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'marginDepositedTotal',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'averageEntryPrice',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'sizeOpenedTotal',
                type: 'uint256',
              },
            ],
            internalType: 'struct FlatcoinStructs.GlobalPositions',
            name: 'globalPositions',
            type: 'tuple',
          },
        ],
        internalType: 'struct FlatcoinStructs.VaultSummary',
        name: 'vaultSummary',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20Upgradeable',
        name: '_collateral',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'isAuthorizedModule',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lastRecomputedFundingRate',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lastRecomputedFundingTimestamp',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'marketSkew',
    outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxFundingVelocity',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'moduleKey', type: 'bytes32' }],
    name: 'moduleAddress',
    outputs: [
      { internalType: 'address', name: 'moduleAddress', type: 'address' },
    ],
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
    inputs: [{ internalType: 'bytes32', name: 'modKey', type: 'bytes32' }],
    name: 'removeAuthorizedModule',
    outputs: [],
    stateMutability: 'nonpayable',
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
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'sendCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20Upgradeable',
        name: '_collateral',
        type: 'address',
      },
    ],
    name: 'setCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: '_newFundingRecomputedTimestamp',
        type: 'uint64',
      },
    ],
    name: 'setFundingRecomputedTimestamp',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'marginDepositedTotal',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'averageEntryPrice',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'sizeOpenedTotal', type: 'uint256' },
        ],
        internalType: 'struct FlatcoinStructs.GlobalPositions',
        name: '_newGlobalPositions',
        type: 'tuple',
      },
    ],
    name: 'setGlobalPositions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'int256', name: '_newMarketSkew', type: 'int256' },
    ],
    name: 'setMarketSkew',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newMaxFundingVelocity',
        type: 'uint256',
      },
    ],
    name: 'setMaxFundingVelocity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'int256',
        name: '_newRecomputedFundingRate',
        type: 'int256',
      },
    ],
    name: 'setRecomputedFundingRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'int256',
        name: '_newStableCollateralTotal',
        type: 'int256',
      },
    ],
    name: 'setStableCollateralTotal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'settleFundingFees',
    outputs: [{ internalType: 'int256', name: 'fundingFees', type: 'int256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stableCollateralTotal',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
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
