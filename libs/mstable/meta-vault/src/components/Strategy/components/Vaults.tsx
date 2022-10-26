import { AddressLabel } from '@frontend/shared-ui';
import { BasicVaultABI } from '@mstable/metavaults-web';
import { Grid, Stack, Typography } from '@mui/material';
import { useContractRead, useNetwork } from 'wagmi';

import { useMetavault } from '../../../state';

import type { Vault } from '@frontend/shared-constants';
import type { StackProps } from '@mui/material';

type VaultCardProps = Omit<Vault, 'decimals'> & StackProps;

const VaultCard = ({ address, name, ...rest }: VaultCardProps) => {
  const { chain } = useNetwork();
  const { data } = useContractRead({
    address,
    abi: BasicVaultABI,
    functionName: 'name',
  });

  return (
    <Stack
      direction="column"
      {...rest}
      sx={{
        borderRadius: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        padding: 2,
        ...rest?.sx,
      }}
    >
      <Typography variant="h5" gutterBottom noWrap>
        {data as string}
      </Typography>
      <Typography noWrap sx={{ typography: 'subtitle2', pb: 1 }}>
        {name}
      </Typography>
      <AddressLabel
        small
        address={address}
        link
        blockExplorerUrl={chain?.blockExplorers?.etherscan?.url}
        sx={{ maxWidth: 120 }}
      />
    </Stack>
  );
};

export const Vaults = (props: StackProps) => {
  const {
    metavault: { vaults },
  } = useMetavault();

  return (
    <Stack {...props}>
      <Grid container spacing={2}>
        {vaults.map(({ address, name }) => (
          <Grid item key={`${address}-${name}`} xs={12} sm={6} zeroMinWidth>
            <VaultCard address={address} name={name} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
