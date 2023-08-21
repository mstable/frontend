import { formatToUsd } from '@dhedge/core-ui-kit/utils';
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
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';

import { useFlatcoin } from '../../../state';
import { CloseLeveragePositionModal } from './CloseLeveragePositionModal';

import type { StackProps } from '@mui/material';
import type { FC } from 'react';

import type { LeveragedPosition } from '../../../types';

const PositionsTableRow: FC<{ position: LeveragedPosition }> = ({
  position,
}) => {
  const {
    tokens: { collateral },
  } = useFlatcoin();
  const { marginDeposited, leverage, entryPrice, profitLoss } = position;
  const marginDepositedInUsd = new BigNumber(marginDeposited)
    .multipliedBy(entryPrice)
    .toNumber();
  const profitLossInUsd = new BigNumber(profitLoss)
    .multipliedBy(collateral.price)
    .toNumber();
  const isPositiveProfit = +profitLoss > 0;
  return (
    <TableRow>
      <TableCell>
        <Typography variant="value4">
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {formatNumberToLimitedDecimals(marginDeposited, 4)}{' '}
            <TokenIconRevamp
              sx={{ width: 12, height: 12, ml: 0.5 }}
              symbols={[collateral.symbol]}
            />{' '}
            {collateral.symbol}
          </Stack>
        </Typography>
        <Typography variant="value5" color="text.secondary">
          ≈{formatToUsd({ value: marginDepositedInUsd })}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="value4">
          {formatNumberToLimitedDecimals(leverage, 2)}X
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="value4">
          {formatToUsd({ value: +entryPrice })}
        </Typography>
      </TableCell>
      <TableCell>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography
            variant="value4"
            color={
              profitLoss !== '0'
                ? isPositiveProfit
                  ? 'success.main'
                  : 'error.main'
                : 'text.secondary'
            }
          >
            {isPositiveProfit && '+'}
            {formatNumberToLimitedDecimals(profitLoss, 4)}{' '}
          </Typography>
          <TokenIconRevamp
            sx={{ width: 12, height: 12, ml: 0.5 }}
            symbols={[collateral.symbol]}
          />
          {collateral.symbol}
        </Stack>
        <Typography variant="value5" color="text.secondary">
          ≈{formatToUsd({ value: profitLossInUsd })}
        </Typography>
      </TableCell>
      <TableCell>
        <CloseLeveragePositionModal position={position} sx={{ minWidth: 92 }} />
      </TableCell>
    </TableRow>
  );
};

export const LeveragePositions = (props: StackProps) => {
  const intl = useIntl();
  const { leveragedPositions } = useFlatcoin();

  if (!leveragedPositions.length) return null;

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      width={1}
      height={1}
      {...props}
    >
      <Typography variant="h3" pb={2}>
        {intl.formatMessage({
          defaultMessage: 'Leveraged Positions',
          id: 'AlCWDq',
        })}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {intl.formatMessage({
                  defaultMessage: 'Deposited',
                  id: 'LjNvmm',
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
            </TableRow>
          </TableHead>
          <TableBody>
            {leveragedPositions.map((position) => (
              <PositionsTableRow
                position={position}
                key={position.positionId}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
