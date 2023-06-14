import { DEFAULT_ERROR_MESSAGE } from '@dhedge/core-ui-kit/const';
import { getExplorerLink, isErrorWithMessage } from '@dhedge/core-ui-kit/utils';
import { CORE_UI_TOOLKIT_POOL_CONFIG_MAP } from '@frontend/shared-constants';
import {
  CoreUIToolkitProvider as ToolkitProvider,
  usePushNotification,
} from '@frontend/shared-providers';
import { simulateTransaction } from '@frontend/shared-services';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { Button } from '@mui/material';

import type { TradingPanelContextConfig } from '@dhedge/core-ui-kit/types';
import type { FC, ReactNode } from 'react';

const getActions = (
  pushNotification: ReturnType<typeof usePushNotification>,
): TradingPanelContextConfig['actions'] => ({
  onTransactionError: (error, action, chainId, txHash) => {
    console.debug('[mStable]: trading transaction failed', error);

    if (txHash) {
      const link = getExplorerLink(txHash, 'transaction', chainId);
      pushNotification({
        title: 'Transaction failed',
        content: <ViewEtherscanLink href={link} />,
        severity: 'error',
      });
    }
  },
  onTransactionSuccess: (data, _, link) => {
    console.debug('[mStable]: trading transaction succeeded', data);

    pushNotification({
      title: 'Transaction has passed successfully!',
      content: <ViewEtherscanLink href={link} />,
      severity: 'success',
    });
  },
  onTransactionEstimationError: (error) => {
    const errorMessage = isErrorWithMessage(error)
      ? error.message
      : DEFAULT_ERROR_MESSAGE;

    pushNotification({
      title: 'Tx is expected to fail',
      content: (
        <>
          <p>{errorMessage}</p>
          {error?.onBypass && (
            <Button
              sx={{ width: 120 }}
              variant="contained"
              size="small"
              onClick={error.onBypass}
            >
              Send anyways
            </Button>
          )}
        </>
      ),
      severity: 'warning',
    });
  },
  onSimulateTransaction: async ({ chainId, from, to, gas, value, input }) => {
    try {
      const { data } = await simulateTransaction({
        chainId,
        from,
        to,
        input,
        gas,
        value,
      });
      console.debug('[mStable] simulation data:', data);
      return data?.data;
    } catch (error) {
      console.debug('[mStable] failed to simulate tx:', error);
      return null;
    }
  },
  onLog: (eventName, payload) => {
    console.log(`[core-ui-toolkit]: log ${eventName}`, payload);
  },
});

export const CoreUIToolkitProvider: FC = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pushNotification = usePushNotification();

  return (
    <ToolkitProvider
      poolConfigMap={CORE_UI_TOOLKIT_POOL_CONFIG_MAP}
      actions={getActions(pushNotification)}
    >
      {children}
    </ToolkitProvider>
  );
};
