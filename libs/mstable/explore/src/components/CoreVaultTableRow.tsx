import { useMemo } from 'react';

import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import { useFundQuery } from '@frontend/mstable-vault';
import {
  useUserVaultBalance,
  useUserVaultInvestmentInfo,
} from '@frontend/shared-hooks';
import { TokenIconRevamp } from '@frontend/shared-ui';
import { formatNumberToLimitedDecimals } from '@frontend/shared-utils';
import { Stack, TableCell, TableRow, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-location';

import type { PoolConfig } from '@dhedge/core-ui-kit/types';

interface VaultTableRowProps {
  config: PoolConfig;
  to: string;
  isLast?: boolean;
}

export const CoreVaultTableRow = ({
  config,
  to,
  isLast,
}: VaultTableRowProps) => {
  const navigate = useNavigate();
  const { data } = useFundQuery({ address: config.address });
  const { balanceInUsd } = useUserVaultBalance({ address: config.address });
  const { roiInUsd, customRoiInCurrency, customRoiCurrencySymbol } =
    useUserVaultInvestmentInfo({
      address: config.address,
    });

  const apy = useMemo(() => {
    const monthlyApy = data?.fund.apy?.monthly;
    return monthlyApy
      ? `${Math.max(0, monthlyApy).toFixed(monthlyApy > 0 ? 2 : 0)}%`
      : '-';
  }, [data?.fund.apy?.monthly]);

  return (
    <TableRow
      sx={{ cursor: 'pointer', borderBottom: isLast ? 'none' : undefined }}
      hover
      onClick={() => {
        navigate({ to });
      }}
    >
      <TableCell>
        <TokenIconRevamp
          symbols={[config.symbol]}
          sx={{ height: 32, width: 32 }}
        />
      </TableCell>
      <TableCell>
        <Typography variant="value4">{data?.fund.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="value4">
          {formatToUsd({
            value: data?.fund.totalValue ? +data?.fund.totalValue : 0,
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
            normalize: true,
          })}
        </Typography>
      </TableCell>
      <TableCell>
        <Stack direction="row">
          <Typography variant="value4">{apy}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography variant="value4">{balanceInUsd}</Typography>
      </TableCell>
      <TableCell>
        <Stack direction="column">
          <Typography
            variant="value4"
            color={
              roiInUsd === 0
                ? undefined
                : roiInUsd > 0
                ? 'success.main'
                : 'error.main'
            }
          >
            ${roiInUsd}
          </Typography>
          {customRoiInCurrency && (
            <Typography
              variant="value4"
              color={customRoiInCurrency > 0 ? 'success.main' : 'error.main'}
            >
              {customRoiCurrencySymbol}
              {formatNumberToLimitedDecimals(customRoiInCurrency, 4)}
            </Typography>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
};
