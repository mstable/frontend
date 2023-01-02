import { Metavault } from '@frontend/mstable-metavault';

import { Home } from './views/Home';

import type { MvRoute } from '@frontend/mstable-metavault';
import type { Route } from '@tanstack/react-location';

export type MstableRoute = MvRoute;

export const routes: Route<MstableRoute>[] = [
  {
    path: ':mvid',
    element: <Metavault />,
  },
  {
    path: '/',
    element: <Home />,
  },
];
