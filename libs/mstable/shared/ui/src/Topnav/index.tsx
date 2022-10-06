import { SettingsButton } from '@frontend/mstable-settings';
import { MStable, MStableShort } from '@frontend/shared-icons';
import { OpenAccountModalButton } from '@frontend/shared-wagmi';
import {
  alpha,
  AppBar,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-location';

export const Topnav = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const wide = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <AppBar position="sticky" color="transparent">
      <Stack
        direction="row"
        sx={{
          width: 1,
          display: 'flex',
          alignItems: 'stretch',
          py: 1,
          px: (theme) => theme.mixins.paddings.page.paddingX,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.5),
          backdropFilter: 'blur(20px)',
        }}
      >
        <Button
          variant="text"
          color="inherit"
          onClick={() => {
            navigate({ to: '/' });
          }}
          sx={{ ml: -2 }}
        >
          {wide ? <MStable sx={{ minWidth: 120 }} /> : <MStableShort />}
        </Button>
        <Stack
          flexGrow={1}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <OpenAccountModalButton
            sx={{ maxWidth: 180, maxHeight: 36, px: 1 }}
          />
          <SettingsButton sx={{ height: 36, width: 36 }} />
        </Stack>
      </Stack>
    </AppBar>
  );
};
