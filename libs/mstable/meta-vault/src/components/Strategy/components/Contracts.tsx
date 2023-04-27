import { AddressLabel } from '@frontend/shared-ui';
import { Grid, Stack, Typography, useTheme } from '@mui/material';
import { Sparkle } from 'phosphor-react';
import { useNetwork } from 'wagmi';

import { useMetavault } from '../../../state';

import type { Contract } from '@frontend/shared-constants';
import type { StackProps } from '@mui/material';

type VaultCardProps = { featured?: boolean; contract: Contract } & StackProps;

const VaultCard = ({
  contract: { name, symbol, address },
  featured,
  ...rest
}: VaultCardProps) => {
  const theme = useTheme();
  const { chain } = useNetwork();

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
          {name}
        </Typography>
        <Typography noWrap sx={{ typography: 'subtitle2', pb: 1 }}>
          {symbol}
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
  const { metavault } = useMetavault();

  return (
    <Stack {...props}>
      <Grid container spacing={2}>
        <Grid item xs={12} zeroMinWidth>
          <VaultCard contract={metavault} featured />
        </Grid>
        <Grid item xs={12} sm={6} zeroMinWidth>
          <VaultCard contract={metavault.proxy} />
        </Grid>
        {metavault.underlyings.map((v) => (
          <Grid item key={`${v.address}-${v.name}`} xs={12} sm={6} zeroMinWidth>
            <VaultCard contract={v} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
