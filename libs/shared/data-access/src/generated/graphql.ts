export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type DailyVaultBalance = {
  __typename?: 'DailyVaultBalance';
  assetBalance: Scalars['BigInt'];
  assetDeposited: Scalars['BigInt'];
  id: Scalars['ID'];
  shareBalance: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  vaultBalance: VaultBalance;
};

export type DailyVaultBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  assetBalance?: InputMaybe<Scalars['BigInt']>;
  assetBalance_gt?: InputMaybe<Scalars['BigInt']>;
  assetBalance_gte?: InputMaybe<Scalars['BigInt']>;
  assetBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalance_lt?: InputMaybe<Scalars['BigInt']>;
  assetBalance_lte?: InputMaybe<Scalars['BigInt']>;
  assetBalance_not?: InputMaybe<Scalars['BigInt']>;
  assetBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetDeposited?: InputMaybe<Scalars['BigInt']>;
  assetDeposited_gt?: InputMaybe<Scalars['BigInt']>;
  assetDeposited_gte?: InputMaybe<Scalars['BigInt']>;
  assetDeposited_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetDeposited_lt?: InputMaybe<Scalars['BigInt']>;
  assetDeposited_lte?: InputMaybe<Scalars['BigInt']>;
  assetDeposited_not?: InputMaybe<Scalars['BigInt']>;
  assetDeposited_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  shareBalance?: InputMaybe<Scalars['BigInt']>;
  shareBalance_gt?: InputMaybe<Scalars['BigInt']>;
  shareBalance_gte?: InputMaybe<Scalars['BigInt']>;
  shareBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  shareBalance_lt?: InputMaybe<Scalars['BigInt']>;
  shareBalance_lte?: InputMaybe<Scalars['BigInt']>;
  shareBalance_not?: InputMaybe<Scalars['BigInt']>;
  shareBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  vaultBalance?: InputMaybe<Scalars['String']>;
  vaultBalance_?: InputMaybe<VaultBalance_Filter>;
  vaultBalance_contains?: InputMaybe<Scalars['String']>;
  vaultBalance_contains_nocase?: InputMaybe<Scalars['String']>;
  vaultBalance_ends_with?: InputMaybe<Scalars['String']>;
  vaultBalance_ends_with_nocase?: InputMaybe<Scalars['String']>;
  vaultBalance_gt?: InputMaybe<Scalars['String']>;
  vaultBalance_gte?: InputMaybe<Scalars['String']>;
  vaultBalance_in?: InputMaybe<Array<Scalars['String']>>;
  vaultBalance_lt?: InputMaybe<Scalars['String']>;
  vaultBalance_lte?: InputMaybe<Scalars['String']>;
  vaultBalance_not?: InputMaybe<Scalars['String']>;
  vaultBalance_not_contains?: InputMaybe<Scalars['String']>;
  vaultBalance_not_contains_nocase?: InputMaybe<Scalars['String']>;
  vaultBalance_not_ends_with?: InputMaybe<Scalars['String']>;
  vaultBalance_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  vaultBalance_not_in?: InputMaybe<Array<Scalars['String']>>;
  vaultBalance_not_starts_with?: InputMaybe<Scalars['String']>;
  vaultBalance_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  vaultBalance_starts_with?: InputMaybe<Scalars['String']>;
  vaultBalance_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum DailyVaultBalance_OrderBy {
  AssetBalance = 'assetBalance',
  AssetDeposited = 'assetDeposited',
  Id = 'id',
  ShareBalance = 'shareBalance',
  Timestamp = 'timestamp',
  VaultBalance = 'vaultBalance'
}

