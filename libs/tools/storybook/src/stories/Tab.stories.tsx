import { useState } from 'react';

import { Stack, Tab, Tabs as MuiTabs, Typography } from '@mui/material';

import type { SyntheticEvent } from 'react';

export default {
  title: 'Theme/Tabs',
  component: MuiTabs,
};

export const Tabs = () => {
  const [idx, setIdx] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setIdx(newValue);
  };

  return (
    <Stack direction="column" spacing={2} p={2}>
      <MuiTabs value={idx} onChange={handleChange}>
        <Tab label="One" />
        <Tab label="Two" />
        <Tab label="Three" />
      </MuiTabs>
      <Stack pt={2}>
        <Typography>Content tab {idx}</Typography>
      </Stack>
    </Stack>
  );
};
