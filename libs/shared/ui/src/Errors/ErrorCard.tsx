import { DISCORD_SUPPORT } from '@frontend/shared-constants';
import { alpha, Link, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';
import type { ReactNode } from 'react';

export type ErrorCardProps = {
  title?: string;
  subtitle?: string;
  message?: ReactNode;
  hideSupport?: boolean;
} & StackProps;

export const ErrorCard = ({
  title,
  subtitle,
  message,
  hideSupport,
  ...rest
}: ErrorCardProps) => {
  const intl = useIntl();

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
          })}
      </Typography>
      <Typography pb={2}>
        {subtitle ??
          intl.formatMessage({
            defaultMessage:
              'There was an error while loading this component, you can try to reload.',
          })}
      </Typography>
      {message}
      {!hideSupport && (
        <Typography variant="label2">
          {intl.formatMessage(
            {
              defaultMessage:
                'If the problem persists, contact us on our {support}.',
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
