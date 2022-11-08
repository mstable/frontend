import { Button, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';

import type { DialogOptions } from '@frontend/shared-modals';

const Title = () => {
  const intl = useIntl();

  return <>{intl.formatMessage({ defaultMessage: 'Unsupported Network' })}</>;
};

const Content = () => {
  const intl = useIntl();
  const { chains } = useNetwork();

  return (
    <Typography>
      {intl.formatMessage(
        {
          defaultMessage:
            'The selected network is not supported by the application. You can either switch your wallet or reset to {defaultChain}.',
        },
        { defaultChain: chains[0].name },
      )}
    </Typography>
  );
};

type ActionsProps = { onClose: () => void };

const Actions = ({ onClose }: ActionsProps) => {
  const intl = useIntl();
  const { switchNetwork } = useSwitchNetwork();
  const { disconnect } = useDisconnect();
  const { chains } = useNetwork();

  return (
    <>
      <Button
        variant="text"
        onClick={() => {
          if (disconnect) {
            onClose();
            disconnect();
          }
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Disconnect' })}
      </Button>
      <Button
        color="primary"
        onClick={() => {
          if (switchNetwork) {
            onClose();
            switchNetwork(chains[0].id);
          }
        }}
      >
        {intl.formatMessage(
          { defaultMessage: 'Switch to {defaultChain}' },
          { defaultChain: chains[0].name },
        )}
      </Button>
    </>
  );
};

export const UnsupportedNetworkDialog: DialogOptions = {
  title: <Title />,
  content: <Content />,
  actions: (onClose) => <Actions onClose={onClose} />,
};
