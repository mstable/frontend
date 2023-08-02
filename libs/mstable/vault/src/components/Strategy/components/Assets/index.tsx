import { YIELD_APP_SUPPORTED_CHAINS } from '@frontend/shared-constants';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useVault } from '../../../../state';
import { useAssetsComposition } from './hooks';
import { TokenItem } from './TokenItem';

import type { StackProps } from '@mui/material';

export const Assets = (props: StackProps) => {
  const intl = useIntl();
  const { config } = useVault();
  const composition = useAssetsComposition();
  const blockExplorerUrl = YIELD_APP_SUPPORTED_CHAINS.find(
    ({ id }) => id === config.chainId,
  )?.blockExplorers?.['etherscan']?.url;

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
          {composition?.map((token) => (
            <TokenItem
              token={token}
              chainId={config.chainId}
              blockExplorerUrl={blockExplorerUrl}
              key={`${token.tokenAddress}-${token.tokenName}`}
            />
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};
