import produce from 'immer';
import { defineMessage } from 'react-intl';

import { Flatcoin } from './views/Flatcoin';

import type { Route } from '@tanstack/react-location';

export const routes: Route[] = [
  {
    id: 'flatcoin',
    path: '/',
    searchFilters: [
      produce((prev) => {
        prev.type =
          typeof prev.type === 'string' &&
          ['flatcoin', 'leveraged'].includes(prev.type)
            ? prev.type
            : 'flatcoin';
      }),
    ],
    search: ({ type }) => ({ type: type ?? 'flatcoin' }),
    element: <Flatcoin />,
    meta: {
      label: defineMessage({ defaultMessage: 'Flatcoin', id: 'Ew5cbe' }),
    },
  },
];
