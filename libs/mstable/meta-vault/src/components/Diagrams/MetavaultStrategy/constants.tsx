import { ConvexProtocol, CurveProtocol } from '@frontend/shared-icons';
import { defineMessage } from 'react-intl';

export const stepsLabels = [
  {
    title: defineMessage({
      defaultMessage: 'Need more light on the strategy?',
      id: 'FApc0Y',
    }),
    subtitle: defineMessage({
      defaultMessage: 'Start the tour and get more insight.',
      id: 'qm/wiV',
    }),
  },
  {
    title: defineMessage({
      defaultMessage: 'User deposits USDC',
      id: 'iYgKR9',
    }),
    subtitle: defineMessage({
      defaultMessage:
        'This Meta Vault accepts USDC. Anyone can deposit and receive vault shares.',
      id: 'bxTM3Z',
    }),
  },
  {
    title: defineMessage({
      defaultMessage: 'How does the 3Pool Convex Meta Vault works?',
      id: 'k6yAtR',
    }),
    subtitle: defineMessage({
      defaultMessage:
        'The Meta Vault then allocates the deposits into different underlying. This Meta Vault uses 3CRV based Metapools and and stakes it on Convex. The strategy earns from the underlying Liquidity Position that earns a fee on every swap, but also from the liquidation of the CRV and CVX rewards. Everything is automated for the user and rewards are auto-compounded.',
      id: 'QS3Tk3',
    }),
  },
  {
    title: defineMessage({
      defaultMessage: 'User withdraws USDC',
      id: 'kdIIDL',
    }),
    subtitle: defineMessage({
      defaultMessage:
        'Over time, the share price will increase. The amount that is earned is included in that increase. A user then can withdraw back USDC, skipping all the steps it would normally take to exit a Curve/Convex position.',
      id: 'CiONZE',
    }),
  },
];

export const underLyingVaults = [
  {
    token: { label: 'mUSD/3CRV', icon: <CurveProtocol /> },
    vault: { label: 'Convex', icon: <ConvexProtocol /> },
  },
  {
    token: { label: 'BUSD/3CRV', icon: <CurveProtocol /> },
    vault: { label: 'Convex', icon: <ConvexProtocol /> },
  },
  {
    token: { label: 'Frax/3CRV', icon: <CurveProtocol /> },
    vault: { label: 'Convex', icon: <ConvexProtocol /> },
  },
];
