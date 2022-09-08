import * as Types from '@frontend/shared-data-access';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@frontend/shared-data-access';
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
      variables?: PositionQueryVariables,
      options?: UseQueryOptions<PositionQuery, TError, TData>
    ) =>
    useQuery<PositionQuery, TError, TData>(
      variables === undefined ? ['position'] : ['position', variables],
      graphqlClient<PositionQuery, PositionQueryVariables>(PositionDocument, variables),
      options
    );