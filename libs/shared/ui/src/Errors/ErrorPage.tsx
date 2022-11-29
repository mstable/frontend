import { DISCORD_SUPPORT } from '@frontend/shared-constants';
import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Browsers, WifiX } from 'phosphor-react';
import { useIntl } from 'react-intl';

import type { PaletteMode, StackProps } from '@mui/material';
import type { ReactNode } from 'react';

export type ErrorPageProps = {
  title?: string;
  subtitle?: string;
  message?: ReactNode;
  hideSupport?: boolean;
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
  ...rest
}: ErrorPageProps) => {
  const intl = useIntl();
  const theme = useTheme();

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
      <Stack direction="column" width={1 / 2} p={4}>
        <Stack
          borderRadius={1}
          bgcolor="background.paper"
          alignItems="stretch"
          border={(theme) => `1px solid ${theme.palette.divider}`}
          p={2}
        >
          <Typography variant="h4" color="grey.600">
            {intl.formatMessage({
              defaultMessage: 'Tips',
            })}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Browsers color={theme.palette.icons.color} size={24} />
              </ListItemIcon>
              <ListItemText
                primary={intl.formatMessage({ defaultMessage: 'Check URL' })}
                secondary={intl.formatMessage({
                  defaultMessage: 'Make sure you are on the right URL.',
                })}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <WifiX color={theme.palette.icons.color} size={24} />
              </ListItemIcon>
              <ListItemText
                primary={intl.formatMessage({
                  defaultMessage: 'Check connectivity',
                })}
                secondary={intl.formatMessage({
                  defaultMessage:
                    'Make sure your internet connection is working.',
                })}
              />
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </Stack>
  );
};
