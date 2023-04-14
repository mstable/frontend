import { useMemo } from 'react';

import { Stack } from '@mui/material';
import { Line } from 'react-chartjs-2';

import { useDataSets } from '../state';
import { months } from '../utils';

import type { StackProps } from '@mui/material';

export const ChartView = (props: StackProps) => {
  const ds = useDataSets();

  const data = useMemo(
    () =>
      JSON.parse(
        JSON.stringify({
          labels: months,
          datasets: ds,
        }),
      ),
    [ds],
  );

  return (
    <Stack width={1} {...props}>
      <Line
        key="chart"
        data={data}
        options={{
          responsive: true,
          interaction: {
            mode: 'nearest',
            intersect: false,
          },
          datasets: {
            line: {
              tension: 0.2,
              pointRadius: 0,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
            },
            tooltip: {
              padding: 8,
            },
          },
        }}
      />
    </Stack>
  );
};
