import type { Goal } from './types';

// Those labels need to match the goals settings
// in Plausible to appear on the dashboard
export const goals: Record<Goal, string> = {
  wallet_connect: 'Wallet: Connect',
  wallet_disconnect: 'Wallet: Disconnect',
  wallet_switch: 'Wallet: Switch',
  approve: 'Operation: Approve',
  deposit: 'Operation: Deposit',
  withdraw: 'Operation: Withdraw',
  view_expand_chart: 'View: Expand Chart',
  view_strategy: 'View: Strategy',
  view_tx_history: 'View: Tx History',
  error: 'Error',
};
