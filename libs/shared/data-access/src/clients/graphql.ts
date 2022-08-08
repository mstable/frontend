import { axiosInstance } from './axios';

export const graphqlClient =
  <_TData, TVariables>(query: string, variables?: TVariables) =>
  async () => {
    const res = await axiosInstance({
      url: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { query, variables },
    });

    return res.data['errors']?.[0] || res.data['data'];
  };
