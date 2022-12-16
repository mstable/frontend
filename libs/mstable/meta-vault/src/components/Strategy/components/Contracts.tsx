import { AddressLabel, Spinner } from '@frontend/shared-ui';
import { isNilOrEmpty } from '@frontend/shared-utils';
import { Grid, Stack, Typography, useTheme } from '@mui/material';
import { Sparkle } from 'phosphor-react';
import { erc20ABI, useContractRead, useNetwork } from 'wagmi';

import { useMetavault } from '../../../state';

import type { StackProps } from '@mui/material';

import type { Vault } from '../../../types';

type VaultCardProps = { featured?: boolean } & Omit<Vault, 'decimals'> &
  StackProps;

const VaultCard = ({ address, name, featured, ...rest }: VaultCardProps) => {
  const theme = useTheme();
  const { chain } = useNetwork();
  const { data } = useContractRead({
    address,
    abi: erc20ABI,
    functionName: 'name',
  });

  return (
    <Stack
      {...rest}
      direction="row"
      spacing={1}
      sx={{
        borderRadius: 1,
        border: (theme) =>
          `1px solid ${
            featured ? theme.palette.info.main : theme.palette.divider
          }`,
        padding: 2,
        ...rest?.sx,
      }}
    >
      {featured && (
        <Sparkle
          weight="fill"
          width={24}
          height={24}
          color={theme.palette.info.main}
        />
      )}
      <Stack direction="column" overflow="hidden">
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
          blockExplorerUrl={chain?.blockExplorers?.['etherscan']?.url}
          sx={{ maxWidth: 120 }}
        />
      </Stack>
    </Stack>
  );
};

export const Contracts = (props: StackProps) => {
  const { structure, metavault } = useMetavault();

  if (isNilOrEmpty(structure)) return <Spinner />;

  return (
    <Stack {...props}>
      <Grid container spacing={2}>
        <Grid item xs={12} zeroMinWidth>
          <VaultCard
            address={metavault.address}
            name={metavault.name}
            featured
          />
        </Grid>
        <Grid item xs={12} sm={6} zeroMinWidth>
          <VaultCard
            address={structure.proxiedVault.address}
            name={structure.proxiedVault.name}
          />
        </Grid>
        {structure?.underlyingVaults?.map(({ address, name }, idx) => (
          <Grid item key={`${address}-${name}`} xs={12} sm={6} zeroMinWidth>
            <VaultCard address={address} name={name} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
