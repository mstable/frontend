import { defineMessage } from 'react-intl';

import type { MessageDescriptor } from 'react-intl';

export type SupportedProtocol = 'mstable' | 'curve' | 'convex';

export type Protocol = {
  id: string;
  name: string;
  description: MessageDescriptor;
};

export const protocols: Record<SupportedProtocol, Protocol> = {
  mstable: {
    id: 'mstable',
    name: 'mStable',
    description: defineMessage({
      defaultMessage:
        'mStable is a protocol for yield aggregation and diversification.',
    }),
  },
  curve: {
    id: 'curve',
    name: 'Curve',
    description: defineMessage({
      defaultMessage:
        'Curve is an exchange liquidity pool on Ethereum designed for: extremely efficient stablecoin trading, low risk, supplemental fee income for liquidity providers, without an opportunity cost.',
    }),
  },
  convex: {
    id: 'convex',
    name: 'Convex',
    description: defineMessage({
      defaultMessage:
        'Convex is a platform that boosts rewards for CRV stakers and liquidity providers alike, all in a simple and easy to use interface.',
    }),
  },
};
