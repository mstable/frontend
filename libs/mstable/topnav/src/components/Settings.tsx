import { useRef, useState } from 'react';

import { ThemeModeIcon, useSwitchThemeMode } from '@frontend/shared-theme';
import { ClickAwayMenu } from '@frontend/shared-ui';
import { Button, Stack } from '@mui/material';
import { Gear } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { useNetwork } from 'wagmi';

import type { ButtonProps } from '@mui/material';

const itemButtonProps: Partial<ButtonProps> = {
  fullWidth: true,
  color: 'inherit',
  variant: 'text',
  sx: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 42,
  },
};

export const Settings = () => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);
  const { chain } = useNetwork();
  const intl = useIntl();
  const switchTheme = useSwitchThemeMode();

  return (
    <>
      <Button
        ref={anchorEl}
        onClick={() => {
          setOpen(true);
        }}
        variant="text"
        color={chain?.unsupported ? 'warning' : 'inherit'}
      >
        <Gear size={24} />
      </Button>
      <ClickAwayMenu
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setOpen(false);
        }}
        PaperProps={{ sx: { mt: 2 } }}
      >
        <Stack alignItems="center" sx={{ minWidth: { xs: '94vw', sm: 300 } }}>
          <Button
            {...itemButtonProps}
            onClick={() => {
              setOpen(false);
              switchTheme();
            }}
          >
            <ThemeModeIcon sx={{ mr: 2 }} />
            {intl.formatMessage({ defaultMessage: 'Switch theme' })}
          </Button>
        </Stack>
      </ClickAwayMenu>
    </>
  );
};
