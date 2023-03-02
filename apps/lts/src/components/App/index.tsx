import { Box, Stack } from '@mui/material';
import { Outlet } from '@tanstack/react-location';

import { Footer } from '../Footer';
import { Topnav } from '../Topnav';

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
      <Box
        minHeight="80vh"
        sx={(theme) => ({
          py: { xs: 2, md: 5 },
          px: theme.mixins.paddings.page.paddingX,
        })}
      >
        <Outlet />
      </Box>
      <Footer
        sx={(theme) => ({ py: 4, px: theme.mixins.paddings.page.paddingX })}
      />
    </Stack>
  );
};
