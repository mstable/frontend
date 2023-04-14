import { composeContexts } from '@frontend/shared-utils';
import { Stack } from '@mui/material';

import { ChartView } from './components/ChartView';
import { Controls } from './components/Controls';
import { DataSetsProvider } from './state';

const HomeWrapped = () => {
  return (
    <Stack spacing={2}>
      <ChartView />
      <Controls />
    </Stack>
  );
};

export const Home = () =>
  composeContexts([[DataSetsProvider]], <HomeWrapped />);
