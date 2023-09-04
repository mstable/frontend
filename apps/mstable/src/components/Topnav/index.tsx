import { useCallback } from 'react';

import { SettingsButton } from '@frontend/mstable-settings';
import {
  OpenAccountModalButton,
  OpenNetworkModalButton,
  useLogAnalyticsEvent,
} from '@frontend/shared-providers';
import { RouterLink } from '@frontend/shared-ui';
import {
  alpha,
  AppBar,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useIntl } from 'react-intl';

import { routes } from '../../routes';

export const Topnav = () => {
  const intl = useIntl();
  const theme = useTheme();
  const wide = useMediaQuery(theme.breakpoints.up('sm'));
  const logEvent = useLogAnalyticsEvent();

  const logSettingsMenuOpen = useCallback(() => {
    logEvent('open_app_settings');
  }, [logEvent]);

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
          <Typography variant="h3" sx={{ 'pointer-events': 'none' }}>
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
          {routes.map((route) =>
            route.meta?.label ? (
              <Link
                component={RouterLink}
                key={route.path}
                to={route.path}
                search={route.search}
                getActiveProps={() => ({
                  style: { color: theme.palette.info.dark },
                })}
                sx={{ color: 'text.primary' }}
              >
                {intl.formatMessage(route.meta.label)}
              </Link>
            ) : null,
          )}
          <OpenAccountModalButton
            sx={{ maxWidth: 180, maxHeight: 36, px: 1 }}
          />
          <OpenNetworkModalButton
            sx={{ height: 36, width: 36, pointerEvents: 'none' }}
          />
          <SettingsButton
            sx={{ height: 36, width: 36 }}
            logSettingsMenuOpen={logSettingsMenuOpen}
          />
        </Stack>
      </Stack>
    </AppBar>
  );
};
