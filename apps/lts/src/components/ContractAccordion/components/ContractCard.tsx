import { CountUp } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import { alpha, Skeleton, Stack } from '@mui/material';

import { useContractBalance } from '../hooks';
import { ContractHeader } from './ContractHeader';

import type { Contract } from '@frontend/lts-constants';
import type { StackProps } from '@mui/material';

export type ContractCardProps = {
  contract: Contract;
} & StackProps;

export const ContractCard = ({ contract, ...rest }: ContractCardProps) => {
  const { data: bal, isLoading: balLoading } = useContractBalance(contract);

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
              suffix={bal?.symbol}
            />
          )}
        </Stack>
      </Stack>
    </>
  );
};
