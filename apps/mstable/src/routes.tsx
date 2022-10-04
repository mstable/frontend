import { metaVaultRoutes } from '@frontend/mstable-metavault';
import { Navigate } from '@tanstack/react-location';

import type { MvGenerics } from '@frontend/mstable-metavault';
import type { Route } from '@tanstack/react-location';

type MStableRoutes = MvGenerics;

export const routes: Route<MStableRoutes>[] = [
  ...metaVaultRoutes,
  { element: <Navigate to="metavaults" /> },
];
