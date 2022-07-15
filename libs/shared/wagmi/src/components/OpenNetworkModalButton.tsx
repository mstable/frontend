import { Button } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { CurrentNetworkIcon } from './CurrentNetworkIcon';

import type { ButtonProps } from '@mui/material';

export const OpenNetworkModalButton = (props: ButtonProps) => (
  <ConnectButton.Custom>
    {({ chain, openChainModal }) => (
      <Button
        variant="text"
        color="inherit"
        {...props}
        onClick={openChainModal}
        disabled={!chain?.id}
      >
        <CurrentNetworkIcon />
      </Button>
    )}
  </ConnectButton.Custom>
);
