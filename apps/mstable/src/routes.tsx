import { Home } from './views/Home';

import type { Route } from '@tanstack/react-location';

export const routes: Route[] = [
  {
    id: 'vault',
    path: '/vault',
    children: [
      {
        path: ':address',
        element: () => import('./views/Vault').then((mod) => <mod.Vault />),
      },
    ],
  },
  {
    id: 'explore',
    path: '/',
    element: <Home />,
  },
];
