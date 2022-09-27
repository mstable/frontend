import { useRef, useState } from 'react';

import { useToggleThemeMode } from '@frontend/shared-theme';
import { ClickAwayMenu, InfoTooltip } from '@frontend/shared-ui';
import {
  Button,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';
import { Gear } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { useNetwork } from 'wagmi';

import { useSettings, useToggleSettings } from '../state';

import type { ButtonProps } from '@mui/material';

export const SettingsButton = (props: ButtonProps) => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);
  const { chain } = useNetwork();
  const intl = useIntl();
  const {
    palette: { mode },
  } = useTheme();
  const toggleThemeMode = useToggleThemeMode();
  const { exactApproval } = useSettings();
  const toggleSettings = useToggleSettings();

  return (
    <>
      <Button
        {...props}
        ref={anchorEl}
        onClick={() => {
          setOpen(true);
        }}
        variant="text"
        color={chain?.unsupported ? 'warning' : 'inherit'}
        sx={{ p: 0, ...props?.sx }}
      >
        <Gear size={20} weight="fill" />
      </Button>
      <ClickAwayMenu
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setOpen(false);
        }}
        PaperProps={{ sx: { mt: 2 } }}
      >
        <Stack
          alignItems="flex-start"
          spacing={1}
          sx={{ minWidth: { xs: '94vw', sm: 300 } }}
        >
          <Typography>
            {intl.formatMessage({ defaultMessage: 'General Settings' })}
          </Typography>
          <FormControlLabel
            value={mode === 'dark'}
            control={<Switch checked={mode === 'dark'} />}
            label={
              <Stack direction="row" spacing={1} flexGrow={1}>
                <Typography variant="label2">
                  {intl.formatMessage({ defaultMessage: 'Dark Mode' })}
                </Typography>
              </Stack>
            }
            labelPlacement="start"
            disableTypography
            onChange={() => {
              toggleThemeMode();
            }}
            sx={{ width: 1 }}
          />
          <Divider flexItem />
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Token Approval' })}
          </Typography>
          <FormControlLabel
            value={exactApproval}
            control={<Switch checked={exactApproval} />}
            label={
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                flexGrow={1}
              >
                <Typography variant="label2">
                  {intl.formatMessage({ defaultMessage: 'Set As Exact' })}
                </Typography>
                <InfoTooltip
                  label={intl.formatMessage({
                    defaultMessage:
                      'Approve the exact amount of the transaction',
                  })}
                />
              </Stack>
            }
            labelPlacement="start"
            disableTypography
            onChange={() => {
              toggleSettings('exactApproval');
            }}
            sx={{ width: 1 }}
          />
        </Stack>
      </ClickAwayMenu>
    </>
  );
};
