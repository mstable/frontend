import { DEFAULT_MAX_FILL_PRICE_SLIPPAGE } from '@frontend/shared-constants';
import { usePushNotification } from '@frontend/shared-providers';
import { TransactionActionButton } from '@frontend/shared-ui';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';
import { useContractRead, usePrepareContractWrite } from 'wagmi';

import { useFlatcoin } from '../../../state';
import {
  getFlatcoinDelayedOrderContract,
  getFlatcoinOracleModuleContract,
} from '../../../utils';

import type { StackProps } from '@mui/material';
import type { FC } from 'react';

import type { LeveragedPosition } from '../../../types';

type CloseLeveragePositionProps = StackProps & {
  leveragePosition: LeveragedPosition;
};

const useCloseLeveragePositionButton = ({
  positionId,
  additionalSize,
}: LeveragedPosition) => {
  const { flatcoinChainId, keeperFee } = useFlatcoin();

  const { data } = useContractRead({
    address: getFlatcoinOracleModuleContract(flatcoinChainId).address,
    chainId: flatcoinChainId,
    abi: getFlatcoinOracleModuleContract(flatcoinChainId).abi,
    functionName: 'getSellPrice',
    args: [additionalSize.exact.toString(), false],
  });
  const sellPrice = data?.[0]
    ? new BigNumber(data[0].toString())
        .multipliedBy(100 - DEFAULT_MAX_FILL_PRICE_SLIPPAGE) // applied 0.25% of slippage
        .dividedBy(100)
        .toFixed(0)
    : '';

  const { config, error } = usePrepareContractWrite({
    address: getFlatcoinDelayedOrderContract(flatcoinChainId)?.address,
    abi: getFlatcoinDelayedOrderContract(flatcoinChainId)?.abi,
    functionName: 'announceLeverageClose',
    args: [positionId, sellPrice, keeperFee.exact],
    chainId: flatcoinChainId,
    enabled: !!sellPrice && !keeperFee.exact.isZero(),
  });

  return {
    error,
    config,
  };
};

export const CloseLeveragePositionButton: FC<CloseLeveragePositionProps> = ({
  leveragePosition,
  ...stackProps
}) => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const { error, config } = useCloseLeveragePositionButton(leveragePosition);

  return (
    <TransactionActionButton
      config={config}
      pushNotification={pushNotification}
      error={error}
      transactionName={intl.formatMessage({
        defaultMessage: 'Announce Leverage Position Close',
        id: '1v6yZm',
      })}
      actionName={intl.formatMessage({
        defaultMessage: 'Close',
        id: 'rbrahO',
      })}
      components={{ buttonContainer: stackProps }}
    />
  );
};
