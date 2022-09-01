import { useState } from 'react';

import {
  Stack,
  ToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from '@mui/material';

export default {
  title: 'Theme/ToggleButtonGroup',
  component: MuiToggleButtonGroup,
};

type Val = 'USDT' | 'DAI' | 'USDC';

export const ToggleButtonGroup = () => {
  const [val, setVal] = useState<Val>('USDC');

  const handleClick = (_, newVal: Val) => {
    setVal(newVal);
  };

  return (
    <Stack direction="column" spacing={2} p={2}>
      <Stack direction="row" spacing={2}>
        <MuiToggleButtonGroup
          size="small"
          value={val}
          exclusive
          onChange={handleClick}
        >
          <ToggleButton value="USDT">USDT</ToggleButton>
          <ToggleButton value="DAI">DAI</ToggleButton>
          <ToggleButton value="USDC">USDC</ToggleButton>
        </MuiToggleButtonGroup>

        <MuiToggleButtonGroup
          size="small"
          value={val}
          exclusive
          onChange={handleClick}
          color="secondary"
        >
          <ToggleButton value="USDT">USDT</ToggleButton>
          <ToggleButton value="DAI">DAI</ToggleButton>
          <ToggleButton value="USDC">USDC</ToggleButton>
        </MuiToggleButtonGroup>
      </Stack>

      <Stack direction="row" spacing={2}>
        <MuiToggleButtonGroup value={val} exclusive onChange={handleClick}>
          <ToggleButton value="USDT">USDT</ToggleButton>
          <ToggleButton value="DAI">DAI</ToggleButton>
          <ToggleButton value="USDC">USDC</ToggleButton>
        </MuiToggleButtonGroup>

        <MuiToggleButtonGroup
          value={val}
          exclusive
          onChange={handleClick}
          color="secondary"
        >
          <ToggleButton value="USDT">USDT</ToggleButton>
          <ToggleButton value="DAI">DAI</ToggleButton>
          <ToggleButton value="USDC">USDC</ToggleButton>
        </MuiToggleButtonGroup>
      </Stack>

      <Stack direction="row" spacing={2}>
        <MuiToggleButtonGroup
          size="large"
          value={val}
          exclusive
          onChange={handleClick}
        >
          <ToggleButton value="USDT">USDT</ToggleButton>
          <ToggleButton value="DAI">DAI</ToggleButton>
          <ToggleButton value="USDC">USDC</ToggleButton>
        </MuiToggleButtonGroup>

        <MuiToggleButtonGroup
          size="large"
          value={val}
          exclusive
          onChange={handleClick}
          color="secondary"
        >
          <ToggleButton value="USDT">USDT</ToggleButton>
          <ToggleButton value="DAI">DAI</ToggleButton>
          <ToggleButton value="USDC">USDC</ToggleButton>
        </MuiToggleButtonGroup>
      </Stack>
    </Stack>
  );
};
