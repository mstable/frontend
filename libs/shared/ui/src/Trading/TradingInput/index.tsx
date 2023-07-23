import { forwardRef, useEffect, useState } from 'react';

import { removeInsignificantTrailingZeros } from '@frontend/shared-utils';
import {
  Box,
  Collapse,
  Fade,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import BigNumber from 'bignumber.js';
import { range } from 'ramda';

import { PercentageButton } from '../../Buttons';
import { TokenIconRevamp } from '../../Icons';
import { TradingTokenBalance } from './TradingTokenBalance';

import type { TradingToken } from '@dhedge/core-ui-kit/types';
import type { DynamicTradingToken } from '@dhedge/core-ui-kit/types';
import type { BoxProps, StackProps } from '@mui/material';
import type { ChangeEvent, ReactNode } from 'react';

export type TradingInputProps = {
  label?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  token: DynamicTradingToken;
  tokenOptions?: TradingToken[];
  maxBalance?: string;
  onInputChange?: (newValue: string) => void;
  onTokenChange?: (token: TradingToken) => void;
  components?: {
    container?: StackProps;
    input?: BoxProps;
  };
  isConnected?: boolean;
  hideBottomRow?: boolean;
  autoFocus?: boolean;
};

const PERCENTAGE_STEPS = 4; // 25%

const buildTokenSelectValue = (token: { address: string; symbol: string }) =>
  `${token.address}_${token.symbol}`;
const parseTokenSelectValue = (value: string) => value.split('_');

const useTradingInput = ({
  token,
  onInputChange,
  maxBalance,
  disabled,
}: TradingInputProps) => {
  const [percentage, setPercentage] = useState(0);

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
      onInputChange(numericValue);
    }
  };

  const handlePercentageChange = (newValue: number) => () => {
    setPercentage(newValue);
    if (onInputChange) {
      const amt =
        newValue === PERCENTAGE_STEPS
          ? maxBalance
          : removeInsignificantTrailingZeros(
              new BigNumber(maxBalance)
                .multipliedBy(newValue)
                .multipliedBy(1 / PERCENTAGE_STEPS)
                .toFixed(token.decimals),
            );

      onInputChange(amt);
    }
  };

  useEffect(() => {
    if (!token.value) {
      setPercentage(0);
    }
  }, [token.value]);

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
      placeholder = '0',
      disabled,
      token,
      maxBalance,
      components,
      hideBottomRow,
      isConnected,
      autoFocus,
      tokenOptions,
      onTokenChange,
    } = props;

    const {
      handleChange,
      handlePercentageChange,
      percentage,
      inputTokenValue,
    } = useTradingInput(props);

    return (
      <Stack {...components?.container}>
        <>
          <InputLabel>{label}</InputLabel>
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
                    '& input::placeholder': {
                      fontSize: '1.2rem!important',
                    },
                  }}
                  placeholder={placeholder}
                  autoFocus={autoFocus}
                />
              )}
            </Box>
            <Fade appear in>
              {tokenOptions?.length ? (
                <Select
                  size="small"
                  value={buildTokenSelectValue(token)}
                  onChange={(e) => {
                    const [selectedTokenAddress, selectedTokenSymbol] =
                      parseTokenSelectValue(e.target.value);
                    const token = tokenOptions.find(
                      ({ address, symbol }) =>
                        address === selectedTokenAddress &&
                        symbol == selectedTokenSymbol,
                    );
                    onTokenChange?.(token);
                  }}
                >
                  {tokenOptions.map((token) => {
                    const tokenValue = buildTokenSelectValue(token);
                    return (
                      <MenuItem
                        key={tokenValue}
                        value={tokenValue}
                        sx={{ paddingLeft: 1 }}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{
                            color: 'text.primary',
                          }}
                        >
                          <TokenIconRevamp
                            symbols={[token.symbol]}
                            sx={{
                              maxWidth: 18,
                              maxHeight: 18,
                            }}
                          />
                          <Typography
                            variant="buttonMedium"
                            color="inherit"
                            noWrap
                          >
                            {token.symbol}
                          </Typography>
                        </Stack>
                      </MenuItem>
                    );
                  })}
                </Select>
              ) : (
                <Stack
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                  sx={{
                    paddingY: 1,
                    paddingX: 1.5,
                    borderRadius: '8px',
                    backgroundColor: 'background.highlight',
                    color: 'text.primary',
                    width: 120,
                  }}
                >
                  <TokenIconRevamp
                    symbols={[token.symbol]}
                    sx={{
                      maxWidth: 18,
                      maxHeight: 18,
                    }}
                  />
                  <Typography variant="buttonMedium" color="inherit" noWrap>
                    {token.symbol}
                  </Typography>
                </Stack>
              )}
            </Fade>
          </Stack>
        </>
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
