import { forwardRef, useEffect, useState } from 'react';

import { removeInsignificantTrailingZeros } from '@frontend/shared-utils';
import {
  Box,
  Collapse,
  Fade,
  FormControl,
  InputBase,
  InputLabel,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import BigNumber from 'bignumber.js';
import { range } from 'ramda';

import { PercentageButton } from '../Buttons';
import { TokenIconRevamp } from '../Icons';
import { TradingTokenBalance } from './TradingTokenBalance';

import type { DynamicTradingToken } from '@dhedge/core-ui-kit/types';
import type { BoxProps, StackProps } from '@mui/material';
import type { ChangeEvent } from 'react';

export type TradingInputProps = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  token: DynamicTradingToken;
  maxBalance?: string;
  onChange?: (newValue: string) => void;
  components?: {
    container?: StackProps;
    input?: BoxProps;
  };
  isConnected?: boolean;
  hideBottomRow?: boolean;
  autoFocus?: boolean;
};

const PERCENTAGE_STEPS = 4; // 25%

const useTradingInput = ({
  token,
  onChange,
  maxBalance,
  disabled,
}: TradingInputProps) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!token.value) {
      setPercentage(0);
    }
  }, [token.value]);
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.validity.valid) {
      const numericValue = evt.target.value.replace(/[^0-9.]/g, '');
      if (
        isNaN(+numericValue) ||
        numericValue.split('.')[1]?.length > token.decimals
      ) {
        return;
      }
      setPercentage(0);
      onChange(numericValue);
    }
  };

  const handlePercentageChange = (newValue: number) => () => {
    setPercentage(newValue);
    if (onChange) {
      const amt =
        newValue === PERCENTAGE_STEPS
          ? maxBalance
          : removeInsignificantTrailingZeros(
              new BigNumber(maxBalance)
                .multipliedBy(newValue)
                .multipliedBy(1 / PERCENTAGE_STEPS)
                .toFixed(token.decimals),
            );

      onChange(amt);
    }
  };

  return {
    handleChange,
    handlePercentageChange,
    percentage,
    inputTokenValue:
      disabled && token.value && token.value !== '0'
        ? new BigNumber(token.value).toFixed(6)
        : token.value,
  };
};

export const TradingInput = forwardRef<HTMLInputElement, TradingInputProps>(
  (props, ref) => {
    const {
      label,
      placeholder = '0.00',
      disabled,
      error,
      token,
      maxBalance,
      components,
      hideBottomRow,
      isConnected,
      autoFocus,
    } = props;

    const {
      handleChange,
      handlePercentageChange,
      percentage,
      inputTokenValue,
    } = useTradingInput(props);

    return (
      <Stack {...components?.container}>
        <FormControl error={error}>
          <InputLabel error={error}>{label}</InputLabel>
          <Stack direction="row" alignItems="center" spacing={1} mt={1}>
            <Box
              {...components?.input}
              sx={{ flexGrow: 1, ...components?.input?.sx }}
            >
              {token.isLoading ? (
                <Skeleton
                  width={120}
                  height={48}
                  sx={{ pt: '4px', pb: '5px' }}
                />
              ) : (
                <InputBase
                  inputRef={ref}
                  value={inputTokenValue}
                  onChange={handleChange}
                  sx={{
                    typography: 'value3',
                    pointerEvents: `${disabled ? 'none' : ''}`,
                  }}
                  placeholder={placeholder}
                  autoFocus={autoFocus}
                />
              )}
            </Box>
            <Fade appear in>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  p: 1,
                  borderRadius: '4px',
                  backgroundColor: 'background.highlight',
                  color: 'text.primary',
                  maxWidth: 100,
                }}
              >
                <TokenIconRevamp
                  symbols={[token.symbol]}
                  sx={{
                    width: 14,
                    height: 14,
                  }}
                />
                <Typography variant="buttonMedium" color="inherit" noWrap>
                  {token.symbol}
                </Typography>
              </Stack>
            </Fade>
          </Stack>
        </FormControl>
        <Collapse in={!hideBottomRow}>
          <Stack
            direction="row"
            mt={1}
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={0.5}>
              {range(1, PERCENTAGE_STEPS + 1).map((n) => (
                <PercentageButton
                  onClick={handlePercentageChange(n)}
                  value={n}
                  key={`percent-${n}`}
                  disabled={disabled || token.isLoading || maxBalance === '0'}
                  sx={{
                    ...(n === percentage && {
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      ':hover': {
                        borderColor: 'primary.main',
                      },
                    }),
                  }}
                >
                  {`${
                    n === PERCENTAGE_STEPS
                      ? 'MAX'
                      : `${n * (100 / PERCENTAGE_STEPS)}%`
                  }`}
                </PercentageButton>
              ))}
            </Stack>
            <TradingTokenBalance
              token={token}
              isConnected={isConnected}
              maxBalance={maxBalance}
            />
          </Stack>
        </Collapse>
      </Stack>
    );
  },
);
TradingInput.displayName = 'TradingInput';
