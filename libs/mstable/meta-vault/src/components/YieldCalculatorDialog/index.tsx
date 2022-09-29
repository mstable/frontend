import { useState } from 'react';

import { BigDecimalInput, Dialog, TokenInput } from '@frontend/shared-ui';
import {
  Box,
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
import { useAccount, useFeeData } from 'wagmi';

import { useMetavault } from '../../state';

import type { BigDecimal } from '@frontend/shared-utils';

export const YieldCalculatorDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const intl = useIntl();
  const { assetToken, assetBalance } = useMetavault();
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState<BigDecimal>();
  const [apy, setApy] = useState<BigDecimal>();
  const [duration, setDuration] = useState<BigDecimal>();
  const [durationUnit, setDurationUnit] = useState(365);
  const { data: feeData } = useFeeData({ formatUnits: 'gwei' });

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={onClose}
      title={intl.formatMessage({ defaultMessage: 'Yield Calculator' })}
      content={
        <Box
          p={2}
          border={(theme) => `1px solid ${theme.palette.divider}`}
          borderRadius={1}
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
              <BigDecimalInput placeholder="0" value={apy} onChange={setApy} />
            </FormControl>
            <Divider sx={{ mx: 2 }} orientation="vertical" />
            <FormControl>
              <InputLabel>
                {intl.formatMessage({ defaultMessage: 'Duration' })}
              </InputLabel>
              <BigDecimalInput
                placeholder="0"
                value={apy}
                onChange={setApy}
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
            <Select value={feeData?.formatted?.gasPrice} disableUnderline>
              <MenuItem value={feeData?.formatted?.gasPrice}>
                {intl.formatMessage(
                  { defaultMessage: 'Average - {value} GWEI' },
                  { value: feeData?.formatted?.gasPrice },
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
              control={<Checkbox size="small" />}
              label={intl.formatMessage({ defaultMessage: 'Deposit Gas' })}
              componentsProps={{
                typography: { variant: 'label2', color: 'text.secondary' },
              }}
            />
            <Typography variant="value5">$20.12</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={intl.formatMessage({ defaultMessage: 'Withdrawal Gas' })}
              componentsProps={{
                typography: { variant: 'label2', color: 'text.secondary' },
              }}
            />
            <Typography variant="value5">$20.12</Typography>
          </Box>
        </Box>
      }
    />
  );
};
