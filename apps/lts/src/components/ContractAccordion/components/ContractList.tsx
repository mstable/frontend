import { isNilOrEmpty } from '@frontend/shared-utils';
import { Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { ContractCard } from './ContractCard';

import type { StackProps } from '@mui/material';

import type { LTSContract } from '../types';

export type ContractListProps = {
  contracts: LTSContract[];
} & StackProps;

export const ContractList = ({ contracts, ...rest }: ContractListProps) => {
  if (isNilOrEmpty(contracts)) return null;

  return (
    <Stack {...rest}>
      <Grid2 container rowSpacing={2} columnSpacing={2}>
        {contracts.map((contract) => (
          <ContractCard
            xs={12}
            sm={6}
            key={contract.address}
            contract={contract}
          />
        ))}
      </Grid2>
    </Stack>
  );
};
