import type { MvRoute } from '@frontend/mstable-metavault';
import type { Route } from '@tanstack/react-location';

export type MstableRoute = MvRoute;

export const routes: Route<MstableRoute>[] = [
  {
    path: ':mvid',
    element: () => import('./views/Metavault').then((mod) => <mod.Metavault />),
  },
  {
    path: '/',
    element: () => import('./views/Home').then((mod) => <mod.Home />),
  },
];
