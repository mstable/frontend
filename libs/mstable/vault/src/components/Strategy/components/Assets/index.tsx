import { AddressLabel, TokenIconRevamp } from '@frontend/shared-ui';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNetwork } from 'wagmi';

import { useAssetsComposition } from './hooks';

import type { StackProps } from '@mui/material';

export const Assets = (props: StackProps) => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const composition = useAssetsComposition();

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
          {composition?.map(
            ({ tokenAddress, tokenName, asset, percentage }) => (
              <Grid
                item
                key={`${tokenAddress}-${tokenName}`}
                xs={6}
                zeroMinWidth
              >
                <Stack
                  direction="column"
                  sx={{
                    borderRadius: 1,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    padding: 2,
                  }}
                >
                  <TokenIconRevamp symbols={asset.iconSymbols} sx={{ mb: 2 }} />
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
                  <Typography variant="h6" gutterBottom noWrap>
                    {percentage}
                  </Typography>
                </Stack>
              </Grid>
            ),
          )}
        </Grid>
      </Box>
    </Stack>
  );
};
