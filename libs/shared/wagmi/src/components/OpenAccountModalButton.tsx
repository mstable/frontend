import { useRef } from 'react';

import { useShowDialog } from '@frontend/shared-modals';
import { Button } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useIntl } from 'react-intl';

import { AccountLabel } from './AccountLabel';
import { ProfileDialog } from './ProfileDialog';

import type { ButtonProps } from '@mui/material';
import type { MouseEvent } from 'react';

export const OpenAccountModalButton = (props: ButtonProps) => {
  const intl = useIntl();
  const buttonRef = useRef(null);
  const showDialog = useShowDialog();

  const buttonProps: ButtonProps = {
    variant: 'text',
    color: 'inherit',
    sx: { maxWidth: 220 },
    ...props,
  };

  const handleClick =
    (handler: () => void) => (evt: MouseEvent<HTMLButtonElement>) => {
      if (props?.onClick) {
        props.onClick(evt);
      }
      handler();
    };

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => {
        if (!mounted || !account || !chain) {
          return (
            <Button {...buttonProps} onClick={handleClick(openConnectModal)}>
              {intl.formatMessage({ defaultMessage: 'Connect' })}
            </Button>
          );
        }

        if (chain.unsupported) {
          return (
            <Button
              {...buttonProps}
              onClick={handleClick(openChainModal)}
              color="warning"
            >
              {intl.formatMessage({ defaultMessage: 'Wrong Network' })}
            </Button>
          );
        }

        return (
          <Button
            {...buttonProps}
            ref={buttonRef}
            onClick={(evt: MouseEvent<HTMLButtonElement>) => {
              if (props?.onClick) {
                props.onClick(evt);
              }
              showDialog(ProfileDialog);
            }}
            sx={{ borderRadius: '32px', ...buttonProps?.sx }}
          >
            <AccountLabel />
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
