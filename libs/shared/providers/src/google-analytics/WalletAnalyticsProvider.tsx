import { useEffect } from 'react';

import { usePrevious } from 'react-use';
import { useAccount, useNetwork } from 'wagmi';

import { useLogAnalyticsEvent } from './index';

import type { Children } from '@frontend/shared-utils';

export const WalletAnalyticsProvider = ({ children }: Children) => {
  const logAnalyticsEvent = useLogAnalyticsEvent();
  const { chain } = useNetwork();
  const { address, status, connector } = useAccount();
  const prevAddress = usePrevious(address);

  useEffect(() => {
    if (!!prevAddress && status === 'disconnected') {
      logAnalyticsEvent('wallet_disconnect');
    } else if (!!prevAddress && !!address && prevAddress !== address) {
      logAnalyticsEvent('wallet_switch', {
        wallet: connector?.name,
        chainId: chain?.id,
      });
    } else if (
      (!prevAddress && !!address && status === 'connected') || // logs new connection
      (prevAddress === address && status === 'connected') // logs auto connection
    ) {
      logAnalyticsEvent('wallet_connect', {
        wallet: connector?.name,
        chain: chain?.id,
      });
    }
  }, [
    address,
    chain?.id,
    connector?.name,
    logAnalyticsEvent,
    prevAddress,
    status,
  ]);

  return <>{children}</>;
};
