import { Main } from './views/Main';
import { Metavault } from './views/Metavault';

import type { Route } from '@tanstack/react-location';

export const metaVaultRoutes: Route[] = [
  { element: <Main />, children: [{ element: <Metavault /> }] },
];
