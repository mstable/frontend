import { Withdraw } from '@frontend/lts-withdraw';
import { defineMessage } from 'react-intl';

import type { WithdrawRoute } from '@frontend/lts-withdraw';
import type { Route } from '@tanstack/react-location';
import type { MessageDescriptor } from 'react-intl';

export type LTSRoute = WithdrawRoute & {
  RouteMeta: {
    label: MessageDescriptor;
  };
};

export const routes: Route<LTSRoute>[] = [
  {
    id: 'home',
    meta: {
      label: defineMessage({ defaultMessage: 'Withdraw', id: 'PXAur5' }),
    },
    path: '/',
    element: <Withdraw />,
  },
  // {
  //   id: 'burn',
  //   meta: {
  //     label: defineMessage({ defaultMessage: 'BuyBack MTA', id: '6T7RIi' }),
  //   },
  //   path: '/burn',
  //   element: <Burn />,
  // },
];
