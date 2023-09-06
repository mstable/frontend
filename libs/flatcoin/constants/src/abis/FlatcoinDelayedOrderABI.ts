// TODO: remove unused methods
export const FlatcoinDelayedOrderABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'ZeroAddress', type: 'error' },
  { inputs: [], name: 'ZeroValue', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'depositor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'mintedAmount',
        type: 'uint256',
      },
    ],
    name: 'Deposit',
    type: 'event',
  },
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
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'enum IDelayedOrder.OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'keeperFee',
        type: 'uint256',
      },
    ],
    name: 'OrderAnnounced',
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
      {
        indexed: false,
        internalType: 'enum IDelayedOrder.OrderType',
        name: 'orderType',
        type: 'uint8',
      },
    ],
    name: 'OrderCancelled',
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
      {
        indexed: false,
        internalType: 'enum IDelayedOrder.OrderType',
        name: 'orderType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'keeperFee',
        type: 'uint256',
      },
    ],
    name: 'OrderExecuted',
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'withdrawer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'withdrawAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'burnedAmount',
        type: 'uint256',
      },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [],
    name: 'MIN_DEPOSIT',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MODULE_KEY',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'uint256', name: 'minFillPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'keeperFee', type: 'uint256' },
    ],
    name: 'announceLeverageClose',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'margin', type: 'uint256' },
      { internalType: 'uint256', name: 'additionalSize', type: 'uint256' },
      { internalType: 'uint256', name: 'maxFillPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'keeperFee', type: 'uint256' },
    ],
    name: 'announceLeverageOpen',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'depositAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'minAmountOut', type: 'uint256' },
      { internalType: 'uint256', name: 'keeperFee', type: 'uint256' },
    ],
    name: 'announceStableDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'withdrawAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'minAmountOut', type: 'uint256' },
      { internalType: 'uint256', name: 'keeperFee', type: 'uint256' },
    ],
    name: 'announceStableWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'cancelExistingOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'bytes[]', name: 'priceUpdateData', type: 'bytes[]' },
    ],
    name: 'executeLeverageClose',
    outputs: [
      { internalType: 'int256', name: 'settledMargin', type: 'int256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'bytes[]', name: 'priceUpdateData', type: 'bytes[]' },
    ],
    name: 'executeLeverageOpen',
    outputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'bytes[]', name: 'priceUpdateData', type: 'bytes[]' },
    ],
    name: 'executeOrder',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'bytes[]', name: 'priceUpdateData', type: 'bytes[]' },
    ],
    name: 'executeStableDeposit',
    outputs: [
      { internalType: 'uint256', name: 'liquidityMinted', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'bytes[]', name: 'priceUpdateData', type: 'bytes[]' },
    ],
    name: 'executeStableWithdraw',
    outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'getAnnouncedOrder',
    outputs: [
      {
        components: [
          {
            internalType: 'enum IDelayedOrder.OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          { internalType: 'uint256', name: 'keeperFee', type: 'uint256' },
          { internalType: 'uint64', name: 'executableAtTime', type: 'uint64' },
          { internalType: 'bytes', name: 'orderData', type: 'bytes' },
        ],
        internalType: 'struct FlatcoinStructs.Order',
        name: 'order',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getKeeperFee',
    outputs: [{ internalType: 'uint256', name: 'keeperFee', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'hasOrderExpired',
    outputs: [{ internalType: 'bool', name: 'expired', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IFlatcoinVault',
        name: '_vault',
        type: 'address',
      },
      { internalType: 'uint32', name: '_minExecutabilityAge', type: 'uint32' },
      { internalType: 'uint32', name: '_maxExecutabilityAge', type: 'uint32' },
      {
        internalType: 'contract IKeeperFee',
        name: '_keeperFeeContract',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'keeperFeeContract',
    outputs: [
      { internalType: 'contract IKeeperFee', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'int256', name: 'netSize', type: 'int256' }],
    name: 'leverageModifyFillPrice',
    outputs: [{ internalType: 'uint256', name: 'fillPrice', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxExecutabilityAge',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minExecutabilityAge',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'bytes', name: '', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ internalType: 'bytes4', name: '', type: 'bytes4' }],
    stateMutability: 'pure',
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
    name: 'paused',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
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
      {
        internalType: 'contract IKeeperFee',
        name: '_keeperFeeContract',
        type: 'address',
      },
    ],
    name: 'setKeeperFeeContract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint32', name: '_maxExecutabilityAge', type: 'uint32' },
    ],
    name: 'setMaxExecutabilityAge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint32', name: '_minExecutabilityAge', type: 'uint32' },
    ],
    name: 'setMinExecutabilityAge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IFlatcoinVault',
        name: '_vault',
        type: 'address',
      },
    ],
    name: 'setVault',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'depositAmount', type: 'uint256' },
    ],
    name: 'stableDepositQuote',
    outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'withdrawAmount', type: 'uint256' },
    ],
    name: 'stableWithdrawQuote',
    outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
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
  {
    inputs: [],
    name: 'vault',
    outputs: [
      { internalType: 'contract IFlatcoinVault', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
