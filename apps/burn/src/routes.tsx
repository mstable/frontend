import { App } from './App';

import type { MakeGenerics, Route } from '@tanstack/react-location';

export type LTSRoute = MakeGenerics<{
  Search: {
    address: string;
  };
}>;

export const routes: Route<LTSRoute>[] = [
  {
    id: 'home',
    path: '/',
    element: <App />,
  },
];
