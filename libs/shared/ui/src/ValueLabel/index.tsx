import { Stack, Typography } from '@mui/material';

import type { StackProps, TypographyProps } from '@mui/material';
import type { ReactNode } from 'react';

export type ValueLabelProps = {
  label: string;
  value?: string;
  subvalue?: string;
  children?: ReactNode;
  components?: {
    container?: StackProps;
    label?: TypographyProps;
    value?: TypographyProps;
    valueContainer?: StackProps;
    subvalue?: TypographyProps;
  };
};

export const ValueLabel = ({
  label,
  value,
  children,
  subvalue,
  components,
}: ValueLabelProps) => (
  <Stack direction="column" {...components?.container}>
    <Typography variant="label2" mb={2} noWrap {...components?.label}>
      {label}
    </Typography>
    <Stack
      mb={0.5}
      height={24}
      direction="row"
      alignItems="center"
      {...components?.valueContainer}
    >
      {value && (
        <Typography variant="value2" noWrap {...components?.value}>
          {value}
        </Typography>
      )}
      {children}
    </Stack>
    {subvalue && (
      <Typography variant="value5" noWrap {...components?.subvalue}>
        {subvalue}
      </Typography>
    )}
  </Stack>
);
