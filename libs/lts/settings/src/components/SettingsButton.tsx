import { useRef, useState } from 'react';

import { ClickAwayMenu, SlippageButtonGroup } from '@frontend/shared-ui';
import {
  Button,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import produce from 'immer';
import { Gear } from 'phosphor-react';
import { not } from 'ramda';
import { useIntl } from 'react-intl';
import { useNetwork } from 'wagmi';

import { useSettings, useUpdateSettings } from '../state';

import type { ButtonProps } from '@mui/material';

export const SettingsButton = (props: ButtonProps) => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);
  const { chain } = useNetwork();
  const intl = useIntl();
  const { dark, showEmpty, slippage } = useSettings();
  const updateSettings = useUpdateSettings();

  return (
    <>
      <Button
        {...props}
        ref={anchorEl}
        onClick={() => {
          setOpen(not);
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
            {intl.formatMessage({
              defaultMessage: 'General Settings',
              id: 'yuiyES',
            })}
          </Typography>
          <FormControlLabel
            value={dark}
            control={<Switch checked={dark} />}
            label={
              <Stack direction="row" spacing={1} flexGrow={1}>
                <Typography variant="label2">
                  {intl.formatMessage({
                    defaultMessage: 'Dark Mode',
                    id: '5ObBlW',
                  })}
                </Typography>
              </Stack>
            }
            labelPlacement="start"
            disableTypography
            onChange={() => {
              updateSettings(
                produce((state) => {
                  state.dark = !state.dark;
                }),
              );
            }}
            sx={{ width: 1 }}
          />
          <FormControlLabel
            value={showEmpty}
            control={<Switch checked={showEmpty} />}
            label={
              <Stack direction="row" spacing={1} flexGrow={1}>
                <Typography variant="label2">
                  {intl.formatMessage({
                    defaultMessage: 'Show Empty',
                    id: 'mqpAbT',
                  })}
                </Typography>
              </Stack>
            }
            labelPlacement="start"
            disableTypography
            onChange={() => {
              updateSettings(
                produce((state) => {
                  state.showEmpty = !state.showEmpty;
                }),
              );
            }}
            sx={{ width: 1 }}
          />
          <Stack
            width={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="label2">
              {intl.formatMessage({
                defaultMessage: 'Slippage',
                id: 'mQHAsW',
              })}
            </Typography>
            <SlippageButtonGroup
              value={slippage}
              onChange={(slip: number) => {
                updateSettings(
                  produce((state) => {
                    state.slippage = slip;
                  }),
                );
              }}
            />
          </Stack>
        </Stack>
      </ClickAwayMenu>
    </>
  );
};
