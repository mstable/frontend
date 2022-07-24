import { Metamask, USDC } from '@frontend/shared-icons';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { range } from 'ramda';

import type {
  ButtonProps,
  StackProps,
  StandardTextFieldProps,
  Theme,
} from '@mui/material';
import type { ChangeEvent } from 'react';

export type TokenInputProps = {
  symbol: string;
  balance?: number;
  onChange?: (newValue: number) => void;
  hidePercentage?: boolean;
  components?: {
    container?: StackProps;
  };
} & Omit<StandardTextFieldProps, 'onChange'>;

const PERCENTAGE_STEPS = 4; // 100 / 4 = 25%

const greyBkg = (theme: Theme) => ({
  color: theme.palette.grey['800'],
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.grey['100']
      : theme.palette.grey['300'],
  ':hover': {
    color: theme.palette.grey['800'],
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey['200']
        : theme.palette.grey['400'],
  },
});

const SmallButton = (props: ButtonProps) => (
  <Button
    variant="text"
    {...props}
    sx={(theme) => ({
      p: 0.5,
      borderRadius: '4px',
      minWidth: 0,
      minHeight: 0,
      ...greyBkg(theme),
      ...theme.typography.value6,
      ...props?.sx,
    })}
  />
);

const SymbolButton = (props: ButtonProps) => (
  <Button
    variant="text"
    {...props}
    sx={(theme) => ({
      py: 0.5,
      px: 1.5,
      borderRadius: '4px',
      minWidth: 48,
      ...greyBkg(theme),
      ...props?.sx,
    })}
  />
);

export const TokenInput = ({
  symbol,
  balance = 0,
  onChange,
  hidePercentage = false,
  components,
  ...rest
}: TokenInputProps) => {
  const handlePercentageClick = (n: number) => () => {
    if (onChange) {
      const res = balance ?? 0 * n * (1 / PERCENTAGE_STEPS);
      onChange(res);
    }
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(parseInt(evt.currentTarget.value));
    }
  };

  return (
    <Stack {...components?.container}>
      <TextField
        {...rest}
        variant="standard"
        onChange={handleChange}
        InputProps={{
          type: 'number',
          disableUnderline: true,
          endAdornment: (
            <SymbolButton>
              <USDC sx={{ width: 12, height: 12, mr: 0.5 }} />
              <Typography variant="buttonMedium">{symbol}</Typography>
            </SymbolButton>
          ),
          sx: (theme) => ({
            margin: 0,
            padding: 0,
            ...theme.typography.value1,
          }),
        }}
      />
      {!hidePercentage && (
        <Stack
          direction="row"
          mt={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={0.5}>
            {range(1, PERCENTAGE_STEPS + 1).map((n) => (
              <SmallButton
                key={`percent-${n}`}
                onClick={handlePercentageClick(n)}
                disabled={balance === 0}
              >
                {n * (100 / PERCENTAGE_STEPS)}%
              </SmallButton>
            ))}
          </Stack>
          <SmallButton>
            <Metamask sx={{ width: 12, height: 12, mr: 1 }} />
            <Typography variant="value6">54,567.23 USDC</Typography>
          </SmallButton>
        </Stack>
      )}
    </Stack>
  );
};
