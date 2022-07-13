import { Button, DialogTitle, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { chainId, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';

import type { DialogOptions } from '@frontend/shared-modals';

const Title = () => {
  const intl = useIntl();

  return (
    <DialogTitle>
      {intl.formatMessage({ defaultMessage: 'Unsupported Network' })}
    </DialogTitle>
  );
};

const Content = () => {
  const intl = useIntl();
  const { chain } = useNetwork();

  return (
    <Typography>
      {intl.formatMessage(
        {
          defaultMessage:
            'The selected network ({name}) is not supported by the application. You can either switch your wallet or reset to Ethereum mainnet.',
        },
        { name: chain?.name },
      )}
    </Typography>
  );
};

type ActionsProps = { onClose: () => void };

const Actions = ({ onClose }: ActionsProps) => {
  const intl = useIntl();
  const { switchNetwork } = useSwitchNetwork();
  const { disconnect } = useDisconnect();

  return (
    <>
      <Button
        onClick={() => {
          if (switchNetwork) {
            onClose();
            switchNetwork(chainId.mainnet);
          }
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Reset to Ethereum mainnet' })}
      </Button>
      <Button
        onClick={() => {
          if (disconnect) {
            onClose();
            disconnect();
          }
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Disconnect' })}
      </Button>
    </>
  );
};

export const UnsupportedNetworkDialog: DialogOptions = {
  title: <Title />,
  content: <Content />,
  actions: (onClose) => <Actions onClose={onClose} />,
};
