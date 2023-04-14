import { OpenAccountModalButton } from '@frontend/shared-providers';
import { AppBar, Box, Divider, Drawer, Toolbar } from '@mui/material';
import { Outlet } from '@tanstack/react-location';
import { useEffectOnce } from 'react-use';
import { useAccount } from 'wagmi';

import logo from '../assets/images/logo.png';
import { registerCharts } from '../clients';
import { WelcomePage } from './WelcomePage';

const toolbarHeight = 86;
const drawerWidth = 300;

export const App = () => {
  const { isConnected } = useAccount();

  useEffectOnce(() => {
    registerCharts();
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: 'transparent',
        }}
      >
        <Toolbar
          sx={{
            height: toolbarHeight,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <OpenAccountModalButton sx={{ maxWidth: 160 }} />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar
          sx={{
            height: toolbarHeight,
            backgroundColor: '#000',
            img: { width: 1 },
          }}
        >
          <img src={logo} alt="logo" />
        </Toolbar>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar sx={{ height: toolbarHeight }} />
        {isConnected ? <Outlet /> : <WelcomePage />}
      </Box>
    </Box>
  );
};
