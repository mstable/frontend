import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import { DEFAULT_TOKEN_DECIMALS } from '@frontend/shared-constants';
import { TokenIconRevamp } from '@frontend/shared-ui';
import { formatNumberToLimitedDecimals } from '@frontend/shared-utils';
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';

import { useFlatcoin } from '../../../state';
import { CloseLeveragePositionModal } from './CloseLeveragePositionModal';

import type { FC } from 'react';

import type { LeveragedPosition } from '../../../types';

const PositionsTableRow: FC<{ position: LeveragedPosition }> = ({
  position,
}) => {
  const {
    tokens: { collateral },
  } = useFlatcoin();
  const { marginDeposited, leverage, entryPrice, profitLoss } = position;
  const marginDepositedInUsd = marginDeposited.simple * entryPrice.simple;
  const profitLossInUsd = profitLoss.simple * collateral.price.simple;
  const isPositiveProfit = profitLoss.exact.gt(0);
  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography variant="value5">
            {formatNumberToLimitedDecimals(
              marginDeposited.simple,
              DEFAULT_TOKEN_DECIMALS,
            )}
          </Typography>
          <TokenIconRevamp
            sx={{ width: 12, height: 12, ml: 0.5 }}
            symbols={[collateral.symbol]}
          />
          <Typography variant="value5">{collateral.symbol}</Typography>
        </Stack>
        <Typography variant="value6" color="text.secondary">
          ≈{formatToUsd({ value: marginDepositedInUsd })}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="value5">
          {formatNumberToLimitedDecimals(leverage, 2)}X
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="value5">
          {formatToUsd({ value: entryPrice.simple })}
        </Typography>
      </TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography
            variant="value5"
            color={
              !profitLoss.exact.isZero()
                ? isPositiveProfit
                  ? 'success.main'
                  : 'error.main'
                : 'text.secondary'
            }
          >
            {isPositiveProfit && '+'}
            {formatNumberToLimitedDecimals(
              profitLoss.simple,
              DEFAULT_TOKEN_DECIMALS,
            )}{' '}
          </Typography>
          <TokenIconRevamp
            sx={{ width: 12, height: 12, ml: 0.5 }}
            symbols={[collateral.symbol]}
          />
          <Typography variant="value5">{collateral.symbol}</Typography>
        </Stack>
        <Typography variant="value6" color="text.secondary">
          ≈{formatToUsd({ value: profitLossInUsd })}
        </Typography>
      </TableCell>
      <TableCell>
        <CloseLeveragePositionModal position={position} sx={{ minWidth: 92 }} />
      </TableCell>
    </TableRow>
  );
};

export const LeveragePositionsTable: FC = () => {
  const intl = useIntl();
  const { leveragedPositions } = useFlatcoin();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              {intl.formatMessage({
                defaultMessage: 'Margin Deposited',
                id: 'inIeEz',
              })}
            </TableCell>
            <TableCell>
              {intl.formatMessage({
                defaultMessage: 'Leverage',
                id: 'pbpdV6',
              })}
            </TableCell>
            <TableCell>
              {intl.formatMessage({
                defaultMessage: 'Entry Price',
                id: 'Ty3dr6',
              })}
            </TableCell>
            <TableCell>
              {intl.formatMessage({
                defaultMessage: 'Profit/Loss',
                id: 'rfzzi6',
              })}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {leveragedPositions.map((position) => (
            <PositionsTableRow position={position} key={position.positionId} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
