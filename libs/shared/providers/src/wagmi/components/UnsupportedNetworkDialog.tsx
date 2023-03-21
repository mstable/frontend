import { NetworkTips } from '@frontend/shared-ui';
import { Button, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNetwork, useSwitchNetwork } from 'wagmi';

import type { DialogOptions } from '../../modals';

const Title = () => {
  const intl = useIntl();

  return (
    <>
      {intl.formatMessage({
        defaultMessage: 'Unsupported Network',
        id: 'PmkP1H',
      })}
    </>
  );
};

const Content = () => {
  const intl = useIntl();

  return (
    <Stack direction="column" spacing={3}>
      <Typography>
        {intl.formatMessage({
          defaultMessage:
            'The selected network is not supported by the application.',
          id: '6GZbSi',
        })}
      </Typography>
      <NetworkTips />
    </Stack>
  );
};

type ActionsProps = { onClose: () => void };

const Actions = ({ onClose }: ActionsProps) => {
  const intl = useIntl();
  const { switchNetwork } = useSwitchNetwork();
  const { chains } = useNetwork();

  return (
    <>
      <Button color="secondary" onClick={onClose}>
        {intl.formatMessage({ defaultMessage: 'Close', id: 'rbrahO' })}
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
          { defaultMessage: 'Switch to {defaultChain}', id: '1XVJUl' },
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
