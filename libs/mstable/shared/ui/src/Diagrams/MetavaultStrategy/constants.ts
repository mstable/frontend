import { defineMessage } from 'react-intl';

export const stepsLabels = [
  {
    title: defineMessage({
      defaultMessage: 'Need more light on the strategy?',
    }),
    subtitle: defineMessage({
      defaultMessage: 'Start the tour and get more insight on the strategy.',
    }),
  },
  {
    title: defineMessage({
      defaultMessage: 'User deposits USDC',
    }),
    subtitle: defineMessage({
      defaultMessage:
        'This Meta Vault accepts USDC. Anyone can deposit and receive vault shares.',
    }),
  },
  {
    title: defineMessage({
      defaultMessage: 'How does the 3Pool Convex Meta Vault works?',
    }),
    subtitle: defineMessage({
      defaultMessage:
        'The Meta Vault then allocates the deposits into different underlying. This Meta Vault uses 3CRV based Metapools and and stakes it on Convex. The strategy earns from the underlying Liquidity Position that earns a fee on every swap, but also from the liquidation of the CRV and CVX rewards. Everything is automated for the user and rewards are auto-compounded.',
    }),
  },
  {
    title: defineMessage({
      defaultMessage: 'User withdraws USDC',
    }),
    subtitle: defineMessage({
      defaultMessage:
        'Over time, the share price will increase. The amount that is earned is included in that increase. A user then can withdraw back USDC, skipping all the steps it would normally take to exit a Curve/Convex position.',
    }),
  },
];
