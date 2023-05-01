import { Stack } from '@mui/material';
import { Outlet } from '@tanstack/react-location';

import { Footer } from './components/Footer';
import { Topnav } from './components/Topnav';

export const App = () => {
  return (
    <Stack
      direction="column"
      sx={{
        width: 1,
        height: 1,
      }}
    >
      <Topnav />
      <Stack
        direction="column"
        sx={(theme) => ({
          width: 1,
          height: 1,
          pb: { xs: 2, md: 4 },
          px: theme.mixins.paddings.page.paddingX,
          minHeight: '84vh',
        })}
      >
        <Outlet />
      </Stack>
      <Footer
        sx={(theme) => ({ py: 4, px: theme.mixins.paddings.page.paddingX })}
      />
    </Stack>
  );
};
