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
              defaultMessage: 'Make sure your internet connection is working.',
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
            })}
            secondary={intl.formatMessage({
              defaultMessage:
                'Make sure your wallet is on Ethereum Mainnet network.',
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
            })}
            secondary={intl.formatMessage({
              defaultMessage: 'App supports Goerli Testnet.',
            })}
          />
        </ListItem>
      </List>
    </Stack>
  );
};
