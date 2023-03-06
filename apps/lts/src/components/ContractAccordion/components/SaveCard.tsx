import { useState } from 'react';

import { CountUp, Dialog } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import { alpha, Button, Skeleton, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount, useBalance } from 'wagmi';

import { ContractHeader } from './ContractHeader';

import type { Save } from '@frontend/lts-constants';
import type { StackProps } from '@mui/material';

export type SaveCardProps = {
  contract: Save;
} & StackProps;

const rowProps: StackProps = {
  width: 1,
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const SaveCard = ({ contract, ...rest }: SaveCardProps) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);

  const { address: walletAddress, isConnected } = useAccount();

  const { data: bal, isLoading: balLoading } = useBalance({
    address: walletAddress,
    token: contract.address,
  });

  return (
    <>
      <Stack
        direction="column"
        spacing={3}
        {...rest}
        sx={{
          p: 2,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: (theme) =>
            alpha(theme.palette.background.highlight, 0.5),
          backdropFilter: 'blur(20px)',
          borderRadius: 1,
          ...rest?.sx,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ContractHeader contract={contract} />
          {balLoading ? (
            <Skeleton width={60} />
          ) : (
            <CountUp
              variant="value4"
              end={new BigDecimal(bal?.value).simple}
              suffix={bal.symbol}
            />
          )}
        </Stack>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          {intl.formatMessage({
            defaultMessage: 'Exit Position',
            id: 'hPs6J+',
          })}
        </Button>
      </Stack>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title={intl.formatMessage(
          { defaultMessage: 'Exit {pool}', id: 'MtpzgV' },
          { pool: contract.name },
        )}
        content={
          <Stack spacing={2} pt={4}>
            <Stack {...rowProps}>
              <Typography variant="label2" color="text.secondary">
                {intl.formatMessage({
                  defaultMessage: 'Withdraw',
                  id: 'PXAur5',
                })}
              </Typography>
            </Stack>
          </Stack>
        }
        actions={(onClose) => (
          <>
            <Button color="secondary" onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
            <Button>
              {intl.formatMessage({
                defaultMessage: 'Withdraw',
                id: 'PXAur5',
              })}
            </Button>
          </>
        )}
      />
    </>
  );
};
