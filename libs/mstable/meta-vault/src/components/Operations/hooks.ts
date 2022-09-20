import { useCallback, useMemo } from 'react';

import produce from 'immer';
import { useIntl } from 'react-intl';

import { useMetavault } from '../../state';
import { useTrackedState, useUpdate } from './state';

import type { BigDecimal } from '@frontend/shared-utils';

import type { SupportedOperation } from './state';

export const useOperations = () => useTrackedState();

export const useSetAmount = () => {
  const update = useUpdate();

  return useCallback(
    (amount: BigDecimal) => {
      update(
        produce((state) => {
          state.amount = amount;
        }),
      );
    },
    [update],
  );
};

export const useReset = () => {
  const update = useUpdate();

  return useCallback(() => {
    update(
      produce((state) => {
        state.amount = null;
        state.preview = null;
      }),
    );
  }, [update]);
};

export const useChangeOperation = () => {
  const update = useUpdate();
  const { assetToken, mvToken, assetBalance, mvBalance } = useMetavault();

  return useCallback(
    (operation: SupportedOperation) => {
      update(
        produce((state) => {
          state.operation = operation;
          state.amount = null;
          state.token = {
            deposit: assetToken,
            mint: mvToken,
            withdraw: assetToken,
            redeem: mvToken,
          }[operation];
          state.balance = {
            deposit: assetBalance,
            mint: mvBalance,
            withdraw: assetBalance,
            redeem: mvBalance,
          }[operation];
        }),
      );
    },
    [assetBalance, assetToken, mvBalance, mvToken, update],
  );
};

export const useChangeTab = () => {
  const update = useUpdate();
  const { assetToken, mvToken, assetBalance, mvBalance } = useMetavault();

  return useCallback(
    (tab: 0 | 1) => {
      update(
        produce((state) => {
          state.tab = tab;
          state.operation = tab === 0 ? 'deposit' : 'withdraw';
          state.amount = null;
          state.token = tab === 0 ? assetToken : mvToken;
          state.balance = tab === 0 ? assetBalance : mvBalance;
        }),
      );
    },
    [assetBalance, assetToken, mvBalance, mvToken, update],
  );
};

export const useOperationLabel = () => {
  const intl = useIntl();
  const { operation } = useTrackedState();

  return useMemo(
    () =>
      ({
        deposit: intl.formatMessage({ defaultMessage: 'Deposit' }),
        mint: intl.formatMessage({ defaultMessage: 'Mint' }),
        withdraw: intl.formatMessage({ defaultMessage: 'Withdraw' }),
        redeem: intl.formatMessage({ defaultMessage: 'Redeem' }),
      }[operation]),
    [intl, operation],
  );
};
