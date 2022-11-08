import { useRef, useState } from 'react';

import { ClickAwayMenu, InfoTooltip } from '@frontend/shared-ui';
import {
  Button,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { Gear } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { useAccount, useNetwork } from 'wagmi';

import { useToggleSettings } from '../hooks';
import { useSettings } from '../state';

import type { ButtonProps } from '@mui/material';

export const SettingsButton = (props: ButtonProps) => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const intl = useIntl();
  const { exactApproval, dark } = useSettings();
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
            value={dark}
            control={<Switch checked={dark} />}
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
              toggleSettings('dark');
            }}
            sx={{ width: 1 }}
          />
          <Divider flexItem />
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Token Approval' })}
          </Typography>
          <FormControlLabel
            value={!exactApproval}
            control={<Switch checked={!exactApproval} />}
            label={
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                flexGrow={1}
              >
                <Typography variant="label2">
                  {intl.formatMessage({ defaultMessage: 'Set As Infinite' })}
                </Typography>
                <InfoTooltip
                  label={intl.formatMessage({
                    defaultMessage:
                      'A deposit into a vault requires an approval transaction.<br></br><br></br>Set as infinite to avoid approving multiple times and save gas on subsequent deposits.<br></br><br></br>Deactiviting is safer, but would require approval on every subsequent deposit and hence results in higher gas cost.',
                  })}
                />
              </Stack>
            }
            labelPlacement="start"
            disableTypography
            disabled={!isConnected}
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
