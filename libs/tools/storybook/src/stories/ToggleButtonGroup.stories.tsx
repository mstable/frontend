import { useState } from 'react';

import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ArrowsDownUp } from 'phosphor-react';

export default {
  title: 'Theme/ToggleButtonGroup',
  component: ToggleButtonGroup,
};

const Template = () => {
  const [val, setVal] = useState<number>(0);

  const handleClick = (_, newVal: number) => {
    setVal(newVal);
  };

  return (
    <Stack direction="column" spacing={2} p={2}>
      <Stack direction="row" spacing={2}>
        <ToggleButtonGroup
          size="small"
          value={val}
          exclusive
          onChange={handleClick}
        >
          <ToggleButton value={0}>
            <ArrowsDownUp />
          </ToggleButton>
          <ToggleButton value={1}>
            <ArrowsDownUp />
          </ToggleButton>
          <ToggleButton value={2}>
            <ArrowsDownUp />
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          size="small"
          value={val}
          exclusive
          onChange={handleClick}
          disabled
        >
          <ToggleButton value={0}>
            <ArrowsDownUp />
          </ToggleButton>
          <ToggleButton value={1}>
            <ArrowsDownUp />
          </ToggleButton>
          <ToggleButton value={2}>
            <ArrowsDownUp />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Stack direction="row" spacing={2}>
        <ToggleButtonGroup value={val} exclusive onChange={handleClick}>
          <ToggleButton value={0}>
            <ArrowsDownUp />
          </ToggleButton>
          <ToggleButton value={1}>
            <ArrowsDownUp />
          </ToggleButton>
          <ToggleButton value={2}>
            <ArrowsDownUp />
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={val}
          exclusive
          onChange={handleClick}
          disabled
        >
          <ToggleButton value={0}>
            <ArrowsDownUp />
          </ToggleButton>
          <ToggleButton value={1}>
            <ArrowsDownUp />
          </ToggleButton>
          <ToggleButton value={2}>
            <ArrowsDownUp />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Stack direction="row" spacing={2}>
        <ToggleButtonGroup
          size="large"
          value={val}
          exclusive
          onChange={handleClick}
        >
          <ToggleButton value={0}>
            <ArrowsDownUp />
          </ToggleButton>
          <ToggleButton value={1}>
            <ArrowsDownUp />
          </ToggleButton>
          <ToggleButton value={2}>
            <ArrowsDownUp />
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          size="large"
          value={val}
          exclusive
          onChange={handleClick}
          disabled
        >
          <ToggleButton value={0}>
            <ArrowsDownUp />
          </ToggleButton>
          <ToggleButton value={1}>
            <ArrowsDownUp />
          </ToggleButton>
          <ToggleButton value={2}>
            <ArrowsDownUp />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
