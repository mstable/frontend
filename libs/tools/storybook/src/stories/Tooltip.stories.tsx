import { forwardRef } from 'react';

import { Stack, Tooltip as MuiTooltip, Typography } from '@mui/material';

import type { TypographyProps } from '@mui/material';

export default {
  title: 'Theme/Tooltip',
  component: MuiTooltip,
};

const tooltipLabel =
  'This is a nice tooltip label, it should properly display no matter how long it is.';

// Custom child elements must pass props and refs
// https://mui.com/material-ui/react-tooltip/#custom-child-element
const Trigger = forwardRef<HTMLSpanElement, TypographyProps>((props, ref) => (
  <Typography
    {...props}
    ref={ref}
    sx={{
      padding: 2,
      backgroundColor: 'grey.100',
      cursor: 'pointer',
      ...props?.sx,
    }}
  />
));
Trigger.displayName = 'trigger';

export const Tooltip = () => (
  <Stack direction="row" spacing={2} p={2} alignItems="center">
    <MuiTooltip title={tooltipLabel}>
      <Trigger>Hover no arrow</Trigger>
    </MuiTooltip>

    <MuiTooltip title={tooltipLabel} arrow>
      <Trigger>Hover with arrow</Trigger>
    </MuiTooltip>
  </Stack>
);
