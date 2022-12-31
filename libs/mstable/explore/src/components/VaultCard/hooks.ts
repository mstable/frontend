import { useCallback, useMemo } from 'react';

import { useDataSource } from '@frontend/mstable-data-access';
import { usePrices } from '@frontend/shared-prices';
import { BigDecimal } from '@frontend/shared-utils';
import { useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from '@tanstack/react-location';
import { constants } from 'ethers';
import { useIntl } from 'react-intl';
import { erc20ABI, erc4626ABI, useContractRead } from 'wagmi';

import { useChartData } from '../../hooks';
import { useMetavaultQuery } from '../../queries.generated';

import type { HexAddress } from '@frontend/shared-utils';
import type { TypographyProps } from '@mui/material';

import type { VaultCardProps } from './types';

export const useVaultCardProps = ({
  metavault,
  to,
  onClick,
}: VaultCardProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { currency } = usePrices();
  const dataSource = useDataSource();
  const { data, isLoading } = useMetavaultQuery(dataSource, {
    id: metavault.address,
    firstBlock: metavault.firstBlock,
  });
  const chartData = useChartData(metavault.address);
  const { data: asset } = useContractRead({
    address: metavault.address,
    abi: erc4626ABI,
    functionName: 'asset',
  });
  const { data: assetDecimal, isLoading: assetLoading } = useContractRead({
    address: asset as HexAddress,
    abi: erc20ABI,
    functionName: 'decimals',
  });

  const tagProps: TypographyProps = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'medium',
    fontSize: 12,
    px: 1,
    height: 20,
    noWrap: true,
    bgcolor: (theme) => theme.palette.background.highlight,
    borderRadius: 2,
  };

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(metavault.id);
    }
    if (to) {
      navigate({ to });
    }
  }, [metavault.id, navigate, onClick, to]);

  const sharePriceLabel = useMemo(
    () => intl.formatMessage({ defaultMessage: 'Share price', id: 'YC/ZXg' }),
    [intl],
  );
  const sharePriceHint = useMemo(
    () =>
      intl.formatMessage({
        defaultMessage:
          'The current price of 1 share. Return is represented as a increase in share price value.',
        id: 'ULHfQE',
      }),
    [intl],
  );
  const sharePrice = useMemo(
    () =>
      Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency,
      }).format(data?.vault?.assetPerShare ?? 0),
    [currency, data?.vault?.assetPerShare],
  );
  const roiLabel = useMemo(
    () => intl.formatMessage({ defaultMessage: 'ROI', id: 'P8Xs51' }),
    [intl],
  );
  const roiHint = useMemo(
    () =>
      intl.formatMessage({
        defaultMessage: 'Return on investment since Vault inception.',
        id: 'zKtTJT',
      }),
    [intl],
  );
  const roi = useMemo(
    () =>
      Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
      }).format(
        data?.vault?.assetPerShare /
          (data?.vault?.first?.[0]?.assetPerShare ?? 1) -
          1 ?? 0,
      ),
    [data?.vault?.assetPerShare, data?.vault?.first],
  );
  const tvlLabel = useMemo(
    () => intl.formatMessage({ defaultMessage: 'TVL', id: 'SKB/G9' }),
    [intl],
  );
  const tvlHint = useMemo(
    () =>
      intl.formatMessage({
        defaultMessage: 'Total Value Locked in vault',
        id: 'PxG1Yq',
      }),
    [intl],
  );
  const tvl = useMemo(
    () =>
      Intl.NumberFormat('en-US', { notation: 'compact' }).format(
        new BigDecimal(
          data?.vault?.totalAssets ?? constants.Zero,
          assetDecimal ?? 18,
        ).simple,
      ),
    [assetDecimal, data?.vault?.totalAssets],
  );

  return {
    intl,
    isMobile,
    isLoading,
    chartData,
    assetLoading,
    handleClick,
    tagProps,
    sharePriceLabel,
    sharePriceHint,
    sharePrice,
    roiLabel,
    roiHint,
    roi,
    tvlLabel,
    tvlHint,
    tvl,
  };
};
