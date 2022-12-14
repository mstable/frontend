import { Testnet } from '@frontend/shared-icons';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Browsers, CurrencyEth, WifiX } from 'phosphor-react';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const ConnectionTips = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <Stack
      borderRadius={1}
      bgcolor="background.paper"
      alignItems="stretch"
      border={(theme) => `1px solid ${theme.palette.divider}`}
      p={2}
      {...props}
    >
      <Typography variant="h4" color="grey.600">
        {intl.formatMessage({
          defaultMessage: 'Tips',
          id: '6OuLVd',
        })}
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Browsers color={theme.palette.icons.color} size={24} />
          </ListItemIcon>
          <ListItemText
            primary={intl.formatMessage({
              defaultMessage: 'Check URL',
              id: 'y1NA43',
            })}
            secondary={intl.formatMessage({
              defaultMessage: 'Make sure you are on the right URL.',
              id: 'IdL95F',
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
              id: '/p1GSi',
            })}
            secondary={intl.formatMessage({
              defaultMessage: 'Make sure your internet connection is working.',
              id: 'RnacAD',
            })}
          />
        </ListItem>
      </List>
    </Stack>
  );
};

export const NetworkTips = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <Stack
      borderRadius={1}
      bgcolor="background.paper"
      alignItems="stretch"
      border={(theme) => `1px solid ${theme.palette.divider}`}
      p={2}
      {...props}
    >
      <Typography variant="h4" color="grey.600">
        {intl.formatMessage({
          defaultMessage: 'Tips',
          id: '6OuLVd',
        })}
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <CurrencyEth color={theme.palette.icons.color} size={24} />
          </ListItemIcon>
          <ListItemText
            primary={intl.formatMessage({
              defaultMessage: 'Wrong network selected',
              id: '2zD+V+',
            })}
            secondary={intl.formatMessage({
              defaultMessage:
                'Make sure your wallet is on Ethereum Mainnet network.',
              id: '+6JrYn',
            })}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <Testnet
              sx={{ color: theme.palette.icons.color, height: 24, width: 24 }}
            />
          </ListItemIcon>
          <ListItemText
            primary={intl.formatMessage({
              defaultMessage: 'Want to use a testnet?',
              id: '6z2ptx',
            })}
            secondary={intl.formatMessage({
              defaultMessage: 'App supports Goerli Testnet.',
              id: 'XYEIBG',
            })}
          />
        </ListItem>
      </List>
    </Stack>
  );
};
