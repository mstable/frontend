import produce from 'immer';
import { defineMessage } from 'react-intl';

import { Home } from './views/Home';

import type { Route } from '@tanstack/react-location';

export const routes: Route[] = [
  // {
  //   id: 'vault',
  //   path: '/vault',
  //   children: [
  //     {
  //       path: ':address',
  //       element: () => import('./views/Vault').then((mod) => <mod.Vault />),
  //     },
  //   ],
  // },
  {
    id: 'explore',
    path: '/',
    element: <Home />,
    // meta: {
    //   label: defineMessage({ defaultMessage: 'Explore', id: '7JlauX' }),
    // },
  },
  {
    id: 'flatcoin',
    path: '/flatcoin',
    searchFilters: [
      produce((prev) => {
        prev.type =
          typeof prev.type === 'string' &&
          ['flatcoin', 'leveragedeth'].includes(prev.type)
            ? prev.type
            : 'flatcoin';
      }),
    ],
    search: ({ type }) => ({ type: type ?? 'flatcoin' }),
    element: () => import('./views/Flatcoin').then((mod) => <mod.Flatcoin />),
    meta: {
      label: defineMessage({ defaultMessage: 'Flatcoin', id: 'Ew5cbe' }),
    },
  },
];
