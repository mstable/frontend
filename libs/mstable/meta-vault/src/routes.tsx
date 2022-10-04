import { Explore } from './views/Explore';
import { Main } from './views/Main';
import { Metavault } from './views/Metavault';

import type { Route } from '@tanstack/react-location';

import type { MvGenerics } from './types';

export const metaVaultRoutes: Route<MvGenerics>[] = [
  {
    path: 'metavaults',
    element: <Main />,
    children: [
      {
        path: ':mvid',
        element: <Metavault />,
      },
      { element: <Explore /> },
    ],
  },
];
