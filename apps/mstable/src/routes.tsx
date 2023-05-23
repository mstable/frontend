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
    id: 'metavault',
    path: '/:mvid',
    element: () => import('./views/Metavault').then((mod) => <mod.Metavault />),
  },
  {
    id: 'explore',
    path: '/',
    element: <Home />,
  },
];
