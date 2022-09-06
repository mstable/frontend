import { useState } from 'react';

import { MenuItem, Select, Stack } from '@mui/material';

import type { SelectChangeEvent } from '@mui/material';

export default {
  title: 'Theme/Select',
  component: Select,
};

const Template = () => {
  const [selected, setSelected] = useState('0');

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };

  return (
    <Stack direction="column" spacing={2} p={2} width={300}>
      <Select value={selected} onChange={handleChange}>
        <MenuItem value="0">Ten</MenuItem>
        <MenuItem value="1">Twenty</MenuItem>
        <MenuItem value="2">Thirty</MenuItem>
      </Select>
    </Stack>
  );
};

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
