export const L2ComptrollerV2ABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    inputs: [
      { internalType: 'address', name: 'depositor', type: 'address' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'address', name: 'tokenBurned', type: 'address' },
      { internalType: 'uint256', name: 'prevBurntAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'givenBurntAmount', type: 'uint256' },
    ],
    name: 'DecreasingBurntAmount',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'address', name: 'depositor', type: 'address' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'address', name: 'tokenBurned', type: 'address' },
      {
        internalType: 'uint256',
        name: 'maxClaimableAmount',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'claimAmount', type: 'uint256' },
    ],
    name: 'ExceedingClaimableAmount',
    type: 'error',
  },
  { inputs: [], name: 'ExternalCallerNotAllowed', type: 'error' },
  { inputs: [], name: 'InvalidValues', type: 'error' },
  { inputs: [], name: 'OnlyCrossChainAllowed', type: 'error' },
  {
    inputs: [
      {
        internalType: 'contract IPoolLogic',
        name: 'buyToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'minAcceptablePrice',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'actualPrice', type: 'uint256' },
    ],
    name: 'PriceDropExceedsLimit',
    type: 'error',
  },
  { inputs: [], name: 'ZeroAddress', type: 'error' },
  {
    inputs: [
      {
        internalType: 'contract IPoolLogic',
        name: 'tokenToBuy',
        type: 'address',
      },
    ],
    name: 'ZeroTokenPrice',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'depositor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'errorCode',
        type: 'uint256',
      },
    ],
    name: 'AssertionErrorDuringRedemption',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract IPoolLogic',
        name: 'buyToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'updatedBuyTokenPrice',
        type: 'uint256',
      },
    ],
    name: 'BuyTokenPriceUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'EmergencyWithdrawal',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newL1Comptroller',
        type: 'address',
      },
    ],
    name: 'L1ComptrollerSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'depositor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'reason',
        type: 'bytes',
      },
    ],
    name: 'LowLevelErrorDuringRedemption',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract IPoolLogic',
        name: 'buyToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newMaxTokenPriceDrop',
        type: 'uint256',
      },
    ],
    name: 'ModifiedMaxTokenPriceDrop',
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'depositor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'reason',
        type: 'string',
      },
    ],
    name: 'RequireErrorDuringRedemption',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'depositor',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'tokenBurned',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'contract IPoolLogic',
        name: 'tokenBought',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'burnTokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'buyTokenAmount',
        type: 'uint256',
      },
    ],
    name: 'TokensClaimed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DENOMINATOR',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenBurned', type: 'address' },
      {
        internalType: 'contract IPoolLogic',
        name: 'tokenToBuy',
        type: 'address',
      },
      { internalType: 'uint256', name: 'burnTokenAmount', type: 'uint256' },
      { internalType: 'address', name: 'receiver', type: 'address' },
    ],
    name: '_redeem',
    outputs: [
      { internalType: 'uint256', name: 'buyTokenAmount', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'contract IPoolLogic',
            name: 'tokenToBuy',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'maxTokenPriceDrop',
            type: 'uint256',
          },
        ],
        internalType: 'struct L2ComptrollerV2Base.BuyTokenSettings',
        name: 'buyTokenSetting',
        type: 'tuple',
      },
    ],
    name: 'addBuyToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'contract IPoolLogic',
            name: 'tokenToBuy',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'maxTokenPriceDrop',
            type: 'uint256',
          },
        ],
        internalType: 'struct L2ComptrollerV2Base.BuyTokenSettings[]',
        name: 'buyTokenSettings',
        type: 'tuple[]',
      },
    ],
    name: 'addBuyTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'depositor', type: 'address' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'address', name: 'tokenToBurn', type: 'address' },
    ],
    name: 'burnAndClaimDetails',
    outputs: [
      { internalType: 'uint256', name: 'totalAmountBurned', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'totalAmountClaimed',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IPoolLogic',
        name: 'tokenToBuy',
        type: 'address',
      },
    ],
    name: 'buyTokenDetails',
    outputs: [
      {
        internalType: 'uint256',
        name: 'lastTokenToBuyPrice',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'maxTokenPriceDrop', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenBurned', type: 'address' },
      {
        internalType: 'contract IPoolLogic',
        name: 'tokenToBuy',
        type: 'address',
      },
      { internalType: 'uint256', name: 'burnTokenAmount', type: 'uint256' },
      { internalType: 'address', name: 'l1Depositor', type: 'address' },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenBurned', type: 'address' },
      {
        internalType: 'contract IPoolLogic',
        name: 'tokenToBuy',
        type: 'address',
      },
      { internalType: 'address', name: 'l1Depositor', type: 'address' },
    ],
    name: 'claimAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenToBurn', type: 'address' },
      {
        internalType: 'contract IPoolLogic',
        name: 'tokenToBuy',
        type: 'address',
      },
      { internalType: 'uint256', name: 'buyTokenAmount', type: 'uint256' },
    ],
    name: 'convertToTokenToBurn',
    outputs: [
      { internalType: 'uint256', name: 'burnTokenAmount', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenToBurn', type: 'address' },
      {
        internalType: 'contract IPoolLogic',
        name: 'tokenToBuy',
        type: 'address',
      },
      { internalType: 'uint256', name: 'burnTokenAmount', type: 'uint256' },
    ],
    name: 'convertToTokenToBuy',
    outputs: [
      { internalType: 'uint256', name: 'buyTokenAmount', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'tokenToBurn', type: 'address' }],
    name: 'exchangePrices',
    outputs: [
      { internalType: 'uint256', name: 'exchangePrice', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenBurned', type: 'address' },
      {
        internalType: 'contract IPoolLogic',
        name: 'tokenToBuy',
        type: 'address',
      },
      { internalType: 'address', name: 'depositor', type: 'address' },
      { internalType: 'address', name: 'receiver', type: 'address' },
    ],
    name: 'getClaimableAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenToBuyClaimable',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'l1Comptroller',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenToBurn', type: 'address' },
      {
        internalType: 'contract IPoolLogic',
        name: 'tokenToBuy',
        type: 'address',
      },
    ],
    name: 'maxBurnAmountClaimable',
    outputs: [
      {
        internalType: 'uint256',
        name: 'maxBurnTokenAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IPoolLogic',
        name: 'tokenToBuy',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'newMaxTokenPriceDrop',
        type: 'uint256',
      },
    ],
    name: 'modifyThreshold',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenBurned', type: 'address' },
      { internalType: 'address', name: 'tokenToBuy', type: 'address' },
      {
        internalType: 'uint256',
        name: 'totalAmountBurntOnL1',
        type: 'uint256',
      },
      { internalType: 'address', name: 'l1Depositor', type: 'address' },
      { internalType: 'address', name: 'receiver', type: 'address' },
    ],
    name: 'redeemFromL1',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IPoolLogic',
        name: 'tokenToBuy',
        type: 'address',
      },
    ],
    name: 'removeBuyToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IPoolLogic[]',
        name: 'tokensToBuy',
        type: 'address[]',
      },
    ],
    name: 'removeBuyTokens',
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
      {
        components: [
          { internalType: 'address', name: 'tokenToBurn', type: 'address' },
          { internalType: 'uint256', name: 'exchangePrice', type: 'uint256' },
        ],
        internalType: 'struct L2ComptrollerV2Base.BurnTokenSettings',
        name: 'burnTokenSetting',
        type: 'tuple',
      },
    ],
    name: 'setExchangePrices',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'tokenToBurn', type: 'address' },
          { internalType: 'uint256', name: 'exchangePrice', type: 'uint256' },
        ],
        internalType: 'struct L2ComptrollerV2Base.BurnTokenSettings[]',
        name: 'burnTokenSettings',
        type: 'tuple[]',
      },
    ],
    name: 'setExchangePrices',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'newL1Comptroller', type: 'address' },
    ],
    name: 'setL1Comptroller',
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
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
