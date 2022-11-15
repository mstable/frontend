import * as Types from '@frontend/mstable-data-access';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
export type UserVaultBalanceQueryVariables = Types.Exact<{
  owner: Types.Scalars['Bytes'];
  vault: Types.Scalars['String'];
}>;


export type UserVaultBalanceQuery = { __typename?: 'Query', vaultBalances: Array<{ __typename?: 'VaultBalance', owner: any, timestamp: any, shareBalance: any, assetBalance: any, assetDeposited: any, vault: { __typename?: 'Vault', id: string, asset: any } }> };

export type UserTxHistoryQueryVariables = Types.Exact<{
  owner: Types.Scalars['Bytes'];
  vault: Types.Scalars['String'];
}>;


export type UserTxHistoryQuery = { __typename?: 'Query', transactions: Array<{ __typename?: 'Transaction', timestamp: any, type: Types.TransactionType, shareAmount: any, assetAmount: any, hash: any, to: any, from: any, vault: { __typename?: 'Vault', id: string } }> };

export type MetavaultQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  days?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type MetavaultQuery = { __typename?: 'Query', vault?: { __typename?: 'Vault', totalSupply: any, totalAssets: any, apy: any, assetPerShare: any, DailyVaultStats: Array<{ __typename?: 'DailyVaultStat', apy: any, totalAssets: any, totalSupply: any, timestamp: any }> } | null };

export type MetavaultsQueryVariables = Types.Exact<{
  days?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type MetavaultsQuery = { __typename?: 'Query', vaults: Array<{ __typename?: 'Vault', address: any, totalSupply: any, totalAssets: any, apy: any, assetPerShare: any, DailyVaultStats: Array<{ __typename?: 'DailyVaultStat', apy: any, totalAssets: any, totalSupply: any, timestamp: any }> }> };


export const UserVaultBalanceDocument = `
    query userVaultBalance($owner: Bytes!, $vault: String!) {
  vaultBalances(where: {owner: $owner, vault: $vault}, first: 1) {
    owner
    vault {
      id
      asset
    }
    timestamp
    shareBalance
    assetBalance
    assetDeposited
  }
}
    `;
export const useUserVaultBalanceQuery = <
      TData = UserVaultBalanceQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: UserVaultBalanceQueryVariables,
      options?: UseQueryOptions<UserVaultBalanceQuery, TError, TData>
    ) =>
    useQuery<UserVaultBalanceQuery, TError, TData>(
      ['userVaultBalance', variables],
      fetcher<UserVaultBalanceQuery, UserVaultBalanceQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UserVaultBalanceDocument, variables),
      options
    );
export const UserTxHistoryDocument = `
    query userTxHistory($owner: Bytes!, $vault: String!) {
  transactions(
    where: {to: $owner, vault: $vault}
    orderBy: timestamp
    orderDirection: desc
  ) {
    vault {
      id
    }
    timestamp
    type
    shareAmount
    assetAmount
    hash
    to
    from
  }
}
    `;
export const useUserTxHistoryQuery = <
      TData = UserTxHistoryQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: UserTxHistoryQueryVariables,
      options?: UseQueryOptions<UserTxHistoryQuery, TError, TData>
    ) =>
    useQuery<UserTxHistoryQuery, TError, TData>(
      ['userTxHistory', variables],
      fetcher<UserTxHistoryQuery, UserTxHistoryQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UserTxHistoryDocument, variables),
      options
    );
export const MetavaultDocument = `
    query metavault($id: ID!, $days: Int = 7) {
  vault(id: $id) {
    totalSupply
    totalAssets
    apy
    assetPerShare
    DailyVaultStats(first: $days, orderBy: timestamp, orderDirection: desc) {
      apy
      totalAssets
      totalSupply
      timestamp
    }
  }
}
    `;
export const useMetavaultQuery = <
      TData = MetavaultQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: MetavaultQueryVariables,
      options?: UseQueryOptions<MetavaultQuery, TError, TData>
    ) =>
    useQuery<MetavaultQuery, TError, TData>(
      ['metavault', variables],
      fetcher<MetavaultQuery, MetavaultQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MetavaultDocument, variables),
      options
    );
export const MetavaultsDocument = `
    query metavaults($days: Int = 7) {
  vaults {
    address
    totalSupply
    totalAssets
    apy
    assetPerShare
    DailyVaultStats(first: $days, orderBy: timestamp, orderDirection: desc) {
      apy
      totalAssets
      totalSupply
      timestamp
    }
  }
}
    `;
export const useMetavaultsQuery = <
      TData = MetavaultsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: MetavaultsQueryVariables,
      options?: UseQueryOptions<MetavaultsQuery, TError, TData>
    ) =>
    useQuery<MetavaultsQuery, TError, TData>(
      variables === undefined ? ['metavaults'] : ['metavaults', variables],
      fetcher<MetavaultsQuery, MetavaultsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MetavaultsDocument, variables),
      options
    );