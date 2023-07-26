// import { useIsDhedgePool } from '@dhedge/core-ui-kit/hooks/pool';
import { dHEDGEDappLink } from '@frontend/shared-constants';
import { DHEDGEProtocol } from '@frontend/shared-icons';
import { AddressLabel, TokenIconRevamp } from '@frontend/shared-ui';
import { Grid, Link, Stack, Typography } from '@mui/material';

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
  // const isDhedgePool = useIsDhedgePool({ address: tokenAddress, chainId });
  const isDhedgePool = true; // TODO: add useIsDhedgePool after core-ui-kit-update

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
              {tokenName} is a dHEDGE vault. Visit dHEDGE to check its
              underlying assets and strategy.
            </Typography>
            <Link
              href={`${dHEDGEDappLink}/vault/${tokenAddress}`}
              target="_blank"
              rel="noreferrer"
              sx={{ cursor: 'pointer', verticalAlign: 'bottom', mt: 0.5 }}
            >
              View on
              <DHEDGEProtocol sx={{ width: 90, height: 18, ml: 1 }} />
            </Link>
          </>
        )}
      </Stack>
    </Grid>
  );
};
