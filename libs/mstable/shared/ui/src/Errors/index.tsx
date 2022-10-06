import { RouterLink } from '@frontend/shared-ui';
import { OpenNetworkModalButton } from '@frontend/shared-wagmi';
import { Button, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNetwork, useSwitchNetwork } from 'wagmi';

import type { StackProps, TypographyProps } from '@mui/material';

export type UnsupportedMvPageProps = {
  mvid?: string;
};

export const UnsupportedMvPage = ({ mvid }: UnsupportedMvPageProps) => {
  const intl = useIntl();

  return (
    <Stack direction="column" py={18} alignItems="flex-start">
      <Typography variant="h1" pb={4}>
        {intl.formatMessage({ defaultMessage: 'Unsupported Meta Vault' })}
      </Typography>
      <Typography variant="h4" pb={8}>
        {intl.formatMessage(
          {
            defaultMessage:
              'This application does not support the Meta Vault {mvid}, pick one from our list.',
          },
          {
            mvid,
          },
        )}
      </Typography>
      <Button component={RouterLink} to="/">
        {intl.formatMessage({ defaultMessage: 'Explore Meta Vaults' })}
      </Button>
    </Stack>
  );
};

export const WrongNetworkPage = () => {
  const intl = useIntl();
  const { chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <Stack direction="column" py={18}>
      <Typography variant="h1" pb={4}>
        {intl.formatMessage({ defaultMessage: 'Unsupported Network' })}
      </Typography>
      <Typography variant="h4" pb={8}>
        {intl.formatMessage(
          {
            defaultMessage:
              'The selected network is not supported by this application, why not try {defaultChain}?',
          },
          {
            defaultChain: chains[0].name,
          },
        )}
      </Typography>
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
    </Stack>
  );
};

export type ErrorCardProps = {
  title: string;
  subtitle?: string;
  titleProps?: TypographyProps;
  subtitleProps?: TypographyProps;
} & StackProps;

export const ErrorCard = ({
  title,
  subtitle,
  titleProps,
  subtitleProps,
  ...rest
}: ErrorCardProps) => {
  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      width={1}
      height={1}
      {...rest}
    >
      <Typography variant="h4" pb={2} {...titleProps}>
        {title}
      </Typography>
      <Typography variant="subtitle1" pb={2}>
        {title}
      </Typography>
    </Stack>
  );
};
