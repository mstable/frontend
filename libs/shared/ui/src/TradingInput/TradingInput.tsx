import { forwardRef, useEffect, useState } from 'react';

import { removeInsignificantTrailingZeros } from '@frontend/shared-utils';
import {
  Box,
  Button,
  Collapse,
  Fade,
  FormControl,
  InputBase,
  InputLabel,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import BigNumber from 'bignumber.js';
import { Wallet, Warning } from 'phosphor-react';
import { range } from 'ramda';
import { useIntl } from 'react-intl';

import { TokenIcon } from '../Icons';

import type { TradingToken } from '@dhedge/core-ui-kit/types';
import type { BoxProps, ButtonProps, StackProps, SxProps } from '@mui/material';
import type { ChangeEvent } from 'react';

type TradingInputProps = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  isLoading?: boolean;
  token: TradingToken;
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

const maxStyles: SxProps = {
  paddingX: 0.5,
  paddingY: 0.75,
  borderRadius: '4px',
};

const PERCENTAGE_STEPS = 4; // 25%

const PercentageButton = (props: ButtonProps) => (
  <Button
    {...props}
    variant="outlined"
    size="small"
    sx={(theme) => ({
      padding: 0.5,
      margin: 0,
      minWidth: 28,
      minHeight: 16,
      borderRadius: '4px',
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[600]
          : theme.palette.grey[500],
      borderColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[800],
      letterSpacing: '-0.04em',
      textTransform: 'uppercase',
      ':hover': {
        color: 'primary.main',
        borderColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
      },
      '&.Mui-disabled': {
        color: 'text.disabled',
        borderColor: 'action.disabledBackground',
        ':hover': {
          borderColor: 'text.disabled',
        },
      },
      ...props?.sx,
    })}
  />
);

export const TradingInput = forwardRef<HTMLInputElement, TradingInputProps>(
  (
    {
      label,
      placeholder = '0.00',
      disabled,
      error,
      isLoading,
      token,
      onChange,
      maxBalance,
      components,
      hideBottomRow,
      isConnected,
      autoFocus,
    },
    ref,
  ) => {
    const [percentage, setPercentage] = useState(0);
    const intl = useIntl();
    const theme = useTheme();

    useEffect(() => {
      if (!token.value) {
        setPercentage(0);
      }
    }, [token.value]);

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

    return (
      <Stack {...components?.container}>
        <FormControl error={error}>
          <InputLabel error={error}>{label}</InputLabel>
          <Stack direction="row" alignItems="center" spacing={1} mt={1}>
            <Box
              {...components?.input}
              sx={{ flexGrow: 1, ...components?.input?.sx }}
            >
              {isLoading ? (
                <Skeleton
                  width={120}
                  height={48}
                  sx={{ pt: '4px', pb: '5px' }}
                />
              ) : (
                <InputBase
                  inputRef={ref}
                  value={token.value}
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
                <TokenIcon
                  symbol={token.symbol}
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
                  disabled={disabled || isLoading || maxBalance === '0'}
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
            {isConnected ? (
              !maxBalance || maxBalance === '0' ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                  overflow="hidden"
                >
                  <Warning
                    weight="fill"
                    width={16}
                    height={16}
                    color={theme.palette.icons.color}
                  />

                  <Typography
                    variant="value6"
                    sx={{
                      ...maxStyles,
                      color: 'text.secondary',
                    }}
                    noWrap
                  >
                    {intl.formatMessage({
                      defaultMessage: 'No balance',
                      id: 'Ar5obI',
                    })}
                  </Typography>
                </Stack>
              ) : (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                  overflow="hidden"
                >
                  <Wallet
                    weight="fill"
                    width={16}
                    height={16}
                    color={theme.palette.icons.color}
                  />
                  <Typography
                    variant="value6"
                    sx={{
                      ...maxStyles,
                      color: 'text.secondary',
                    }}
                    noWrap
                  >
                    ≈
                    {removeInsignificantTrailingZeros((+maxBalance).toFixed(4))}
                  </Typography>
                </Stack>
              )
            ) : (
              <Typography
                variant="value6"
                noWrap
                sx={{
                  ...maxStyles,
                  color: 'text.disabled',
                  backgroundColor: 'action.disabledBackground',
                }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Not Connected',
                  id: 'x8vY9w',
                })}
              </Typography>
            )}
          </Stack>
        </Collapse>
      </Stack>
    );
  },
);
TradingInput.displayName = 'TradingInput';
