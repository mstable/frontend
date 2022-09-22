import * as Types from '@frontend/shared-data-access';

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


export type UserVaultBalanceQuery = { __typename?: 'Query', vaultBalances: Array<{ __typename?: 'VaultBalance', owner: any, timestamp: any, shareBalance: any, assetBalance: any, assetDeposited: any, vault: { __typename?: 'Vault', id: string, asset: { __typename?: 'Token', id: string, name: string, symbol: string, decimals: number } } }> };


export const UserVaultBalanceDocument = `
    query userVaultBalance($owner: Bytes!, $vault: String!) {
  vaultBalances(where: {owner: $owner, vault: $vault}, first: 1) {
    owner
    vault {
      id
      asset {
        id
        name
        symbol
        decimals
      }
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