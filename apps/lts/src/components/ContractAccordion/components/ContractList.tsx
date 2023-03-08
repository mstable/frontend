import { contracts } from '@frontend/lts-constants';
import { Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { propEq } from 'ramda';
import { useNetwork } from 'wagmi';

import { ContractCard } from './ContractCard';

import type { ContractType } from '@frontend/lts-constants';
import type { StackProps } from '@mui/material';

export type ContractListProps = {
  contractType: ContractType;
} & StackProps;

export const ContractList = ({ contractType, ...rest }: ContractListProps) => {
  const { chain } = useNetwork();
  const cons = contracts[chain?.id] ?? [];

  return (
    <Stack {...rest}>
      <Grid2 container rowSpacing={2} columnSpacing={2}>
        {cons.filter(propEq('type', contractType)).map((contract) => (
          <Grid2 xs={12} sm={6} xl={4} key={contract.address}>
            <ContractCard contract={contract} />
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
};
