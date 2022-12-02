import { useEffect } from 'react';

import { useTrack } from '@frontend/shared-analytics';
import { usePrevious } from 'react-use';
import { useAccount, useNetwork } from 'wagmi';

import type { Children } from '@frontend/shared-utils';

export const WalletAnalyticsProvider = ({ children }: Children) => {
  const track = useTrack();
  const { chain } = useNetwork();
  const { address, status } = useAccount();
  const prevAddress = usePrevious(address);

  useEffect(() => {
    if (status === 'connected') {
      track('wallet_connect', { address, chain: chain?.id });
    } else if (!!prevAddress && status === 'disconnected') {
      track('wallet_disconnect', { address: prevAddress });
    } else if (!!prevAddress && !!address && prevAddress !== address) {
      track('wallet_switch', {
        address,
        prevAddress,
        chain: chain?.id,
      });
    }
  }, [address, chain?.id, prevAddress, status, track]);

  return <>{children}</>;
};
