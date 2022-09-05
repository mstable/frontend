import { Divider as MuiDivider, Stack, Typography } from '@mui/material';

import { LoremIpsum } from '../components/LoremIpsum';

export default {
  title: 'Theme/Divider',
  component: MuiDivider,
};

const CustomDivider = () => (
  <MuiDivider
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
  </MuiDivider>
);

export const Divider = () => (
  <Stack direction="column" spacing={2} p={2}>
    <LoremIpsum />
    <MuiDivider />
    <LoremIpsum />
    <CustomDivider />
    <LoremIpsum />
  </Stack>
);
