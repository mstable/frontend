import { Box, Button, ButtonGroup, MenuItem, Select } from '@mui/material';
import { CaretDown } from 'phosphor-react';

import { useChartConfig } from '../hooks';

export interface ControlsProps {
  chartType: string;
  setChartType: (c: string) => void;
  chartTimeframe: string;
  setChartTimeframe: (c: string) => void;
}

export const Controls = ({
  chartType,
  setChartType,
  chartTimeframe,
  setChartTimeframe,
}: ControlsProps) => {
  const { chartTypes, chartTimeframes } = useChartConfig();

  return (
    <Box display="flex" justifyContent="space-between" mb={3}>
      <Select
        value={chartType}
        IconComponent={CaretDown}
        size="small"
        variant="filled"
        disableUnderline
      >
        {Object.values(chartTypes).map((c) => (
          <MenuItem
            key={c.id}
            value={c.id}
            sx={{ px: 2 }}
            onClick={() => {
              setChartType(c.id);
            }}
          >
            {c.label}
          </MenuItem>
        ))}
      </Select>
      <ButtonGroup color="secondary" size="small">
        {Object.values(chartTimeframes).map((c) => (
          <Button
            key={c.id}
            onClick={() => setChartTimeframe(c.id)}
            className={c.id === chartTimeframe ? 'Mui-selected' : undefined}
          >
            {c.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};
