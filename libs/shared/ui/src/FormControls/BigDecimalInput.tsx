import { BigDecimal } from '@frontend/shared-utils';
import { InputBase } from '@mui/material';
import { constants } from 'ethers';

import type { InputBaseProps } from '@mui/material';
import type { ChangeEvent } from 'react';

export type BigDecimalInputProps = {
  value: BigDecimal | null;
  onChange?: (value: BigDecimal) => void;
  min?: BigDecimal;
  max?: BigDecimal;
} & Omit<InputBaseProps, 'value' | 'onChange'>;

const inRange = (val: string, min: BigDecimal, max: BigDecimal) => {
  const value = BigDecimal.maybeParse(val);

  return (
    !value || (value?.simple >= min.simple && value?.simple <= max?.simple)
  );
};

export const BigDecimalInput = ({
  value,
  onChange,
  min = BigDecimal.ZERO,
  max = new BigDecimal(constants.MaxUint256),
  ...rest
}: BigDecimalInputProps) => {
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (
      evt.target.validity.valid &&
      onChange &&
      inRange(evt.target.value, min, max)
    ) {
      onChange(BigDecimal.maybeParse(evt.target.value));
    }
  };

  return (
    <InputBase
      {...rest}
      value={value?.simple ?? ''}
      onChange={handleChange}
      inputMode="numeric"
      componentsProps={{
        input: {
          pattern: '[0-9]*(.[0-9]*)?',
        },
      }}
      sx={(theme) => ({
        ...theme.typography.value1,
      })}
    />
  );
};
