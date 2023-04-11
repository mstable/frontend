import { Home } from './views/Home';

import type { MvRoute } from '@frontend/mstable-metavault';
import type { Route } from '@tanstack/react-location';

export type MstableRoute = MvRoute;

export const routes: Route<MstableRoute>[] = [
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