export type DailyVaultStat = {
  __typename?: 'DailyVaultStat';
  apy: Scalars['BigDecimal'];
  assetPerShare: Scalars['BigDecimal'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  totalAssets: Scalars['BigInt'];
  totalSupply: Scalars['BigInt'];
  vault: Vault;
};

export type DailyVaultStat_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  apy?: InputMaybe<Scalars['BigDecimal']>;
  apy_gt?: InputMaybe<Scalars['BigDecimal']>;
  apy_gte?: InputMaybe<Scalars['BigDecimal']>;
  apy_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  apy_lt?: InputMaybe<Scalars['BigDecimal']>;
  apy_lte?: InputMaybe<Scalars['BigDecimal']>;
  apy_not?: InputMaybe<Scalars['BigDecimal']>;
  apy_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  assetPerShare?: InputMaybe<Scalars['BigDecimal']>;
  assetPerShare_gt?: InputMaybe<Scalars['BigDecimal']>;
  assetPerShare_gte?: InputMaybe<Scalars['BigDecimal']>;
  assetPerShare_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  assetPerShare_lt?: InputMaybe<Scalars['BigDecimal']>;
  assetPerShare_lte?: InputMaybe<Scalars['BigDecimal']>;
  assetPerShare_not?: InputMaybe<Scalars['BigDecimal']>;
  assetPerShare_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAssets?: InputMaybe<Scalars['BigInt']>;
  totalAssets_gt?: InputMaybe<Scalars['BigInt']>;
  totalAssets_gte?: InputMaybe<Scalars['BigInt']>;
  totalAssets_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAssets_lt?: InputMaybe<Scalars['BigInt']>;
  totalAssets_lte?: InputMaybe<Scalars['BigInt']>;
  totalAssets_not?: InputMaybe<Scalars['BigInt']>;
  totalAssets_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  vault?: InputMaybe<Scalars['String']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']>;
  vault_ends_with?: InputMaybe<Scalars['String']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']>;
  vault_gt?: InputMaybe<Scalars['String']>;
  vault_gte?: InputMaybe<Scalars['String']>;
  vault_in?: InputMaybe<Array<Scalars['String']>>;
  vault_lt?: InputMaybe<Scalars['String']>;
  vault_lte?: InputMaybe<Scalars['String']>;
  vault_not?: InputMaybe<Scalars['String']>;
  vault_not_contains?: InputMaybe<Scalars['String']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  vault_starts_with?: InputMaybe<Scalars['String']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum DailyVaultStat_OrderBy {
  Apy = 'apy',
  AssetPerShare = 'assetPerShare',
  Id = 'id',
  Timestamp = 'timestamp',
  TotalAssets = 'totalAssets',
  TotalSupply = 'totalSupply',
  Vault = 'vault'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  dailyVaultBalance?: Maybe<DailyVaultBalance>;
  dailyVaultBalances: Array<DailyVaultBalance>;
  dailyVaultStat?: Maybe<DailyVaultStat>;
  dailyVaultStats: Array<DailyVaultStat>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  vault?: Maybe<Vault>;
  vaultBalance?: Maybe<VaultBalance>;
  vaultBalances: Array<VaultBalance>;
  vaults: Array<Vault>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryDailyVaultBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDailyVaultBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyVaultBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyVaultBalance_Filter>;
};


export type QueryDailyVaultStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDailyVaultStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyVaultStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyVaultStat_Filter>;
};


export type QueryTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};


export type QueryVaultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VaultBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultBalance_Filter>;
};


export type QueryVaultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vault_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  dailyVaultBalance?: Maybe<DailyVaultBalance>;
  dailyVaultBalances: Array<DailyVaultBalance>;
  dailyVaultStat?: Maybe<DailyVaultStat>;
  dailyVaultStats: Array<DailyVaultStat>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  vault?: Maybe<Vault>;
  vaultBalance?: Maybe<VaultBalance>;
  vaultBalances: Array<VaultBalance>;
  vaults: Array<Vault>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionDailyVaultBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDailyVaultBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyVaultBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyVaultBalance_Filter>;
};


export type SubscriptionDailyVaultStatArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDailyVaultStatsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyVaultStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyVaultStat_Filter>;
};


export type SubscriptionTransactionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransactionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transaction_Filter>;
};


export type SubscriptionVaultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VaultBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultBalance_Filter>;
};


export type SubscriptionVaultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vault_Filter>;
};

export type Transaction = {
  __typename?: 'Transaction';
  assetAmount: Scalars['BigInt'];
  from: Scalars['Bytes'];
  gasLimit: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  hash: Scalars['Bytes'];
  id: Scalars['ID'];
  shareAmount: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  to: Scalars['Bytes'];
  type: TransactionType;
  vault: Vault;
};

export enum TransactionType {
  Deposit = 'DEPOSIT',
  Withdraw = 'WITHDRAW'
}

