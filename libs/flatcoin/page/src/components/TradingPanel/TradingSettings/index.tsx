import { useRef, useState } from 'react';

import { ClickAwayMenu, TradingSettingsOption } from '@frontend/shared-ui';
import { Button, Divider, Stack } from '@mui/material';
import { Gear } from 'phosphor-react';
import { not } from 'ramda';
import { useIntl } from 'react-intl';

import { useIsLeveragedType } from '../../../hooks';
import { SlippageInput } from './SlippageInput';
import { TokenApprovalSwitch } from './TokenApprovalSwitch';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

export const TradingSettings: FC<ButtonProps> = (props) => {
  const intl = useIntl();
  const isLeveraged = useIsLeveragedType();
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);

  return (
    <>
      <Button
        {...props}
        ref={anchorEl}
        onClick={() => {
          setOpen(not);
        }}
        variant="text"
        sx={{ p: 0, ...props?.sx }}
        disabled={isLeveraged}
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
        PopperProps={{ sx: { zIndex: 10 } }}
      >
        <Stack
          alignItems="flex-start"
          spacing={2}
          sx={{ minWidth: { sm: 250 } }}
        >
          <TradingSettingsOption
            label={intl.formatMessage({
              defaultMessage: 'Slippage Tolerance',
              id: 'X/RW9w',
            })}
          >
            <SlippageInput mt={1} />
          </TradingSettingsOption>
          <Divider flexItem />
          <TradingSettingsOption
            label={intl.formatMessage({
              defaultMessage: 'Token Approval',
              id: 'n9CFUs',
            })}
          >
            <TokenApprovalSwitch />
          </TradingSettingsOption>
        </Stack>
      </ClickAwayMenu>
    </>
  );
};
