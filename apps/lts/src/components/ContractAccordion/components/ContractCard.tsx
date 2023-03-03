import { AddressLabel } from '@frontend/shared-ui';
import { Stack, Typography } from '@mui/material';
import { useBalance } from 'wagmi';

import type { Contract } from '@frontend/lts-constants';
import type { StackProps } from '@mui/material';

export type ContractCardProps = {
  contract: Contract;
} & StackProps;

export const ContractCard = ({ contract, ...rest }: ContractCardProps) => {
  const { data } = useBalance({ address: contract.address, watch: true });

  return (
    <Stack {...rest}>
      <Typography variant="value1">
        {data?.formatted}&nbsp;
        {data?.symbol}
      </Typography>
      <AddressLabel address={contract.address} />
    </Stack>
  );
};
