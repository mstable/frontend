import { AddressLabel } from '@frontend/shared-ui';
import { Button, Stack } from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';

import { AccountLabel } from './AccountLabel';

import type { DialogOptions } from '@frontend/shared-modals';

const Content = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const intl = useIntl();

  return (
    <Stack direction="column" spacing={2} sx={{ pt: 4 }}>
      <AccountLabel
        responsive={false}
        namePlaceholder={intl.formatMessage({
          defaultMessage: 'Connected User',
          id: 'X0zKZO',
        })}
        components={{
          avatar: { sx: { width: 36, height: 36 } },
          name: { variant: 'h5' },
        }}
      />
      <AddressLabel
        address={address}
        blockExplorerUrl={chain?.blockExplorers?.['etherscan']?.url}
      />
    </Stack>
  );
};

type ActionsProps = { onClose: () => void };

const Actions = ({ onClose }: ActionsProps) => {
  const intl = useIntl();
  const { disconnect } = useDisconnect();

  return (
    <Button
      onClick={() => {
        onClose();
        disconnect();
      }}
    >
      {intl.formatMessage({ defaultMessage: 'Disconnect', id: 'qj1uhz' })}
    </Button>
  );
};

export const ProfileDialog: DialogOptions = {
  content: (onClose) => <Content />,
  actions: (onClose) => <Actions onClose={onClose} />,
};
