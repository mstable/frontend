import { DISCORD_SUPPORT } from '@frontend/shared-constants';
import { Button, Link, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { ConnectionTips } from './ErrorTips';

import type { PaletteMode, StackProps } from '@mui/material';
import type { ReactNode } from 'react';

export type ErrorPageProps = {
  title?: string;
  subtitle?: string;
  message?: ReactNode;
  hideSupport?: boolean;
  tips?: ReactNode;
} & StackProps;

const colorGradient = (mode: PaletteMode) =>
  mode === 'light'
    ? `linear-gradient(90deg, #D1C6FF 2.1%, #6A67CB 27.6%)`
    : `linear-gradient(90deg, #D1C6FF 2.1%, #6A67CB 27.6%)`;

export const ErrorPage = ({
  title,
  subtitle,
  message,
  hideSupport,
  tips,
  ...rest
}: ErrorPageProps) => {
  const intl = useIntl();

  return (
    <Stack direction="row" py={18} {...rest}>
      <Stack direction="column" alignItems="flex-start" width={1 / 2}>
        <Typography
          py={4}
          sx={(theme) => ({
            fontSize: 64,
            fontWeight: 800,
            lineHeight: '64px',
            background: colorGradient(theme.palette.mode),
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })}
        >
          {title ??
            intl.formatMessage({
              defaultMessage: 'Unhandled Error!',
            })}
        </Typography>
        <Typography variant="h4" pb={8} color="grey.600">
          {subtitle ??
            intl.formatMessage({
              defaultMessage: 'Oops, something went wrong.',
            })}
        </Typography>
        {message}
        {!hideSupport && (
          <Stack direction="column" spacing={4} alignItems="flex-start">
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
            <Button
              onClick={() => {
                window.location.reload();
              }}
            >
              {intl.formatMessage({ defaultMessage: 'Reload Page' })}
            </Button>
          </Stack>
        )}
      </Stack>
      <Stack direction="column" width={1 / 2} p={4}>
        {tips ?? <ConnectionTips />}
      </Stack>
    </Stack>
  );
};
