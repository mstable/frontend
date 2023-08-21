import { useState } from 'react';

import { ZERO_ADDRESS } from '@frontend/shared-constants';
import { Dialog, TokenIconRevamp } from '@frontend/shared-ui';
import {
  formatNumberToLimitedDecimals,
  isEqualAddresses,
} from '@frontend/shared-utils';
import { Button, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useFlatcoin } from '../../../state';
import { ApproveLeveragePositionButton } from './ApproveLeveragePositionButton';
import { CloseLeveragePositionButton } from './CloseLeveragePositionButton';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

import type { LeveragedPosition } from '../../../types';

interface CloseLeveragePositionModalProps extends ButtonProps {
  position: LeveragedPosition;
}

const useCloseLeveragePositionModal = (position: LeveragedPosition) => {
  const {
    tokens: { collateral },
  } = useFlatcoin();
  const [opened, setOpened] = useState(false);
  const notApproved = isEqualAddresses(position.approvedAddress, ZERO_ADDRESS);

  return { opened, setOpened, notApproved, collateral };
};

export const CloseLeveragePositionModal: FC<
  CloseLeveragePositionModalProps
> = ({ position, ...buttonProps }) => {
  const intl = useIntl();
  const { opened, setOpened, notApproved, collateral } =
    useCloseLeveragePositionModal(position);

  return (
    <>
      <Button {...buttonProps} onClick={() => setOpened(true)}>
        {intl.formatMessage({
          defaultMessage: 'Close',
          id: 'rbrahO',
        })}
      </Button>
      <Dialog
        open={opened}
        onClose={() => setOpened(false)}
        maxWidth="xs"
        title="Close Leveraged Position"
        content={
          <Stack spacing={1}>
            <Typography variant="label2" color="text.secondary">
              {intl.formatMessage({
                defaultMessage: 'Margin Deposited',
                id: 'inIeEz',
              })}
            </Typography>
            <Typography variant="value4">
              {formatNumberToLimitedDecimals(position.marginDeposited)}
              <TokenIconRevamp
                symbols={[collateral.symbol]}
                sx={{
                  height: 14,
                  width: 14,
                  ml: 1,
                  mr: 0.5,
                  display: 'inline-block',
                }}
              />
              {collateral.symbol}
            </Typography>
          </Stack>
        }
        actions={
          notApproved ? (
            <ApproveLeveragePositionButton
              tokenId={position.positionId}
              sx={{ width: '100%' }}
            />
          ) : (
            <CloseLeveragePositionButton
              position={position}
              sx={{ width: '100%' }}
            />
          )
        }
      />
    </>
  );
};
