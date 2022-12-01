import { Box, Button, ButtonGroup, MenuItem, Select } from '@mui/material';
import { useNavigate, useSearch } from '@tanstack/react-location';
import produce from 'immer';

import { useChartConfig } from '../hooks';

import type { BoxProps } from '@mui/material';

import type { MvGenerics } from '../../../types';

export const Controls = (props: BoxProps) => {
  const {
    chartTypes,
    chartTimeframes,
    defaultChartTimeframe,
    defaultChartType,
  } = useChartConfig();
  const {
    chartType = defaultChartType,
    chartTimeframe = defaultChartTimeframe,
  } = useSearch<MvGenerics>();
  const navigate = useNavigate<MvGenerics>();

  return (
    <Box {...props} display="flex" justifyContent="space-between" mb={3}>
      <Select value={chartType}>
        {Object.entries(chartTypes)
          .filter(([k]) => k !== 'APY')
          .map(([_, c]) => (
            <MenuItem
              key={c.id}
              value={c.id}
              sx={{ px: 2 }}
              onClick={() => {
                navigate({
                  replace: true,
                  search: produce((draft) => {
                    draft.chartType = c.id;
                  }),
                });
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
            onClick={() => {
              navigate({
                replace: true,
                search: produce((draft) => {
                  draft.chartTimeframe = c.id;
                }),
              });
            }}
            className={c.id === chartTimeframe ? 'Mui-selected' : undefined}
          >
            {c.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};
