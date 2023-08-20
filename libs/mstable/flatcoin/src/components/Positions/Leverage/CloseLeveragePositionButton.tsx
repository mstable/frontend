import { usePushNotification } from '@frontend/shared-providers';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { getBlockExplorerUrl } from '@frontend/shared-utils';
import { Button, CircularProgress } from '@mui/material';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';
import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

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
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const { chain } = useNetwork();
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

  const {
    data: writeData,
    write,
    isLoading: isWriteLoading,
    isSuccess: isWriteSuccess,
  } = useContractWrite({
    ...config,
    onSuccess: (data) => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Announce Leverage Position',
          id: 'qcHHVw',
        }),
        content: (
          <ViewEtherscanLink
            hash={data?.hash}
            blockExplorer={getBlockExplorerUrl(chain)}
          />
        ),
        severity: 'info',
      });
    },
    onError: () => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction Cancelled',
          id: '20X0BC',
        }),
        severity: 'info',
      });
    },
  });

  const { isSuccess: isSubmitSuccess } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: ({ transactionHash }) => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction Confirmed',
          id: 'rgdwQX',
        }),
        content: (
          <ViewEtherscanLink
            hash={transactionHash}
            blockExplorer={getBlockExplorerUrl(chain)}
          />
        ),
        severity: 'success',
      });
    },
    onError: () => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction Error',
          id: 'p8bsw4',
        }),
        content: (
          <ViewEtherscanLink
            hash={writeData?.hash}
            blockExplorer={getBlockExplorerUrl(chain)}
          />
        ),
        severity: 'error',
      });
    },
  });

  return {
    isError,
    write,
    isWriteLoading,
    isWriteSuccess,
    isSubmitSuccess,
  };
};

export const CloseLeveragePositionButton: FC<Props & ButtonProps> = ({
  position,
  ...buttonProps
}) => {
  const intl = useIntl();
  const { isError, write, isWriteSuccess, isSubmitSuccess, isWriteLoading } =
    useCloseLeveragePositionButton(position);

  if (isWriteLoading) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({
          defaultMessage: 'Sign Transaction',
          id: 'w1LBDB',
        })}
      </Button>
    );
  }

  if (isWriteSuccess && !isSubmitSuccess) {
    return (
      <Button {...buttonProps} disabled>
        <CircularProgress size={20} />
      </Button>
    );
  }

  return (
    <Button {...buttonProps} disabled={isError} onClick={write}>
      {intl.formatMessage({
        defaultMessage: 'Close',
        id: 'rbrahO',
      })}
    </Button>
  );
};
