import { ErrorBoundary } from '@frontend/shared-ui';
import { Stack } from '@mui/material';
import { Outlet } from '@tanstack/react-location';
import { useEffectOnce } from 'react-use';

import { registerCharts } from '../../clients';
import { ErrorPageWithTracking } from '../Errors';
import { Page } from '../Page';
import { Topnav } from '../Topnav';

export const App = () => {
  useEffectOnce(() => {
    registerCharts();
  });

  return (
    <Stack
      direction="column"
      sx={{
        width: 1,
        height: 1,
      }}
    >
      <Topnav />
      <ErrorBoundary
        ErrorComponent={
          <ErrorPageWithTracking
            height={1}
            width={1}
            sx={(theme) => theme.mixins.paddings.page}
            errorProps={{ name: 'Unhandled Error Main Page' }}
          />
        }
      >
        <Page>
          <Outlet />
        </Page>
      </ErrorBoundary>
    </Stack>
  );
};
