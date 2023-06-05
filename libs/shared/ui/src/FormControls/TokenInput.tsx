/* eslint-disable formatjs/no-id */
import { forwardRef, useEffect, useState } from 'react';

import { BigDecimal } from '@frontend/shared-utils';
import {
  Collapse,
  Fade,
  FormControl,
  InputLabel,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Vault, Wallet, Warning } from 'phosphor-react';
import { range } from 'ramda';
import { useIntl } from 'react-intl';

import { PercentageButton } from '../Buttons';
import { TokenIcon } from '../Icons';
import { BigDecimalInput } from './BigDecimalInput';

import type { Token } from '@frontend/shared-constants';
import type { StackProps, SxProps } from '@mui/material';
import type { ReactNode } from 'react';

import type { BigDecimalInputProps } from './BigDecimalInput';

export type TokenInputProps = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  isLoading?: boolean;
  isConnected?: boolean;
  amount: BigDecimal;
  token: Token;
  tokenLabel?: string;
  tokenIcon?: ReactNode;
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
      tokenIcon,
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
      if (!amount || isLoading) {
        setPercentage(0);
      }
    }, [amount, isLoading]);

    const handlePercentageChange = (newValue: number) => () => {
      setPercentage(newValue);
      if (onChange) {
        const amt =
          newValue === PERCENTAGE_STEPS
            ? max
            : BigDecimal.fromSimple(
                max?.simpleRounded * newValue * (1 / PERCENTAGE_STEPS),
                token?.decimals,
              );

        onChange(amt);
      }
    };

    const handleChange = (value: BigDecimal) => {
      setPercentage(0);
      if (onChange) {
        const amt =
          value?.simpleRounded === max?.simpleRounded
            ? max
            : new BigDecimal(value?.exact, token?.decimals);
        onChange(amt);
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
                  maxWidth: 100,
                }}
              >
                {tokenIcon ?? token?.icon ? (
                  <token.icon
                    sx={{
                      width: 14,
                      height: 14,
                    }}
                  />
                ) : (
                  <TokenIcon
                    symbol={token.symbol}
                    sx={{
                      width: 14,
                      height: 14,
                    }}
                  />
                )}
                <Typography variant="buttonMedium" color="inherit" noWrap>
                  {tokenLabel ?? token.symbol}
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
                  disabled={disabled || isLoading || max?.exact.isZero()}
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
              !max?.exact || max.exact.isZero() ? (
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
TokenInput.displayName = 'TokenInput';
