import { AddressLabel } from '@frontend/shared-ui';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNetwork } from 'wagmi';

import { useVault } from '../../../state';

import type { StackProps } from '@mui/material';

export const Assets = (props: StackProps) => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const { fund } = useVault();

  return (
    <Stack {...props} direction="column">
      <Typography variant="body2" sx={{ color: 'text.secondary', pb: 2 }}>
        {intl.formatMessage({
          defaultMessage:
            'The following assets are used in this strategy and therefore are exposed (partially) to their risk:',
          id: 'korbaG',
        })}
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {fund?.fundComposition.map(({ tokenAddress, tokenName }) => (
            <Grid item key={`${tokenAddress}-${tokenName}`} xs={6} zeroMinWidth>
              <Stack
                direction="column"
                sx={{
                  borderRadius: 1,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  padding: 2,
                }}
              >
                <Typography variant="h5" gutterBottom noWrap>
                  {tokenName}
                </Typography>
                <AddressLabel
                  small
                  address={tokenAddress}
                  link
                  blockExplorerUrl={chain?.blockExplorers?.['etherscan']?.url}
                  sx={{ maxWidth: 120 }}
                />
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};