export type Transaction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  assetAmount?: InputMaybe<Scalars['BigInt']>;
  assetAmount_gt?: InputMaybe<Scalars['BigInt']>;
  assetAmount_gte?: InputMaybe<Scalars['BigInt']>;
  assetAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetAmount_lt?: InputMaybe<Scalars['BigInt']>;
  assetAmount_lte?: InputMaybe<Scalars['BigInt']>;
  assetAmount_not?: InputMaybe<Scalars['BigInt']>;
  assetAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  gasLimit?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_gte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasLimit_lt?: InputMaybe<Scalars['BigInt']>;
  gasLimit_lte?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not?: InputMaybe<Scalars['BigInt']>;
  gasLimit_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  hash?: InputMaybe<Scalars['Bytes']>;
  hash_contains?: InputMaybe<Scalars['Bytes']>;
  hash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  hash_not?: InputMaybe<Scalars['Bytes']>;
  hash_not_contains?: InputMaybe<Scalars['Bytes']>;
  hash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  shareAmount?: InputMaybe<Scalars['BigInt']>;
  shareAmount_gt?: InputMaybe<Scalars['BigInt']>;
  shareAmount_gte?: InputMaybe<Scalars['BigInt']>;
  shareAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  shareAmount_lt?: InputMaybe<Scalars['BigInt']>;
  shareAmount_lte?: InputMaybe<Scalars['BigInt']>;
  shareAmount_not?: InputMaybe<Scalars['BigInt']>;
  shareAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  type?: InputMaybe<TransactionType>;
  type_in?: InputMaybe<Array<TransactionType>>;
  type_not?: InputMaybe<TransactionType>;
  type_not_in?: InputMaybe<Array<TransactionType>>;
  vault?: InputMaybe<Scalars['String']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']>;
  vault_ends_with?: InputMaybe<Scalars['String']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']>;
  vault_gt?: InputMaybe<Scalars['String']>;
  vault_gte?: InputMaybe<Scalars['String']>;
  vault_in?: InputMaybe<Array<Scalars['String']>>;
  vault_lt?: InputMaybe<Scalars['String']>;
  vault_lte?: InputMaybe<Scalars['String']>;
  vault_not?: InputMaybe<Scalars['String']>;
  vault_not_contains?: InputMaybe<Scalars['String']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  vault_starts_with?: InputMaybe<Scalars['String']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Transaction_OrderBy {
  AssetAmount = 'assetAmount',
  From = 'from',
  GasLimit = 'gasLimit',
  GasPrice = 'gasPrice',
  Hash = 'hash',
  Id = 'id',
  ShareAmount = 'shareAmount',
  Timestamp = 'timestamp',
  To = 'to',
  Type = 'type',
  Vault = 'vault'
}

export type Vault = {
  __typename?: 'Vault';
  DailyVaultStats: Array<DailyVaultStat>;
  address: Scalars['Bytes'];
  apy: Scalars['BigDecimal'];
  asset: Scalars['Bytes'];
  assetPerShare: Scalars['BigDecimal'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  totalAssets: Scalars['BigInt'];
  totalSupply: Scalars['BigInt'];
};


export type VaultDailyVaultStatsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyVaultStat_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DailyVaultStat_Filter>;
};

export type VaultBalance = {
  __typename?: 'VaultBalance';
  assetBalance: Scalars['BigInt'];
  assetDeposited: Scalars['BigInt'];
  dailyVaultBalances: Array<DailyVaultBalance>;
  id: Scalars['ID'];
  owner: Scalars['Bytes'];
  shareBalance: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  vault: Vault;
};


export type VaultBalanceDailyVaultBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyVaultBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DailyVaultBalance_Filter>;
};

