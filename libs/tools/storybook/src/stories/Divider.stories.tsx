import { Divider, Stack, Typography } from '@mui/material';

import { LoremIpsum } from '../components/LoremIpsum';

export default {
  title: 'Theme/Divider',
  component: Divider,
};

const CustomDivider = () => (
  <Divider
    role="presentation"
    sx={{
      '&::before, &::after': {
        borderColor: 'grey.100',
      },
    }}
  >
    <Typography
      variant="value6"
      sx={{
        p: 0.5,
        backgroundColor: 'grey.100',
        borderRadius: '4px',
        color: 'grey.600',
        minWidth: 120,
      }}
    >
      Divider text
    </Typography>
  </Divider>
);

const Template = () => (
  <Stack direction="column" spacing={2} p={2}>
    <LoremIpsum />
    <Divider />
    <LoremIpsum />
    <CustomDivider />
    <LoremIpsum />
  </Stack>
);

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
