import { forwardRef } from 'react';

import { Stack, Tooltip, Typography } from '@mui/material';

import type { TypographyProps } from '@mui/material';

export default {
  title: 'Theme/Tooltip',
  component: Tooltip,
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
      backgroundColor: 'background.highlight',
      cursor: 'pointer',
      ...props?.sx,
    }}
  />
));
Trigger.displayName = 'trigger';

const Template = () => (
  <Stack direction="row" spacing={2} p={2} alignItems="center">
    <Tooltip title={tooltipLabel}>
      <Trigger>Hover no arrow</Trigger>
    </Tooltip>

    <Tooltip title={tooltipLabel} arrow>
      <Trigger>Hover with arrow</Trigger>
    </Tooltip>
  </Stack>
);

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
