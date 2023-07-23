import { PercentageButton } from '@frontend/shared-ui';
import { Box, InputBase, InputLabel, Stack } from '@mui/material';

import { useFlatcoinTradingState, useUpdateLeverage } from '../state';

import type { StackProps } from '@mui/material';
import type { ChangeEvent } from 'react';
import type { FC } from 'react';

const LEVERAGE_DECIMALS = 2;
const MAX_LEVERAGE = 50;
const LEVERAGE_OPTIONS = [2, 5, 10, 25, 50];

const useLeverageInput = () => {
  const { leverage } = useFlatcoinTradingState();
  const updateLeverage = useUpdateLeverage();

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.validity.valid) {
      const numericValue = evt.target.value.replace(/[^0-9.]/g, '');
      if (
        isNaN(+numericValue) ||
        numericValue.split('.')[1]?.length > LEVERAGE_DECIMALS ||
        +numericValue > MAX_LEVERAGE
      ) {
        return;
      }
      updateLeverage(numericValue);
    }
  };

  return { leverage, handleInputChange, updateLeverage };
};

export const LeverageInput: FC<
  StackProps & { label?: string; disabled?: boolean }
> = ({ label, disabled, ...props }) => {
  const { leverage, updateLeverage, handleInputChange } = useLeverageInput();
  return (
    <Stack {...props}>
      {label && <InputLabel>{label}</InputLabel>}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box width={75}>
          <InputBase
            value={leverage}
            onChange={handleInputChange}
            sx={{
              typography: 'value3',
              pointerEvents: `${disabled ? 'none' : ''}`,
              '& input::placeholder': {
                fontSize: '1.2rem!important',
              },
            }}
            placeholder="2"
          />
        </Box>
        {LEVERAGE_OPTIONS.map((l) => (
          <PercentageButton
            onClick={() => updateLeverage(l.toString())}
            value={l}
            key={`leverage-${l}`}
            disabled={disabled}
            sx={{
              ...(l === +leverage && {
                color: 'primary.main',
                borderColor: 'primary.main',
                ':hover': {
                  borderColor: 'primary.main',
                },
              }),
              minWidth: 36,
            }}
          >
            {`${l}x`}
          </PercentageButton>
        ))}
      </Stack>
    </Stack>
  );
};
