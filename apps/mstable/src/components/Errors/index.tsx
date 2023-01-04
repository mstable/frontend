import { OpenNetworkModalButton, useTrack } from '@frontend/shared-providers';
import { ErrorPage, NetworkTips, RouterLink } from '@frontend/shared-ui';
import { Button, Stack } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNetwork, useSwitchNetwork } from 'wagmi';

export const UnsupportedMvPage = () => {
  const intl = useIntl();
  const track = useTrack();

  return (
    <ErrorPage
      hideSupport
      title={intl.formatMessage({ defaultMessage: '404', id: 'DRXWXB' })}
      message={
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button component={RouterLink} to="/" color="secondary">
            {intl.formatMessage({ defaultMessage: 'Back', id: 'cyR7Kh' })}
          </Button>
        </Stack>
      }
      onMount={() => {
        track('error', { name: 'Unsupported Meta Vault' });
      }}
    />
  );
};

export const WrongNetworkPage = () => {
  const intl = useIntl();
  const track = useTrack();
  const { chains, chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <ErrorPage
      hideSupport
      title={intl.formatMessage({
        defaultMessage: 'Unsupported Network',
        id: 'PmkP1H',
      })}
      subtitle={intl.formatMessage(
        {
          defaultMessage:
            'The selected network is not supported by this application.',
          id: '+k7bPd',
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
              id: 'Bak2Yy',
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
              { defaultMessage: 'Switch to {defaultChain}', id: '1XVJUl' },
              { defaultChain: chains[0].name },
            )}
          </Button>
        </Stack>
      }
      tips={<NetworkTips />}
      onMount={() => {
        track('error', {
          name: 'Unsupported Network',
          chain: chain?.id ?? 'undefined',
        });
      }}
    />
  );
};
