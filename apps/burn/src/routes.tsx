import { App } from './App';

import type { MakeGenerics, Route } from '@tanstack/react-location';

export type BurnRoute = MakeGenerics<{
  Search: {
    address: string;
  };
}>;

export const routes: Route<BurnRoute>[] = [
  {
    id: 'home',
    path: '/',
    element: <App />,
  },
];
