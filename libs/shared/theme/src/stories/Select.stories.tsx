import { useState } from 'react';

import { MenuItem, Select as MuiSelect, Stack } from '@mui/material';

import type { SelectChangeEvent } from '@mui/material';

export default {
  title: 'Theme/Select',
  component: MuiSelect,
};

export const Select = () => {
  const [selected, setSelected] = useState('0');

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };

  return (
    <Stack direction="column" spacing={2} p={2} width={300}>
      <MuiSelect value={selected} onChange={handleChange}>
        <MenuItem value="0">Ten</MenuItem>
        <MenuItem value="1">Twenty</MenuItem>
        <MenuItem value="2">Thirty</MenuItem>
      </MuiSelect>
    </Stack>
  );
};
