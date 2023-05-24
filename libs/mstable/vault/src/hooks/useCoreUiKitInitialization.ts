import { useEffect } from 'react';

import { AddressZero } from '@dhedge/core-ui-kit/const';
import {
  useTradingPanelPoolAddress,
  useTradingPanelPoolFallbackData,
} from '@dhedge/core-ui-kit/hooks/state';

import { useVault } from '../state';

export const useCoreUiKitInitialization = () => {
  const {
    fund,
    config: { address },
  } = useVault();

  const setTradingPanelPoolAddress = useTradingPanelPoolAddress()[1];
  const setTradingPanelPoolFallbackData = useTradingPanelPoolFallbackData()[1];

  useEffect(() => {
    setTradingPanelPoolAddress(address);

    return () => {
      setTradingPanelPoolAddress(AddressZero);
    };
  }, [address, setTradingPanelPoolAddress]);

  useEffect(() => {
    if (!fund) return;
    setTradingPanelPoolFallbackData({
      address: fund.address,
      managerLogicAddress: fund.managerLogicAddress,
      tokenPrice: fund.tokenPrice,
      poolCompositions: fund.fundComposition,
    });

    return () => {
      setTradingPanelPoolFallbackData({ address: AddressZero });
    };
  }, [fund, setTradingPanelPoolFallbackData]);
};
