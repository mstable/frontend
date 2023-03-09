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
