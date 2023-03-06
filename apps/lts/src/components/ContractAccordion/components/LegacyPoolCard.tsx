import { useMemo, useState } from 'react';

import {
  BalancerPoolTokenABI,
  StakingABI,
  UniswapStakedContractABI,
  vmtaABI,
} from '@frontend/shared-constants';
import { CountUp, Dialog } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import { alpha, Button, Skeleton, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount, useContractReads } from 'wagmi';

import { ContractHeader } from './ContractHeader';

import type { LegacyPool } from '@frontend/lts-constants';
import type { StackProps } from '@mui/material';

export type LegacyPoolCardProps = {
  contract: LegacyPool;
} & StackProps;

export const LegacyPoolCard = ({ contract, ...rest }: LegacyPoolCardProps) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const { address: account, isConnected } = useAccount();

  const { data: uniContract, isLoading: balLoading } = useContractReads({
    contracts: [
      {
        address: contract.address,
        abi: StakingABI,
        functionName: 'stakingToken',
      },
      {
        address: contract.address,
        abi: contract.poolType === 'vmta' ? vmtaABI : StakingABI,
        functionName:
          contract.poolType === 'vmta' ? 'staticBalanceOf' : 'balanceOf',
        args: [account],
      },
    ],
    enabled: isConnected,
  });
  const abi =
    contract.poolType === 'uni'
      ? UniswapStakedContractABI
      : BalancerPoolTokenABI;
  const { data: stakedToken, isLoading: staLoading } = useContractReads({
    contracts: [
      {
        address: uniContract?.[0],
        abi,
        functionName: 'name',
      },
      {
        address: uniContract?.[0],
        abi,
        functionName: 'decimals',
      },
      {
        address: uniContract?.[0],
        abi,
        functionName: 'symbol',
      },
    ],
    enabled: !!uniContract?.[0],
  });
  const balance = useMemo(() => {
    if (!uniContract?.[1] || !stakedToken?.[1] || !stakedToken?.[2])
      return BigDecimal.ZERO;

    return new BigDecimal(uniContract[1], stakedToken[1]);
  }, [stakedToken, uniContract]);

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
          <Typography variant="value4">
            {balLoading || staLoading ? (
              <Skeleton width={60} />
            ) : (
              <CountUp
                variant="value4"
                end={balance.simple}
                suffix={stakedToken?.[2]}
              />
            )}
          </Typography>
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
          <Stack>
            <Typography>
              {intl.formatMessage({
                defaultMessage: 'Exit with ETH',
                id: 'WYr7Hj',
              })}
            </Typography>
          </Stack>
        }
        actions={(onClose) => (
          <>
            <Button color="secondary" onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
            <Button onClick={onClose}>
              {intl.formatMessage({
                defaultMessage: 'Close Position',
                id: '9R+8FN',
              })}
            </Button>
          </>
        )}
      />
    </>
  );
};
