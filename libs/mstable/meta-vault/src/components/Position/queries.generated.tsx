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
export type PositionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PositionQuery = { __typename?: 'Query', vaults: Array<{ __typename?: 'Vault', id: string, address: any, timestamp: any }> };


export const PositionDocument = `
    query position {
  vaults {
    id
    address
    timestamp
  }
}
    `;
export const usePositionQuery = <
      TData = PositionQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: PositionQueryVariables,
      options?: UseQueryOptions<PositionQuery, TError, TData>
    ) =>
    useQuery<PositionQuery, TError, TData>(
      variables === undefined ? ['position'] : ['position', variables],
      fetcher<PositionQuery, PositionQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, PositionDocument, variables),
      options
    );