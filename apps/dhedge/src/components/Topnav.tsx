import { DHEDGE } from '@frontend/shared-constants';
import { DhedgeLogo } from '@frontend/shared-icons';
import {
  OpenAccountModalButton,
  OpenNetworkModalButton,
} from '@frontend/shared-providers';
import { alpha, AppBar, IconButton, Stack } from '@mui/material';

import { ThemeSwitchButton } from './ThemeSwitchButton';

export const Topnav = () => {
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
        <IconButton
          color="secondary"
          href={DHEDGE}
          target="_blank"
          rel="noopener noreferrer"
        >
          <DhedgeLogo />
        </IconButton>
        <Stack
          flexGrow={1}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <OpenAccountModalButton sx={{ maxWidth: 180, maxHeight: 36 }} />
          <OpenNetworkModalButton sx={{ height: 36, width: 36 }} />
          <ThemeSwitchButton />
        </Stack>
      </Stack>
    </AppBar>
  );
};
