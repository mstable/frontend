import { useIsDhedgePool } from '@dhedge/core-ui-kit/hooks/pool';
import { TOROS_DAPP_LINK } from '@frontend/shared-constants';
import { Toros } from '@frontend/shared-icons';
import { AddressLabel, TokenIconRevamp } from '@frontend/shared-ui';
import { Grid, Link, Stack, Typography, useTheme } from '@mui/material';

import type { ChainId } from '@dhedge/core-ui-kit/types';
import type { FC } from 'react';

import type { useAssetsComposition } from './hooks';

interface AssetItemProps {
  token: ReturnType<typeof useAssetsComposition>[0];
  chainId: ChainId;
  blockExplorerUrl: string;
}

export const TokenItem: FC<AssetItemProps> = ({
  token,
  chainId,
  blockExplorerUrl,
}) => {
  const { tokenAddress, tokenName, asset, percentage } = token;
  const isDhedgePool = useIsDhedgePool({ address: tokenAddress, chainId });
  const theme = useTheme();

  return (
    <Grid item key={`${tokenAddress}-${tokenName}`} xs={6} zeroMinWidth>
      <Stack
        direction="column"
        sx={{
          borderRadius: 1,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          padding: 2,
        }}
      >
        <Stack direction="row" spacing={1}>
          <TokenIconRevamp symbols={asset.iconSymbols} sx={{ mb: 2 }} />
          <Typography variant="h5" gutterBottom noWrap>
            {tokenName}
          </Typography>
        </Stack>
        <AddressLabel
          small
          address={tokenAddress}
          link
          blockExplorerUrl={blockExplorerUrl}
          sx={{ maxWidth: 120 }}
        />
        <Typography variant="h6" gutterBottom noWrap>
          {percentage}
        </Typography>
        {isDhedgePool && (
          <>
            <Typography variant="body2" gutterBottom>
              {tokenName} is a Toros vault. Visit Toros to check its underlying
              assets and strategy.
            </Typography>
            <Link
              href={`${TOROS_DAPP_LINK}/vault/${tokenAddress}`}
              target="_blank"
              rel="noreferrer"
              sx={{
                cursor: 'pointer',
                verticalAlign: 'bottom',
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                columnGap: 1,
              }}
            >
              View on{' '}
              <Toros
                sx={{
                  width: 50,
                  ...(theme.palette.mode === 'dark' && {
                    image: {
                      filter: 'invert(100%)',
                    },
                  }),
                }}
              />
            </Link>
          </>
        )}
      </Stack>
    </Grid>
  );
};
