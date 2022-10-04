import { useEffect, useState } from 'react';

import { useDataSource } from '@frontend/shared-data-access';
import { useGasFee } from '@frontend/shared-gas-fee';
import { usePrices } from '@frontend/shared-prices';
import { BigDecimalInput, Dialog, TokenInput } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useChangeOperation, useSetAmount } from '../../hooks';
import { useMetavaultQuery } from '../../queries.generated';
import { useMetavault } from '../../state';
import { GasImpact } from './components/GasImpact';

import type { GasPriceConfig } from '@frontend/shared-gas-fee';

export const YieldCalculatorDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const intl = useIntl();
  const changeOperation = useChangeOperation();
  const setOperationAmount = useSetAmount();
  const { assetToken, assetBalance, metavault } = useMetavault();
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState<BigDecimal>();
  const [apy, setApy] = useState<BigDecimal>();
  const [duration, setDuration] = useState<BigDecimal>();
  const [durationUnit, setDurationUnit] = useState(365);
  const [gasPriceConfig, setGasPriceConfig] =
    useState<GasPriceConfig>('average');
  const feeData = useGasFee();
  const { price, currency } = usePrices();

  const dataSource = useDataSource();
  const { data } = useMetavaultQuery(
    dataSource,
    { id: metavault.address },
    { enabled: !!metavault.address },
  );
  useEffect(() => {
    if (data?.vault?.apy) {
      setApy(new BigDecimal(data?.vault?.apy));
    }
  }, [data?.vault?.apy]);

  const depositGasFee =
    (price *
      (metavault.gases?.deposit || 0) *
      Number(feeData[gasPriceConfig])) /
    10e9;

  const withdrawlGasFee =
    (price *
      (metavault.gases?.withdraw || 0) *
      Number(feeData[gasPriceConfig])) /
    10e9;

  const totalValue =
    (amount?.simple || 0) *
    (1 + (apy?.simple || 0) / 100) **
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
    Math.log10(1 + (apy?.simple || 0) / 100);

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={onClose}
      title={intl.formatMessage({ defaultMessage: 'Yield Calculator' })}
      content={
        <>
          <Box
            p={2}
            border={(theme) => `1px solid ${theme.palette.divider}`}
            borderRadius={1}
            mb={3}
          >
            <TokenInput
              amount={amount}
              token={assetToken}
              max={assetBalance}
              maxLabel={intl.formatMessage({ defaultMessage: 'Balance' })}
              label={intl.formatMessage({ defaultMessage: 'Enter Amount' })}
              onChange={setAmount}
              placeholder="0.00"
              isConnected={isConnected}
            />
            <Divider sx={{ my: 2 }} />
            <Box display="flex">
              <FormControl>
                <InputLabel>
                  {intl.formatMessage({ defaultMessage: 'Projected APY (%)' })}
                </InputLabel>
                <BigDecimalInput
                  placeholder="0"
                  value={apy}
                  onChange={setApy}
                />
              </FormControl>
              <Divider sx={{ mx: 2 }} orientation="vertical" />
              <FormControl>
                <InputLabel>
                  {intl.formatMessage({ defaultMessage: 'Duration' })}
                </InputLabel>
                <BigDecimalInput
                  placeholder="0"
                  value={duration}
                  onChange={setDuration}
                  endAdornment={
                    <Select
                      value={durationUnit}
                      onChange={(e) => {
                        setDurationUnit(e.target.value as number);
                      }}
                    >
                      <MenuItem value={365}>
                        {intl.formatMessage({ defaultMessage: 'Years' })}
                      </MenuItem>
                      <MenuItem value={30}>
                        {intl.formatMessage({ defaultMessage: 'Months' })}
                      </MenuItem>
                      <MenuItem value={1}>
                        {intl.formatMessage({ defaultMessage: 'Days' })}
                      </MenuItem>
                    </Select>
                  }
                />
              </FormControl>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="label2" color="text.secondary">
                {intl.formatMessage({ defaultMessage: 'Gas Fee Estimation' })}
              </Typography>
              <Select
                value={gasPriceConfig}
                onChange={(e) => {
                  setGasPriceConfig(e.target.value as GasPriceConfig);
                }}
                disableUnderline
              >
                <MenuItem value="slow">
                  {intl.formatMessage(
                    { defaultMessage: 'Slow - {value} GWEI' },
                    { value: feeData.slow },
                  )}
                </MenuItem>
                <MenuItem value="average">
                  {intl.formatMessage(
                    { defaultMessage: 'Average - {value} GWEI' },
                    { value: feeData.average },
                  )}
                </MenuItem>
                <MenuItem value="fast">
                  {intl.formatMessage(
                    { defaultMessage: 'Fast - {value} GWEI' },
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
                onChange={() => setIsDepositGasFeeSelected((i) => !i)}
                control={<Checkbox size="small" />}
                label={intl.formatMessage({ defaultMessage: 'Deposit Gas' })}
                componentsProps={{
                  typography: { variant: 'label2', color: 'text.secondary' },
                }}
              />
              <Typography variant="value5">
                {intl.formatNumber(depositGasFee, {
                  style: 'currency',
                  currency,
                })}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                checked={isWithdrawalGasFeeSelected}
                onChange={() => setIsWithdrawalGasFeeSelected((i) => !i)}
                control={<Checkbox size="small" />}
                label={intl.formatMessage({ defaultMessage: 'Withdrawal Gas' })}
                componentsProps={{
                  typography: { variant: 'label2', color: 'text.secondary' },
                }}
              />
              <Typography variant="value5">
                {intl.formatNumber(withdrawlGasFee, {
                  style: 'currency',
                  currency,
                })}
              </Typography>
            </Box>
          </Box>
          <Typography variant="buttonLarge">
            {intl.formatMessage({ defaultMessage: 'Return Projection' })}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Typography variant="label2" color="text.secondary">
              {intl.formatMessage({ defaultMessage: 'Profit/Loss' })}
            </Typography>
            <Typography
              variant="value5"
              color={(theme) => theme.palette.success.main}
            >
              {intl.formatNumber(profitOrLoss)} {assetToken?.symbol || ''}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Typography variant="label2" color="text.secondary">
              {intl.formatMessage({ defaultMessage: 'Total Value' })}
            </Typography>
            <Typography variant="value5">
              {intl.formatNumber(totalValue)} {assetToken?.symbol || ''}
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
              {intl.formatMessage({ defaultMessage: 'Net Value' })}
            </Typography>
            <Typography
              color={(theme) =>
                totalGasFee > profitOrLoss
                  ? theme.palette.error.main
                  : theme.palette.success.main
              }
              variant="value5"
            >
              {intl.formatNumber(totalValue - totalGasFee)}{' '}
              {assetToken?.symbol || ''}
            </Typography>
          </Box>
        </>
      }
      actions={
        <>
          <Button variant="text" onClick={onClose}>
            {intl.formatMessage({ defaultMessage: 'Close' })}
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              changeOperation('deposit');
              setOperationAmount(amount);
              onClose();
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Make a Deposit' })}
          </Button>
        </>
      }
    />
  );
};
