import { useChartConfig } from '@frontend/shared-hooks';
import { Box, Button, ButtonGroup } from '@mui/material';
import { useNavigate, useSearch } from '@tanstack/react-location';
import produce from 'immer';

import type { BoxProps } from '@mui/material';

import type { FlatcoinRoute } from '../../../types';

export const Controls = (props: BoxProps) => {
  const { chartPeriods, defaultChartPeriod } = useChartConfig();
  const { chartPeriod = defaultChartPeriod } = useSearch<FlatcoinRoute>();
  const navigate = useNavigate<FlatcoinRoute>();

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
