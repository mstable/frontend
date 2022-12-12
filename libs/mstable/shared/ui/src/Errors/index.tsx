import { useEffect } from 'react';

import { useTrack } from '@frontend/shared-analytics';
import { ErrorPage, NetworkTips, RouterLink } from '@frontend/shared-ui';
import { ErrorCard } from '@frontend/shared-ui';
import { OpenNetworkModalButton } from '@frontend/shared-wagmi';
import { Button, Stack } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNetwork, useSwitchNetwork } from 'wagmi';

import type { ErrorCardProps, ErrorPageProps } from '@frontend/shared-ui';
import type { EventOptions } from 'plausible-tracker';

export type ErrorCardWithMessageProps = {
  errorProps?: EventOptions['props'];
} & ErrorCardProps;

export const ErrorCardWithMessage = ({
  errorProps,
  ...rest
}: ErrorCardWithMessageProps) => {
  const track = useTrack();

  useEffect(() => {
    track('error', errorProps);
  }, [errorProps, track]);

  return <ErrorCard {...rest} />;
};

export type ErrorPageWithMessageProps = {
  errorProps?: EventOptions['props'];
} & ErrorPageProps;

export const ErrorPageWithMessage = ({
  errorProps,
  ...rest
}: ErrorPageWithMessageProps) => {
  const track = useTrack();

  useEffect(() => {
    track('error', errorProps);
  }, [errorProps, track]);

  return <ErrorPage {...rest} />;
};

export const UnsupportedMvPage = () => {
  const intl = useIntl();

  return (
    <ErrorPageWithMessage
      hideSupport
      title={intl.formatMessage({ defaultMessage: '404', id: 'DRXWXB' })}
      message={
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button component={RouterLink} to="/" color="secondary">
            {intl.formatMessage({ defaultMessage: 'Back', id: 'cyR7Kh' })}
          </Button>
        </Stack>
      }
      errorProps={{ name: 'Unsupported Meta Vault' }}
    />
  );
};

export const WrongNetworkPage = () => {
  const intl = useIntl();
  const { chains, chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <ErrorPageWithMessage
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
      errorProps={{ name: 'Unsupported Network', chain: chain?.id }}
    />
  );
};
