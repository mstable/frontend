import { useRef, useState } from 'react';

import { ClickAwayMenu, InfoTooltip } from '@frontend/shared-ui';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { Gear } from 'phosphor-react';
import { not } from 'ramda';
import { useIntl } from 'react-intl';

import { SlippageSelector } from './SlippageSelector';
import { TokenAllowanceSwitch } from './TokenAllowanceSwitch';

import type { ButtonProps } from '@mui/material';
import type { FC, ReactNode } from 'react';

interface TradingSettingsOptionProps {
  label: string;
  tooltipText: string;
  children?: ReactNode;
}

const TradingSettingsOption: FC<TradingSettingsOptionProps> = ({
  label,
  tooltipText,
  children,
}) => {
  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
        <Typography>{label}</Typography>
        <InfoTooltip size={14} label={tooltipText} />
      </Stack>
      {children}
    </div>
  );
};

export const TradingSettings: FC<ButtonProps> = (props) => {
  const intl = useIntl();
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
            tooltipText={intl.formatMessage({
              defaultMessage:
                'When the "Auto" option is selected, the app tests various slippage ranges by starting with lower values and gradually increasing until it reaches a point where the transaction is likely to succeed. <br></br> Alternatively, a custom slippage value can be set, but it is recommended to keep it within the range of 1-2%.',
              id: 'yap3X0',
            })}
          >
            <SlippageSelector />
          </TradingSettingsOption>
          <Divider flexItem />
          <TradingSettingsOption
            label={intl.formatMessage({
              defaultMessage: 'Token Approval',
              id: 'n9CFUs',
            })}
            tooltipText={intl.formatMessage({
              defaultMessage:
                'A deposit into a vault requires an approval transaction.<br></br><br></br>Set as infinite to avoid approving multiple times and save gas on subsequent deposits.<br></br><br></br>Deactiviting is safer, but would require approval on every subsequent deposit and hence results in higher gas cost.',
              id: '2fed1y',
            })}
          >
            <TokenAllowanceSwitch />
          </TradingSettingsOption>
        </Stack>
      </ClickAwayMenu>
    </>
  );
};
