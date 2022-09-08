import { axiosInstance } from './axios';

export const graphqlClient =
  <_TData, TVariables>(query: string, variables?: TVariables) =>
  async () => {
    const res = await axiosInstance({
      url: 'https://api.studio.thegraph.com/query/32034/mstable-metavault-goerli/v0.1.0',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { query, variables },
    });

    return res.data['errors']?.[0] || res.data['data'];
  };
