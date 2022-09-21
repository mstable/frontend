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
export type MetavaultQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type MetavaultQuery = { __typename?: 'Query', vault?: { __typename?: 'Vault', totalSupply: any, apy: any, DailyVaultStats: Array<{ __typename?: 'DailyVaultStat', totalSupply: any }> } | null };


export const MetavaultDocument = `
    query metavault($id: ID!) {
  vault(id: $id) {
    totalSupply
    apy
    DailyVaultStats(first: 7, orderBy: timestamp, orderDirection: desc) {
      totalSupply
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