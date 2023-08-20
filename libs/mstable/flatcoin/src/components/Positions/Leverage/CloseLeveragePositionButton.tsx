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

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

import type { LeveragedPosition } from '../../../types';

interface Props {
  position: LeveragedPosition;
}

const useCloseLeveragePositionButton = ({
  positionId,
  marginAfterSettlement,
}: LeveragedPosition) => {
  const {
    flatcoinChainId,
    keeperFee: { rawFee },
    tokens: { collateral },
  } = useFlatcoin();
  const sellAmount = new BigNumber(marginAfterSettlement)
    .shiftedBy(collateral.decimals)
    .toFixed();

  const { data } = useContractRead({
    address: getFlatcoinOracleModuleContract(flatcoinChainId).address,
    chainId: flatcoinChainId,
    abi: getFlatcoinOracleModuleContract(flatcoinChainId).abi,
    functionName: 'getSellPrice',
    args: [sellAmount, false],
  });
  const sellPrice = data?.[0]
    ? new BigNumber(data[0].toString()).multipliedBy(0.995).toFixed(0) // applied 0.5% of slippage
    : '';

  const { config, isError } = usePrepareContractWrite({
    address: getFlatcoinDelayedOrderContract(flatcoinChainId)?.address,
    abi: getFlatcoinDelayedOrderContract(flatcoinChainId)?.abi,
    functionName: 'announceLeverageClose',
    args: [positionId, sellPrice, rawFee],
    chainId: flatcoinChainId,
    enabled: !!sellPrice && !!rawFee,
  });

  return {
    isError,
    config,
  };
};

export const CloseLeveragePositionButton: FC<Props & ButtonProps> = ({
  position,
  ...buttonProps
}) => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const { isError, config } = useCloseLeveragePositionButton(position);

  return (
    <TransactionActionButton
      config={config}
      pushNotification={pushNotification}
      isError={isError}
      transactionName={intl.formatMessage({
        defaultMessage: 'Announce Leverage Position Close',
        id: '1v6yZm',
      })}
      actionName={intl.formatMessage({
        defaultMessage: 'Close',
        id: 'rbrahO',
      })}
      {...buttonProps}
    />
  );
};
