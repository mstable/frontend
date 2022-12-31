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
export type MetavaultQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  firstBlock: Types.Scalars['BigInt'];
  days?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type MetavaultQuery = { __typename?: 'Query', vault?: { __typename?: 'Vault', totalSupply: any, totalAssets: any, apy: any, assetPerShare: any, DailyVaultStats: Array<{ __typename?: 'DailyVaultStat', apy: any, assetPerShare: any, totalAssets: any, totalSupply: any, timestamp: any }>, first: Array<{ __typename?: 'DailyVaultStat', apy: any, assetPerShare: any, totalAssets: any, totalSupply: any, timestamp: any }> } | null };

export type MetavaultsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MetavaultsQuery = { __typename?: 'Query', vaults: Array<{ __typename?: 'Vault', address: any }> };


export const MetavaultDocument = `
    query metavault($id: ID!, $firstBlock: BigInt!, $days: Int = 7) {
  vault(id: $id) {
    totalSupply
    totalAssets
    apy
    assetPerShare
    DailyVaultStats(
      first: $days
      orderBy: timestamp
      orderDirection: desc
      where: {blockNumber_gte: $firstBlock}
    ) {
      apy
      assetPerShare
      totalAssets
      totalSupply
      timestamp
    }
    first: DailyVaultStats(first: 1, where: {blockNumber_gte: $firstBlock}) {
      apy
      assetPerShare
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
    query metavaults {
  vaults {
    address
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