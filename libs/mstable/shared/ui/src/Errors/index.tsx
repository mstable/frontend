import { ErrorPage, NetworkTips, RouterLink } from '@frontend/shared-ui';
import { OpenNetworkModalButton } from '@frontend/shared-wagmi';
import { Button, Stack } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNetwork, useSwitchNetwork } from 'wagmi';

export const UnsupportedMvPage = () => {
  const intl = useIntl();

  return (
    <ErrorPage
      hideSupport
      title={intl.formatMessage({ defaultMessage: '404' })}
      message={
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button component={RouterLink} to="/" color="secondary">
            {intl.formatMessage({ defaultMessage: 'Back' })}
          </Button>
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Reload Page' })}
          </Button>
        </Stack>
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
            'The selected network is not supported by this application.',
        },
        {
          defaultChain: chains[0].name,
        },
      )}
      message={
        <Stack direction="row" alignItems="center" spacing={2}>
          <OpenNetworkModalButton color="secondary" variant="contained">
            {intl.formatMessage({
              defaultMessage: 'Select from supported list',
            })}
          </OpenNetworkModalButton>
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
        </Stack>
      }
      tips={<NetworkTips />}
    />
  );
};
