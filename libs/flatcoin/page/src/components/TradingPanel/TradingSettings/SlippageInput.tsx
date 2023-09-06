import { DEFAULT_MAX_SLIPPAGE } from '@frontend/flatcoin-constants';
import { Input, Stack } from '@mui/material';

import { useFlatcoinTradingState, useUpdateTradingSlippage } from '../state';

import type { StackProps } from '@mui/material';
import type { ChangeEvent, FC } from 'react';

export const SlippageInput: FC<StackProps> = (props) => {
  const { slippage } = useFlatcoinTradingState();
  const updateSlippage = useUpdateTradingSlippage();

  const handleSlippageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const invalid = +value < 0 || +value > 100;
    if (!invalid) {
      updateSlippage(value);
    }
  };

  return (
    <Stack direction="row" {...props}>
      <Input
        placeholder={DEFAULT_MAX_SLIPPAGE}
        value={slippage}
        onChange={handleSlippageChange}
        type="number"
        sx={{
          typography: 'value3',
          maxWidth: 50,
          '& input::placeholder': {
            fontSize: '1.2rem!important',
          },
        }}
        size="small"
      />
      %
    </Stack>
  );
};
