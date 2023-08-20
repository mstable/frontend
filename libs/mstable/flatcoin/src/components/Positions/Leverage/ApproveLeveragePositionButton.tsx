import { usePushNotification } from '@frontend/shared-providers';
import { TransactionActionButton } from '@frontend/shared-ui';
import { useIntl } from 'react-intl';
import { usePrepareContractWrite } from 'wagmi';

import { useFlatcoin } from '../../../state';
import {
  getFlatcoinDelayedOrderContract,
  getFlatcoinLeveragedModuleContract,
} from '../../../utils';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

interface Props extends ButtonProps {
  tokenId: string;
}

export const ApproveLeveragePositionButton: FC<Props> = ({
  tokenId,
  ...buttonProps
}) => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const { flatcoinChainId } = useFlatcoin();
  const leveragedModuleContract =
    getFlatcoinLeveragedModuleContract(flatcoinChainId);
  const { config, isError } = usePrepareContractWrite({
    address: leveragedModuleContract?.address,
    abi: leveragedModuleContract?.abi,
    functionName: 'approve',
    args: [getFlatcoinDelayedOrderContract(flatcoinChainId)?.address, tokenId],
    chainId: flatcoinChainId,
  });

  return (
    <TransactionActionButton
      config={config}
      pushNotification={pushNotification}
      isError={isError}
      transactionName={intl.formatMessage({
        defaultMessage: 'Approve Position Close',
        id: '0OPmis',
      })}
      actionName={intl.formatMessage({
        defaultMessage: 'Approve',
        id: 'WCaf5C',
      })}
      {...buttonProps}
    />
  );
};
