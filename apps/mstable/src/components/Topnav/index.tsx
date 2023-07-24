import { SettingsButton } from '@frontend/mstable-settings';
import { MStable, MStableShort } from '@frontend/shared-icons';
import {
  OpenAccountModalButton,
  OpenNetworkModalButton,
} from '@frontend/shared-providers';
import { RouterLink } from '@frontend/shared-ui';
import {
  alpha,
  AppBar,
  Button,
  Link,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-location';
import { useIntl } from 'react-intl';

import { routes } from '../../routes';

export const Topnav = () => {
  const intl = useIntl();
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
          <SettingsButton sx={{ height: 36, width: 36 }} />
        </Stack>
      </Stack>
    </AppBar>
  );
};
