import {
  legacyPools,
  metavaults,
  pools,
  saves,
  vaults,
} from '@frontend/lts-constants';
import { Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useNetwork } from 'wagmi';

import { LegacyPoolCard } from './LegacyPoolCard';
import { MetavaultCard } from './MetavaultCard';
import { PoolCard } from './PoolCard';
import { SaveCard } from './SaveCard';
import { VaultCard } from './VaultCard';

import type { ContractType } from '@frontend/lts-constants';
import type { StackProps } from '@mui/material';

export type ContractListProps = {
  contractType: ContractType;
} & StackProps;

export const ContractList = ({ contractType, ...rest }: ContractListProps) => {
  const { chain } = useNetwork();
  const sas = saves[chain?.id] ?? [];
  const pos = pools[chain?.id] ?? [];
  const vas = vaults[chain?.id] ?? [];
  const lps = legacyPools[chain?.id] ?? [];
  const mvs = metavaults[chain?.id] ?? [];

  return (
    <Stack {...rest}>
      <Grid2 container rowSpacing={2} columnSpacing={2}>
        {contractType === 'save' &&
          sas.map((c) => (
            <Grid2 xs={12} sm={6} xl={4} key={c.address}>
              <SaveCard contract={c} />
            </Grid2>
          ))}
        {contractType === 'pool' &&
          pos.map((c) => (
            <Grid2 xs={12} sm={6} xl={4} key={c.address}>
              <PoolCard contract={c} />
            </Grid2>
          ))}
        {contractType === 'vault' &&
          vas.map((c) => (
            <Grid2 xs={12} sm={6} xl={4} key={c.address}>
              <VaultCard contract={c} />
            </Grid2>
          ))}
        {contractType === 'legacypool' &&
          lps.map((c) => (
            <Grid2 xs={12} sm={6} xl={4} key={c.address}>
              <LegacyPoolCard contract={c} />
            </Grid2>
          ))}
        {contractType === 'metavault' &&
          mvs.map((c) => (
            <Grid2 xs={12} md={6} key={c.address}>
              <MetavaultCard contract={c} />
            </Grid2>
          ))}
      </Grid2>
    </Stack>
  );
};
