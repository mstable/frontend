import {
  Button,
  FormControl,
  InputBase,
  InputLabel,
  Stack,
} from '@mui/material';
import { range } from 'ramda';

import type { ButtonProps, FormControlProps } from '@mui/material';

export type TokenInputProps = {
  label: string;
  symbol: string;
  value?: number;
  placeholder?: string;
  balance?: number;
  onChange?: (newValue: number) => void;
} & FormControlProps;

const PERCENTAGE_STEPS = 4; // 100 / 4 = 25%

const PercentageButton = (props: ButtonProps) => (
  <Button
    variant="text"
    {...props}
    sx={(theme) => ({
      p: 0.5,
      borderRadius: '4px',
      minWidth: 0,
      minHeight: 0,
      backgroundColor: 'grey.100',
      ':hover': {
        backgroundColor: 'grey.200',
      },
      ...theme.typography.value6,
      ...props?.sx,
    })}
  />
);

export const TokenInput = ({
  label,
  symbol,
  value,
  placeholder,
  balance = 0,
  onChange,
  ...rest
}: TokenInputProps) => {
  const handlePercentageClick = (n: number) => () => {
    if (onChange) {
      const res = balance ?? 0 * n * (1 / PERCENTAGE_STEPS);
      onChange(res);
    }
  };

  return (
    <FormControl {...rest}>
      <InputLabel>{label}</InputLabel>
      <InputBase
        margin="dense"
        type="number"
        value={value}
        onChange={(evt) => {
          if (onChange) {
            onChange(parseInt(evt.currentTarget.value));
          }
        }}
        placeholder={placeholder}
        sx={(theme) => ({ margin: 0, padding: 0, ...theme.typography.value1 })}
      />
      <Stack direction="row" spacing={1} mt={1}>
        {range(1, PERCENTAGE_STEPS + 1).map((n) => (
          <PercentageButton
            key={`percent-${n}`}
            onClick={handlePercentageClick(n)}
            disabled={balance === 0}
          >
            {n * (100 / PERCENTAGE_STEPS)}%
          </PercentageButton>
        ))}
      </Stack>
    </FormControl>
  );
};
