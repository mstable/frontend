import { useState } from 'react';

import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

export default {
  title: 'Theme/ToggleButtonGroup',
  component: ToggleButtonGroup,
};

type Val = 'USDT' | 'DAI' | 'USDC';

const Template = () => {
  const [val, setVal] = useState<Val>('USDC');

  const handleClick = (_, newVal: Val) => {
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
          <ToggleButton value="USDT">USDT</ToggleButton>
          <ToggleButton value="DAI">DAI</ToggleButton>
          <ToggleButton value="USDC">USDC</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          size="small"
          value={val}
          exclusive
          onChange={handleClick}
          disabled
        >
          <ToggleButton value="USDT">USDT</ToggleButton>
          <ToggleButton value="DAI">DAI</ToggleButton>
          <ToggleButton value="USDC">USDC</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Stack direction="row" spacing={2}>
        <ToggleButtonGroup value={val} exclusive onChange={handleClick}>
          <ToggleButton value="USDT">USDT</ToggleButton>
          <ToggleButton value="DAI">DAI</ToggleButton>
          <ToggleButton value="USDC">USDC</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={val}
          exclusive
          onChange={handleClick}
          disabled
        >
          <ToggleButton value="USDT">USDT</ToggleButton>
          <ToggleButton value="DAI">DAI</ToggleButton>
          <ToggleButton value="USDC">USDC</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Stack direction="row" spacing={2}>
        <ToggleButtonGroup
          size="large"
          value={val}
          exclusive
          onChange={handleClick}
        >
          <ToggleButton value="USDT">USDT</ToggleButton>
          <ToggleButton value="DAI">DAI</ToggleButton>
          <ToggleButton value="USDC">USDC</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          size="large"
          value={val}
          exclusive
          onChange={handleClick}
          disabled
        >
          <ToggleButton value="USDT">USDT</ToggleButton>
          <ToggleButton value="DAI">DAI</ToggleButton>
          <ToggleButton value="USDC">USDC</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
