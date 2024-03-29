import { useEffect, useState } from 'react';

import { useDataSource } from '@frontend/mstable-data-access';
import { useIsMobile } from '@frontend/shared-hooks';
import {
  OpenAccountModalButton,
  useGasFee,
  useGetNativePrice,
  usePrices,
} from '@frontend/shared-providers';
import {
  BigDecimalInput,
  Dialog,
  InfoTooltip,
  TokenInput,
} from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-location';
import produce from 'immer';
import { not } from 'ramda';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useMetavaultQuery } from '../../../queries.generated';
import { useMetavault } from '../../../state';
import { GasImpact } from './GasImpact';

import type { GasPriceConfig } from '@frontend/shared-providers';

import type { MvRoute } from '../../../types';

export const YieldCalculatorDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const intl = useIntl();
  const isMobile = useIsMobile();
  const navigate = useNavigate<MvRoute>();
  const {
    assetBalance,
    metavault: { asset, address, firstBlock, decimals, symbol, gases },
  } = useMetavault();
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState<BigDecimal>();
  const [apy, setApy] = useState<string>();
  const [duration, setDuration] = useState<BigDecimal>(BigDecimal.ONE);
  const [durationUnit, setDurationUnit] = useState(365);
  const [gasPriceConfig, setGasPriceConfig] =
    useState<GasPriceConfig>('average');
  const feeData = useGasFee();
  const { currency } = usePrices();
  const { data: price } = useGetNativePrice();

  const dataSource = useDataSource();
  const { data } = useMetavaultQuery(dataSource, { id: address, firstBlock });
  useEffect(() => {
    if (data?.vault?.apy) {
      setApy(
        Intl.NumberFormat('en-US', {
          maximumFractionDigits: 2,
        }).format(Number(data?.vault?.apy) * 100),
      );
    }
  }, [data?.vault?.apy, intl]);

  const depositGasFee =
    (price * (gases?.deposit || 0) * Number(feeData[gasPriceConfig])) / 10e9;

  const withdrawlGasFee =
    (price * (gases?.withdraw || 0) * Number(feeData[gasPriceConfig])) / 10e9;

  const totalValue =
    (amount?.simple || 0) *
    (1 + (Number(apy) || 0) / 100) **
      (((duration?.simple || 0) * durationUnit) / 365);

  const profitOrLoss = totalValue - (amount?.simple || 0);

  const [isDepositGasFeeSelected, setIsDepositGasFeeSelected] = useState(false);
  const [isWithdrawalGasFeeSelected, setIsWithdrawalGasFeeSelected] =
    useState(false);

  const totalGasFee =
    (isDepositGasFeeSelected ? depositGasFee : 0) +
    (isWithdrawalGasFeeSelected ? withdrawlGasFee : 0);

  const daysTillProfitable =
    (Math.log10((totalGasFee + (amount?.simple || 0)) / (amount?.simple || 0)) *
      365) /
    Math.log10(1 + (Number(apy) || 0) / 100);

  const handleDeposit = () => {
    navigate({
      replace: true,
      search: produce((draft) => {
        draft.input = {
          amount: amount.simple,
          operation: 'deposit',
        };
      }),
    });
    onClose();
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={onClose}
      title={intl.formatMessage({
        defaultMessage: 'Yield Calculator',
        id: 'CGcoFj',
      })}
      content={
        <>
          <Box
            p={isMobile ? undefined : 2}
            pt={2}
            border={
              isMobile
                ? undefined
                : (theme) => `1px solid ${theme.palette.divider}`
            }
            borderRadius={1}
            mb={3}
          >
            <TokenInput
              amount={amount}
              token={asset}
              max={assetBalance}
              label={intl.formatMessage({
                defaultMessage: 'Enter Amount',
                id: 'byXXyV',
              })}
              onChange={setAmount}
              placeholder="0.00"
              isConnected={isConnected}
              hideBottomRow={!isConnected}
            />
            <Divider sx={{ my: 2 }} />
            <Stack
              direction={isMobile ? 'column' : 'row'}
              alignItems={isMobile ? undefined : 'center'}
            >
              <FormControl>
                <InputLabel>
                  {intl.formatMessage({
                    defaultMessage: 'Projected APY (%)',
                    id: '2M9vCZ',
                  })}
                </InputLabel>
                <InputBase
                  placeholder="0"
                  value={apy}
                  onChange={(e) => setApy(e.target.value)}
                  inputMode="numeric"
                  componentsProps={{
                    input: {
                      pattern: '[0-9]*(.[0-9]*)?',
                    },
                  }}
                  sx={{ typography: 'value1' }}
                />
              </FormControl>
              {isMobile ? (
                <Divider sx={{ my: 2 }} />
              ) : (
                <Divider sx={{ mx: 2 }} orientation="vertical" />
              )}
              <Stack direction="row" alignItems="center">
                <FormControl>
                  <InputLabel>
                    {intl.formatMessage({
                      defaultMessage: 'Duration',
                      id: 'IuFETn',
                    })}
                  </InputLabel>
                  <BigDecimalInput
                    placeholder="0"
                    value={duration}
                    onChange={setDuration}
                    decimals={18}
                  />
                </FormControl>

                <Select
                  value={durationUnit}
                  onChange={(e) => {
                    setDurationUnit(e.target.value as number);
                  }}
                  sx={{ mt: 2.5, minWidth: 100 }}
                >
                  <MenuItem value={365}>
                    {intl.formatMessage({
                      defaultMessage: 'Years',
                      id: 'Jr5tMR',
                    })}
                  </MenuItem>
                  <MenuItem value={30}>
                    {intl.formatMessage({
                      defaultMessage: 'Months',
                      id: 'AxDOiG',
                    })}
                  </MenuItem>
                  <MenuItem value={1}>
                    {intl.formatMessage({
                      defaultMessage: 'Days',
                      id: 'd8EqQY',
                    })}
                  </MenuItem>
                </Select>
              </Stack>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Box display="flex" alignItems="center">
                <Typography variant="label2" color="text.secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Gas Fee Estimation',
                    id: 'dD8CJD',
                  })}
                </Typography>
                <InfoTooltip
                  sx={{ ml: 1 }}
                  display="flex"
                  weight="bold"
                  label={intl.formatMessage({
                    defaultMessage:
                      'Gas fee estimation is based on the current gas price and average gas used',
                    id: 'erCS/d',
                  })}
                  variant="exclamation"
                  color="text.secondary"
                  size={16}
                />
              </Box>
              <Select
                value={gasPriceConfig}
                onChange={(e) => {
                  setGasPriceConfig(e.target.value as GasPriceConfig);
                }}
                disableUnderline
              >
                <MenuItem value="slow">
                  {intl.formatMessage(
                    { defaultMessage: 'Slow - {value} GWEI', id: 'BnptNt' },
                    { value: feeData.slow },
                  )}
                </MenuItem>
                <MenuItem value="average">
                  {intl.formatMessage(
                    { defaultMessage: 'Average - {value} GWEI', id: 'ZefNbE' },
                    { value: feeData.average },
                  )}
                </MenuItem>
                <MenuItem value="fast">
                  {intl.formatMessage(
                    { defaultMessage: 'Fast - {value} GWEI', id: '0mHzVQ' },
                    { value: feeData.fast },
                  )}
                </MenuItem>
              </Select>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                checked={isDepositGasFeeSelected}
                onChange={() => setIsDepositGasFeeSelected(not)}
                control={<Checkbox size="small" />}
                label={intl.formatMessage({
                  defaultMessage: 'Deposit Gas',
                  id: 'b+LlHJ',
                })}
                componentsProps={{
                  typography: { variant: 'label2', color: 'text.secondary' },
                }}
              />
              <Typography variant="value5">
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency,
                }).format(depositGasFee)}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                checked={isWithdrawalGasFeeSelected}
                onChange={() => setIsWithdrawalGasFeeSelected(not)}
                control={<Checkbox size="small" />}
                label={intl.formatMessage({
                  defaultMessage: 'Withdrawal Gas',
                  id: 'hRuz7F',
                })}
                componentsProps={{
                  typography: { variant: 'label2', color: 'text.secondary' },
                }}
              />
              <Typography variant="value5">
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency,
                }).format(withdrawlGasFee)}
              </Typography>
            </Box>
          </Box>
          <Typography variant="buttonLarge">
            {intl.formatMessage({
              defaultMessage: 'Return Projection',
              id: 'tH0obk',
            })}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Typography variant="label2" color="text.secondary">
              {intl.formatMessage({
                defaultMessage: 'Profit/Loss',
                id: 'rfzzi6',
              })}
            </Typography>
            <Typography
              variant="value5"
              color={(theme) => theme.palette.success.main}
            >
              {Intl.NumberFormat('en-US').format(profitOrLoss)}&nbsp;
              {asset.symbol || ''}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Typography variant="label2" color="text.secondary">
              {intl.formatMessage({
                defaultMessage: 'Total Value',
                id: 'MoJx/h',
              })}
            </Typography>
            <Typography variant="value5">
              {Intl.NumberFormat('en-US').format(totalValue)}&nbsp;
              {asset.symbol || ''}
            </Typography>
          </Box>
          {/* TODO: calculate PnL in dollar value */}
          <GasImpact
            profitOrLoss={profitOrLoss}
            gasFee={totalGasFee}
            daysTillProfitable={daysTillProfitable}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Typography variant="label2" color="text.secondary">
              {intl.formatMessage({
                defaultMessage: 'Net Value',
                id: 'N+SKIs',
              })}
            </Typography>
            <Typography
              color={(theme) =>
                totalGasFee > profitOrLoss
                  ? theme.palette.error.main
                  : theme.palette.success.main
              }
              variant="value5"
            >
              {`${Intl.NumberFormat('en-US').format(
                totalValue - totalGasFee,
              )}&nbsp;${asset.symbol ?? ''}`}
            </Typography>
          </Box>
          {isMobile && (
            <Stack direction="row" mt={5} spacing={1}>
              <Button
                variant="outlined"
                onClick={onClose}
                fullWidth
                color="secondary"
              >
                {intl.formatMessage({ defaultMessage: 'Close', id: 'rbrahO' })}
              </Button>
              {isConnected ? (
                <Button color="secondary" onClick={handleDeposit} fullWidth>
                  {intl.formatMessage({
                    defaultMessage: 'Make a Deposit',
                    id: 'MMRXim',
                  })}
                </Button>
              ) : (
                <OpenAccountModalButton
                  fullWidth
                  variant="contained"
                  color="primary"
                />
              )}
            </Stack>
          )}
        </>
      }
      actions={
        isMobile ? undefined : (
          <>
            <Button variant="text" onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Close', id: 'rbrahO' })}
            </Button>
            {isConnected ? (
              <Button color="secondary" onClick={handleDeposit}>
                {intl.formatMessage({
                  defaultMessage: 'Make a Deposit',
                  id: 'MMRXim',
                })}
              </Button>
            ) : (
              <OpenAccountModalButton variant="contained" color="primary" />
            )}
          </>
        )
      }
    />
  );
};