export type VaultBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  assetBalance?: InputMaybe<Scalars['BigInt']>;
  assetBalance_gt?: InputMaybe<Scalars['BigInt']>;
  assetBalance_gte?: InputMaybe<Scalars['BigInt']>;
  assetBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetBalance_lt?: InputMaybe<Scalars['BigInt']>;
  assetBalance_lte?: InputMaybe<Scalars['BigInt']>;
  assetBalance_not?: InputMaybe<Scalars['BigInt']>;
  assetBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetDeposited?: InputMaybe<Scalars['BigInt']>;
  assetDeposited_gt?: InputMaybe<Scalars['BigInt']>;
  assetDeposited_gte?: InputMaybe<Scalars['BigInt']>;
  assetDeposited_in?: InputMaybe<Array<Scalars['BigInt']>>;
  assetDeposited_lt?: InputMaybe<Scalars['BigInt']>;
  assetDeposited_lte?: InputMaybe<Scalars['BigInt']>;
  assetDeposited_not?: InputMaybe<Scalars['BigInt']>;
  assetDeposited_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  dailyVaultBalances_?: InputMaybe<DailyVaultBalance_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  shareBalance?: InputMaybe<Scalars['BigInt']>;
  shareBalance_gt?: InputMaybe<Scalars['BigInt']>;
  shareBalance_gte?: InputMaybe<Scalars['BigInt']>;
  shareBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  shareBalance_lt?: InputMaybe<Scalars['BigInt']>;
  shareBalance_lte?: InputMaybe<Scalars['BigInt']>;
  shareBalance_not?: InputMaybe<Scalars['BigInt']>;
  shareBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  vault?: InputMaybe<Scalars['String']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']>;
  vault_ends_with?: InputMaybe<Scalars['String']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']>;
  vault_gt?: InputMaybe<Scalars['String']>;
  vault_gte?: InputMaybe<Scalars['String']>;
  vault_in?: InputMaybe<Array<Scalars['String']>>;
  vault_lt?: InputMaybe<Scalars['String']>;
  vault_lte?: InputMaybe<Scalars['String']>;
  vault_not?: InputMaybe<Scalars['String']>;
  vault_not_contains?: InputMaybe<Scalars['String']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  vault_starts_with?: InputMaybe<Scalars['String']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum VaultBalance_OrderBy {
  AssetBalance = 'assetBalance',
  AssetDeposited = 'assetDeposited',
  DailyVaultBalances = 'dailyVaultBalances',
  Id = 'id',
  Owner = 'owner',
  ShareBalance = 'shareBalance',
  Timestamp = 'timestamp',
  Vault = 'vault'
}

export type Vault_Filter = {
  DailyVaultStats_?: InputMaybe<DailyVaultStat_Filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  apy?: InputMaybe<Scalars['BigDecimal']>;
  apy_gt?: InputMaybe<Scalars['BigDecimal']>;
  apy_gte?: InputMaybe<Scalars['BigDecimal']>;
  apy_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  apy_lt?: InputMaybe<Scalars['BigDecimal']>;
  apy_lte?: InputMaybe<Scalars['BigDecimal']>;
  apy_not?: InputMaybe<Scalars['BigDecimal']>;
  apy_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  asset?: InputMaybe<Scalars['Bytes']>;
  assetPerShare?: InputMaybe<Scalars['BigDecimal']>;
  assetPerShare_gt?: InputMaybe<Scalars['BigDecimal']>;
  assetPerShare_gte?: InputMaybe<Scalars['BigDecimal']>;
  assetPerShare_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  assetPerShare_lt?: InputMaybe<Scalars['BigDecimal']>;
  assetPerShare_lte?: InputMaybe<Scalars['BigDecimal']>;
  assetPerShare_not?: InputMaybe<Scalars['BigDecimal']>;
  assetPerShare_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  asset_contains?: InputMaybe<Scalars['Bytes']>;
  asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
  asset_not?: InputMaybe<Scalars['Bytes']>;
  asset_not_contains?: InputMaybe<Scalars['Bytes']>;
  asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAssets?: InputMaybe<Scalars['BigInt']>;
  totalAssets_gt?: InputMaybe<Scalars['BigInt']>;
  totalAssets_gte?: InputMaybe<Scalars['BigInt']>;
  totalAssets_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalAssets_lt?: InputMaybe<Scalars['BigInt']>;
  totalAssets_lte?: InputMaybe<Scalars['BigInt']>;
  totalAssets_not?: InputMaybe<Scalars['BigInt']>;
  totalAssets_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Vault_OrderBy {
  DailyVaultStats = 'DailyVaultStats',
  Address = 'address',
  Apy = 'apy',
  Asset = 'asset',
  AssetPerShare = 'assetPerShare',
  Id = 'id',
  Timestamp = 'timestamp',
  TotalAssets = 'totalAssets',
  TotalSupply = 'totalSupply'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}
