import { DISCORD_SUPPORT } from '@frontend/shared-constants';
import { alpha, Link, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useMount } from 'react-use';

import type { StackProps } from '@mui/material';
import type { Dispatch, ReactNode } from 'react';

export type ErrorCardProps = {
  title?: string;
  subtitle?: string;
  message?: ReactNode;
  hideSupport?: boolean;
  onMount?: Dispatch<void>;
} & StackProps;

export const ErrorCard = ({
  title,
  subtitle,
  message,
  hideSupport,
  onMount,
  ...rest
}: ErrorCardProps) => {
  const intl = useIntl();

  useMount(() => {
    if (onMount) onMount();
  });

  return (
    <Stack
      {...rest}
      sx={{
        p: 4,
        borderRadius: 1,
        boxShadow: 1,
        backgroundColor: (theme) =>
          alpha(theme.palette.background.default, 0.5),
        backdropFilter: 'blur(20px)',
        ...rest?.sx,
      }}
    >
      <Typography variant="h4" pb={3}>
        {title ??
          intl.formatMessage({
            defaultMessage: 'Unhandled Error!',
            id: '9ghOJK',
          })}
      </Typography>
      <Typography pb={2}>
        {subtitle ??
          intl.formatMessage({
            defaultMessage:
              'There was an error while loading this component, you can try to reload.',
            id: '8XZjyW',
          })}
      </Typography>
      {message}
      {!hideSupport && (
        <Typography variant="label2">
          {intl.formatMessage(
            {
              defaultMessage:
                'If the problem persists, contact us on our {support}.',
              id: 'UlMgTq',
            },
            {
              support: (
                <Link
                  href={DISCORD_SUPPORT}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {intl.formatMessage({
                    defaultMessage: 'Discord support channel',
                    id: '9lt7g1',
                  })}
                </Link>
              ),
            },
          )}
        </Typography>
      )}
    </Stack>
  );
};
