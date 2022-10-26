import { ErrorPage, RouterLink } from '@frontend/shared-ui';
import { OpenNetworkModalButton } from '@frontend/shared-wagmi';
import { Button, Stack } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNetwork, useSwitchNetwork } from 'wagmi';

export type UnsupportedMvPageProps = {
  mvid?: string;
};

export const UnsupportedMvPage = ({ mvid }: UnsupportedMvPageProps) => {
  const intl = useIntl();

  return (
    <ErrorPage
      hideSupport
      title={intl.formatMessage({ defaultMessage: 'Unsupported Meta Vault' })}
      subtitle={intl.formatMessage(
        {
          defaultMessage:
            'This application does not support the Meta Vault {mvid}, pick one from our list.',
        },
        {
          mvid,
        },
      )}
      message={
        <Button component={RouterLink} to="/">
          {intl.formatMessage({ defaultMessage: 'Explore Meta Vaults' })}
        </Button>
      }
    />
  );
};

export const WrongNetworkPage = () => {
  const intl = useIntl();
  const { chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <ErrorPage
      hideSupport
      title={intl.formatMessage({ defaultMessage: 'Unsupported Network' })}
      subtitle={intl.formatMessage(
        {
          defaultMessage:
            'The selected network is not supported by this application, why not try {defaultChain}?',
        },
        {
          defaultChain: chains[0].name,
        },
      )}
      message={
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => {
              if (switchNetwork) {
                switchNetwork(chains[0].id);
              }
            }}
          >
            {intl.formatMessage(
              { defaultMessage: 'Switch to {defaultChain}' },
              { defaultChain: chains[0].name },
            )}
          </Button>
          <OpenNetworkModalButton color="primary">
            {intl.formatMessage({
              defaultMessage: 'Select from supported list',
            })}
          </OpenNetworkModalButton>
        </Stack>
      }
    />
  );
};
