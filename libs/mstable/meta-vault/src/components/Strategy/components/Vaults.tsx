import { AddressLabel } from '@frontend/shared-ui';
import { Grid, Stack, Typography, useTheme } from '@mui/material';
import { Sparkle } from 'phosphor-react';
import { erc20ABI, useContractRead, useNetwork } from 'wagmi';

import { useMetavault } from '../../../state';

import type { Vault } from '@frontend/shared-constants';
import type { StackProps } from '@mui/material';

type VaultCardProps = { featured: boolean } & Omit<Vault, 'decimals'> &
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
      <Stack direction="column">
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

export const Vaults = (props: StackProps) => {
  const {
    metavault: { vaults },
  } = useMetavault();

  return (
    <Stack {...props}>
      <Grid container spacing={2}>
        {vaults.map(({ address, name }, idx) => (
          <Grid
            item
            key={`${address}-${name}`}
            xs={12}
            {...(idx > 0 && { sm: 6 })}
            zeroMinWidth
          >
            <VaultCard address={address} name={name} featured={idx === 0} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
