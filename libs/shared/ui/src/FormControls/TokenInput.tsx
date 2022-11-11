/* eslint-disable formatjs/no-id */
import { forwardRef, useEffect, useState } from 'react';

import { BigDecimal } from '@frontend/shared-utils';
import {
  Button,
  Collapse,
  Fade,
  FormControl,
  InputLabel,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Vault, Wallet } from 'phosphor-react';
import { range } from 'ramda';
import { useIntl } from 'react-intl';

import { TokenIcon } from '../Icons';
import { BigDecimalInput } from './BigDecimalInput';

import type { ButtonProps, StackProps, SxProps } from '@mui/material';
import type { FetchTokenResult } from '@wagmi/core';

import type { BigDecimalInputProps } from './BigDecimalInput';

export type TokenInputProps = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  isLoading?: boolean;
  isConnected?: boolean;
  amount: BigDecimal;
  token: FetchTokenResult;
  tokenLabel?: string;
  max?: BigDecimal;
  maxIcon?: 'wallet' | 'vault';
  onChange?: (newValue: BigDecimal) => void;
  hideBottomRow?: boolean;
  hideTokenBadge?: boolean;
  components?: {
    container?: StackProps;
    input?: Omit<
      BigDecimalInputProps,
      'value' | 'min' | 'max' | 'onChange' | 'ref' | 'decimals'
    >;
  };
};

const PERCENTAGE_STEPS = 4; // 25%

const maxStyles: SxProps = {
  paddingX: 0.5,
  paddingY: 0.75,
  borderRadius: '4px',
};

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

export const TokenInput = forwardRef<HTMLInputElement, TokenInputProps>(
  (
    {
      label,
      placeholder,
      disabled,
      error,
      isLoading,
      isConnected,
      amount,
      token,
      tokenLabel,
      max,
      maxIcon = 'wallet',
      onChange,
      hideBottomRow = false,
      hideTokenBadge = false,
      components,
    },
    ref,
  ) => {
    const [percentage, setPercentage] = useState(0);
    const intl = useIntl();
    const theme = useTheme();

    useEffect(() => {
      if (max && amount) {
        const ranges = range(1, PERCENTAGE_STEPS + 1).map(
          (n) => max.simple * n * (1 / PERCENTAGE_STEPS),
        );
        const idx = ranges.findIndex((r) => r === amount.simple);
        if (idx > -1) {
          setPercentage(idx + 1);
        } else {
          setPercentage(0);
        }
      } else {
        setPercentage(0);
      }
    }, [amount, max]);

    const handlePercentageChange = (newValue: number) => () => {
      setPercentage(newValue);
      if (onChange) {
        onChange(
          BigDecimal.fromSimple(
            max?.simple * newValue * (1 / PERCENTAGE_STEPS),
            token?.decimals,
          ),
        );
      }
    };

    const handleChange = (value: BigDecimal) => {
      setPercentage(0);
      if (onChange) {
        onChange(new BigDecimal(value?.exact, token?.decimals));
      }
    };

    return (
      <Stack {...components?.container}>
        <FormControl disabled={disabled} error={error}>
          <InputLabel error={error}>{label}</InputLabel>
          <Stack direction="row" alignItems="center" spacing={1} mt={1}>
            <BigDecimalInput
              ref={ref}
              value={amount}
              decimals={token?.decimals ?? 18}
              InputProps={{ error, disabled, placeholder }}
              onChange={handleChange}
              isLoading={isLoading}
              {...components?.input}
              sx={{ flexGrow: 1, ...components?.input?.sx }}
            />
            <Fade appear in={!hideTokenBadge}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  p: 1,
                  borderRadius: '4px',
                  backgroundColor: 'background.highlight',
                  color: 'text.primary',
                }}
              >
                <TokenIcon
                  symbol={token?.symbol}
                  sx={{ width: 14, height: 14 }}
                />
                <Typography variant="buttonMedium" color="inherit">
                  {tokenLabel ?? token?.symbol}
                </Typography>
              </Stack>
            </Fade>
          </Stack>
        </FormControl>
        <Collapse appear in={!hideBottomRow}>
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
                  disabled={disabled || isLoading}
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
            {isConnected && max ? (
              <Stack direction="row" alignItems="center" spacing={0.5}>
                {maxIcon === 'wallet' ? (
                  <Wallet
                    weight="fill"
                    width={16}
                    height={16}
                    color={theme.palette.icons.color}
                  />
                ) : (
                  <Vault
                    weight="fill"
                    width={16}
                    height={16}
                    color={theme.palette.icons.color}
                  />
                )}
                <Typography
                  variant="value6"
                  sx={{
                    ...maxStyles,
                    color: 'text.secondary',
                  }}
                  noWrap
                >
                  {max.format(2)}
                </Typography>
              </Stack>
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
                  id: 'not_connected',
                })}
              </Typography>
            )}
          </Stack>
        </Collapse>
      </Stack>
    );
  },
);
TokenInput.displayName = 'TokenInput';
