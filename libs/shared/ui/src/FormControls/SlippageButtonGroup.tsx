import { Button, Stack } from '@mui/material';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export type SlippageButtonGroupProps = {
  value: number;
  onChange: (newValue?: number) => void;
} & Omit<StackProps, 'onChange'>;

const SLIPPAGES = [0.001, 0.005, 0.01];

export const SlippageButtonGroup = ({
  value,
  onChange,
  ...rest
}: SlippageButtonGroupProps) => {
  const intl = useIntl();

  return (
    <Stack direction="row" spacing={1} {...rest}>
      {SLIPPAGES.map((v) => (
        <Button
          key={v.toString()}
          variant="text"
          size="small"
          onClick={() => {
            onChange(v);
          }}
          sx={[
            value === v && {
              backgroundColor: 'background.highlight',
            },
          ]}
        >
          {intl.formatNumber(v, {
            style: 'percent',
            minimumSignificantDigits: 1,
          })}
        </Button>
      ))}
    </Stack>
  );
};
