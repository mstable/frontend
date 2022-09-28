import { useEffect, useState } from 'react';

import { isNilOrEmpty } from '@frontend/shared-utils';
import { BigDecimal } from '@frontend/shared-utils';
import { Typography } from '@mui/material';
import { useInterval } from 'react-use';

import type { SxProps, Theme, TypographyProps } from '@mui/material';

export type HighlightUpdateProps = {
  value: BigDecimal;
  delay?: number;
  decimalPlaces?: number;
  commas?: boolean;
  suffix?: string;
} & TypographyProps;

const incStyles: SxProps<Theme> = {
  color: 'success.main',
};

const decStyles: SxProps<Theme> = {
  color: 'error.main',
};

export const HighlightUpdate = ({
  value,
  delay = 3000,
  decimalPlaces = 2,
  commas = false,
  suffix = '',
  ...rest
}: HighlightUpdateProps) => {
  const [val, setVal] = useState(value ?? BigDecimal.ZERO);
  const [highlight, setHighlight] = useState<SxProps<Theme>>({});
  const [del, setDel] = useState(delay);

  useEffect(() => {
    if ((value ?? BigDecimal.ZERO).exact.gt(val.exact)) {
      setHighlight(incStyles);
    } else if ((value ?? BigDecimal.ZERO).exact.lt(val.exact)) {
      setHighlight(decStyles);
    }
    setVal(value ?? BigDecimal.ZERO);
    setDel(delay);
  }, [delay, val, value]);

  useInterval(() => {
    if (!isNilOrEmpty(highlight)) {
      setHighlight({});
    }
    setDel(null);
  }, del);

  return (
    <Typography
      sx={{
        ...highlight,
        transition: (theme) =>
          theme.transitions.create('all', {
            duration: theme.transitions.duration.short,
          }),
      }}
      {...rest}
    >
      {val.format(decimalPlaces, commas, suffix)}
    </Typography>
  );
};
