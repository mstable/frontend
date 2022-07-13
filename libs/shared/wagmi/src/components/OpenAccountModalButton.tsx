import { useRef } from 'react';

import { useShowDialog } from '@frontend/shared-modals';
import { Button } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useIntl } from 'react-intl';

import { AccountLabel } from './AccountLabel';
import { ProfileDialog } from './ProfileDialog';

import type { ButtonProps } from '@mui/material';

const buttonProps: ButtonProps = {
  variant: 'text',
  color: 'inherit',
  sx: { maxWidth: 150 },
};

export const OpenAccountModalButton = () => {
  const intl = useIntl();
  const buttonRef = useRef(null);
  const showDialog = useShowDialog();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => (
        <div
          {...(!mounted && {
            'aria-hidden': true,
            style: {
              opacity: 0,
              pointerEvents: 'none',
              userSelect: 'none',
            },
          })}
        >
          {(() => {
            if (!mounted || !account || !chain) {
              return (
                <Button {...buttonProps} onClick={openConnectModal}>
                  {intl.formatMessage({ defaultMessage: 'Connect' })}
                </Button>
              );
            }

            if (chain.unsupported) {
              return (
                <Button
                  {...buttonProps}
                  onClick={openChainModal}
                  color="warning"
                >
                  {intl.formatMessage({ defaultMessage: 'Wrong Network' })}
                </Button>
              );
            }

            return (
              <Button
                ref={buttonRef}
                onClick={() => {
                  showDialog(ProfileDialog);
                }}
                {...buttonProps}
              >
                <AccountLabel />
              </Button>
            );
          })()}
        </div>
      )}
    </ConnectButton.Custom>
  );
};
