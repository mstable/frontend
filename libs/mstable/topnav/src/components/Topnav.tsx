import { MStable, MStableShort } from '@frontend/shared-icons';
import {
  OpenAccountModalButton,
  OpenNetworkModalButton,
} from '@frontend/shared-wagmi';
import {
  AppBar,
  Button,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-location';

import { Settings } from './Settings';

export const Topnav = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const wide = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <AppBar position="sticky" color="default">
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          pt: 1,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Button
          variant="text"
          color="inherit"
          onClick={() => {
            navigate({ to: '/' });
          }}
        >
          {wide ? <MStable sx={{ minWidth: 120 }} /> : <MStableShort />}
        </Button>
        <Stack
          flexGrow={1}
          direction="row"
          justifyContent="flex-end"
          alignItems="stretch"
        >
          <OpenAccountModalButton />
          <OpenNetworkModalButton />
          <Settings />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
