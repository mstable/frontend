import { useMemo } from 'react';

import { feederPools } from '@frontend/lts-constants';
import { Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useNetwork } from 'wagmi';

import { ContractCard } from './ContractCard';

import type { ContractType } from '@frontend/lts-constants';
import type { StackProps } from '@mui/material';

export type ContractListProps = {
  contractType: ContractType;
} & StackProps;

export const ContractList = ({ contractType, ...rest }: ContractListProps) => {
  const { chain } = useNetwork();
  const contracts = useMemo(() => {
    if (!chain?.id) return [];
    switch (contractType) {
      case 'feederpool':
        return feederPools[chain.id];
      default:
        return [];
    }
  }, [chain?.id, contractType]);

  return (
    <Stack {...rest}>
      <Grid2 container rowSpacing={2} columnSpacing={2}>
        {contracts.map((c) => (
          <Grid2 xs={12} sm={6} lg={4} key={c.address}>
            <ContractCard contract={c} />
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
};
