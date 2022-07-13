import { Button } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import type { ButtonProps } from '@mui/material';

export const OpenNetworkModalButton = (props: ButtonProps) => (
  <ConnectButton.Custom>
    {({ chain, openChainModal, mounted }) => (
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
        <Button
          variant="text"
          color="inherit"
          {...props}
          onClick={openChainModal}
          disabled={!chain?.id}
        />
      </div>
    )}
  </ConnectButton.Custom>
);
