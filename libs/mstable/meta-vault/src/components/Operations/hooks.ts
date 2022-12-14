import { useCallback, useMemo } from 'react';

import produce from 'immer';
import { useIntl } from 'react-intl';

import { useMetavault } from '../../state';
import { useTrackedState, useUpdate } from './state';

import type { BigDecimal } from '@frontend/shared-utils';

import type { SupportedOperation } from '../../types';

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

  return useCallback(
    (operation: SupportedOperation) => {
      update(
        produce((state) => {
          state.operation = operation;
          state.amount = null;
          state.tab = ['deposit', 'mint'].includes(operation) ? 0 : 1;
        }),
      );
    },
    [update],
  );
};

export const useChangeTab = () => {
  const update = useUpdate();
  const { assetBalance, mvBalance } = useMetavault();

  return useCallback(
    (tab: 0 | 1) => {
      update(
        produce((state) => {
          state.tab = tab;
          state.operation = tab === 0 ? 'deposit' : 'withdraw';
          state.amount = null;
          state.balance = tab === 0 ? assetBalance : mvBalance;
        }),
      );
    },
    [assetBalance, mvBalance, update],
  );
};

export const useOperationLabel = () => {
  const intl = useIntl();
  const { operation } = useTrackedState();

  return useMemo(
    () =>
      ({
        deposit: intl.formatMessage({
          defaultMessage: 'Deposit',
          id: 'dIgBOz',
        }),
        mint: intl.formatMessage({ defaultMessage: 'Mint', id: 'OwO+Nr' }),
        withdraw: intl.formatMessage({
          defaultMessage: 'Withdraw',
          id: 'PXAur5',
        }),
        redeem: intl.formatMessage({ defaultMessage: 'Redeem', id: 'XSdWHA' }),
      }[operation]),
    [intl, operation],
  );
};

export const useSetIsSubmitLoading = () => {
  const update = useUpdate();

  return useCallback(
    (val?: boolean) => {
      update(
        produce((state) => {
          state.isSubmitLoading = val ?? !state.isSubmitLoading;
        }),
      );
    },
    [update],
  );
};
