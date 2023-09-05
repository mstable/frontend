import { SettingsButton } from '@frontend/mstable-settings';
import {
  OpenAccountModalButton,
  OpenNetworkModalButton,
} from '@frontend/shared-providers';
import {
  alpha,
  AppBar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export const Topnav = () => {
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
        {wide && (
          <Typography variant="h3" sx={{ pointerEvents: 'none' }}>
            Flatcoin
          </Typography>
        )}
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
          <OpenNetworkModalButton
            sx={{ height: 36, width: 36, pointerEvents: 'none' }}
          />
          <SettingsButton sx={{ height: 36, width: 36 }} />
        </Stack>
      </Stack>
    </AppBar>
  );
};
