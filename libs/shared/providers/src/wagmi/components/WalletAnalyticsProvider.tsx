import { useEffect } from 'react';

import { usePrevious } from 'react-use';
import { useAccount, useNetwork } from 'wagmi';

import { useTrack } from '../../analytics';

import type { Children } from '@frontend/shared-utils';

export const WalletAnalyticsProvider = ({ children }: Children) => {
  const track = useTrack();
  const { chain } = useNetwork();
  const { address, status, connector } = useAccount();
  const prevAddress = usePrevious(address);

  useEffect(() => {
    if (!!prevAddress && status === 'disconnected') {
      track('wallet_disconnect', { address: prevAddress });
    } else if (!!prevAddress && !!address && prevAddress !== address) {
      track('wallet_switch', {
        address,
        prevAddress,
        chain: chain?.id,
        wallet: connector?.name,
      });
    } else if (!prevAddress && !!address && status === 'connected') {
      track('wallet_connect', {
        address,
        wallet: connector?.name,
        chain: chain?.id,
      });
    }
  }, [address, chain?.id, connector?.name, prevAddress, status, track]);

  return <>{children}</>;
};
