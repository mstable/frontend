/* eslint-disable react/prop-types */
import { useState } from 'react';

import { Box, Button, ButtonGroup, Menu, MenuItem } from '@mui/material';
import { CaretDown } from 'phosphor-react';

import { useChartConfig } from './hooks';

export interface ControlsProps {
  chartType: string;
  setChartType: (c: string) => void;
  chartTimeframe: string;
  setChartTimeframe: (c: string) => void;
}

const Controls: React.FC<ControlsProps> = ({
  chartType,
  setChartType,
  chartTimeframe,
  setChartTimeframe,
}) => {
  const [chartTypeSelectAnchorEl, setChartTypeSelectAnchorEl] =
    useState<HTMLButtonElement>();

  const { chartTypes, chartTimeframes } = useChartConfig();

  return (
    <Box display="flex" justifyContent="space-between" mb={3}>
      <Button
        color="secondary"
        endIcon={<CaretDown />}
        onClick={(e) => setChartTypeSelectAnchorEl(e.currentTarget)}
        size="small"
      >
        {chartTypes[chartType]?.label}
      </Button>
      <Menu
        anchorEl={chartTypeSelectAnchorEl}
        open={!!chartTypeSelectAnchorEl}
        onClose={() => setChartTypeSelectAnchorEl(undefined)}
      >
        {Object.values(chartTypes).map((c) => (
          <MenuItem
            key={c.id}
            value={c.id}
            sx={{ px: 2 }}
            onClick={() => {
              setChartType(c.id);
              setChartTypeSelectAnchorEl(undefined);
            }}
          >
            {c.label}
          </MenuItem>
        ))}
      </Menu>
      <ButtonGroup color="secondary" size="small">
        {Object.values(chartTimeframes).map((c) => (
          <Button
            key={c.id}
            variant={c.id === chartTimeframe ? 'contained' : 'outlined'}
            onClick={() => setChartTimeframe(c.id)}
          >
            {c.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default Controls;
