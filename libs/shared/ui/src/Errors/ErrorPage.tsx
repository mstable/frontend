import { DISCORD_SUPPORT } from '@frontend/shared-constants';
import { Link, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';
import type { ReactNode } from 'react';

export type ErrorPageProps = {
  title?: string;
  subtitle?: string;
  message?: ReactNode;
  hideSupport?: boolean;
} & StackProps;

export const ErrorPage = ({
  title,
  subtitle,
  message,
  hideSupport,
  ...rest
}: ErrorPageProps) => {
  const intl = useIntl();

  return (
    <Stack direction="column" py={18} alignItems="flex-start" {...rest}>
      <Typography variant="h1" py={4}>
        {title ??
          intl.formatMessage({
            defaultMessage: 'Unhandled Error!',
          })}
      </Typography>
      <Typography variant="h4" pb={8}>
        {subtitle ??
          intl.formatMessage({
            defaultMessage:
              'There was an error while loading this page, you can try to reload.',
          })}
      </Typography>
      {message}
      {!hideSupport && (
        <Typography variant="label2">
          {intl.formatMessage(
            {
              defaultMessage:
                'If the problem persists, you can contact us through our {support}.',
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
