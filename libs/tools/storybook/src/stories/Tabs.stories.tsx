import { useState } from 'react';

import { Stack, Tab, Tabs, Typography } from '@mui/material';

import type { SyntheticEvent } from 'react';

export default {
  title: 'Theme/Tabs',
  component: Tabs,
};

const Template = () => {
  const [idx, setIdx] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setIdx(newValue);
  };

  return (
    <Stack direction="column" spacing={2} p={2}>
      <Tabs value={idx} onChange={handleChange}>
        <Tab label="One" />
        <Tab label="Two" />
        <Tab label="Three" />
      </Tabs>
      <Stack pt={2}>
        <Typography>Content tab {idx}</Typography>
      </Stack>
    </Stack>
  );
};

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
