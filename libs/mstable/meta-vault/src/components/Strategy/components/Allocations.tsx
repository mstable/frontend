import { Spinner } from '@frontend/shared-ui';
import { isNilOrEmpty } from '@frontend/shared-utils';
import { Box, Grid, Stack, Typography } from '@mui/material';

import { useMetavault } from '../../../state';

import type { StackProps } from '@mui/material';

const colors = ['#A7A9CE', '#FFB359', '#CA59FF', '#8ED6FF'];

export const Allocations = (props: StackProps) => {
  const { allocations } = useMetavault();

  console.log(allocations);

  if (isNilOrEmpty(allocations)) return <Spinner />;

  const total = allocations.reduce((acc, curr) => acc + curr.balance, 0);

  return (
    <Stack {...props}>
      <Stack margin={2} direction="row" alignItems="center">
        {allocations?.map((alloc, i) => {
          const percentage = alloc.balance / total;

          return (
            <Stack
              key={alloc.name}
              alignItems="center"
              justifyContent="flex-start"
              height={2}
              width={`${percentage * 100}%`}
              bgcolor={colors[i]}
            />
          );
        })}
      </Stack>
      <Box p={2}>
        <Grid container spacing={2}>
          {allocations?.map((alloc, i) => {
            const percentage = alloc.balance / total;

            return (
              <Grid item xs={12} sm={6} lg={3} key={alloc.name}>
                <Stack
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  border={(theme) => `1px solid ${theme.palette.divider}`}
                  borderRadius={1}
                  p={2}
                >
                  <Typography variant="value5">
                    {Intl.NumberFormat('en-us', {
                      style: 'percent',
                      maximumFractionDigits: 2,
                    }).format(percentage)}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    overflow="hidden"
                  >
                    <Box width={10} height={10} bgcolor={colors[i]} />
                    <Typography variant="label2" noWrap>
                      {alloc.name}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Stack>
  );
};
