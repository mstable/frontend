import { useChartConfig } from '@frontend/shared-hooks';
import { useLogAnalyticsEvent } from '@frontend/shared-providers';
import { Box, Button, ButtonGroup } from '@mui/material';
import { useNavigate, useSearch } from '@tanstack/react-location';
import produce from 'immer';

import type { BoxProps } from '@mui/material';

import type { VaultRoute } from '../../../types';

export const Controls = (props: BoxProps) => {
  const logEvent = useLogAnalyticsEvent();
  const { chartPeriods, defaultChartPeriod } = useChartConfig();
  const { chartPeriod = defaultChartPeriod } = useSearch<VaultRoute>();
  const navigate = useNavigate<VaultRoute>();

  return (
    <Box {...props} display="flex" justifyContent="flex-end" mb={3}>
      <ButtonGroup color="secondary" size="small">
        {Object.values(chartPeriods).map((c) => (
          <Button
            key={c.id}
            onClick={() => {
              logEvent('chart_period_selected', { period: c.id });
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
