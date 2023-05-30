import { Box, Button, ButtonGroup } from '@mui/material';
import { useNavigate, useSearch } from '@tanstack/react-location';
import produce from 'immer';

import { useChartConfig } from '../hooks';

import type { BoxProps } from '@mui/material';

import type { VaultRoute } from '../../../types';

export const Controls = (props: BoxProps) => {
  const { chartPeriods, defaultChartPeriod, defaultChartType } =
    useChartConfig();
  const { chartPeriod = defaultChartPeriod, chartType = defaultChartType } =
    useSearch<VaultRoute>();
  const navigate = useNavigate<VaultRoute>();

  return (
    <Box {...props} display="flex" justifyContent="flex-end" mb={3}>
      <ButtonGroup color="secondary" size="small">
        {Object.values(chartPeriods).map((c) => (
          <Button
            key={c.id}
            onClick={() => {
              navigate({
                replace: true,
                search: produce((draft) => {
                  draft.chartPeriod = c.id;
                }),
              });
            }}
            className={c.id === chartPeriod ? 'Mui-selected' : undefined}
          >
            {c.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};
