import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useVault } from '../../../state';

import type { StackProps } from '@mui/material';

export const Strategies = (props: StackProps) => {
  const intl = useIntl();
  const { meta, config } = useVault();

  return (
    <Stack {...props} direction="column" spacing={1}>
      <Typography variant="body2" sx={{ color: 'text.secondary', pb: 2 }}>
        {intl.formatMessage(
          {
            defaultMessage:
              'The following strategy pipeline is used in {symbol}',
            id: 'FGu/VK',
          },
          {
            symbol: config.symbol,
          },
        )}
      </Typography>
      <Stack direction="column" spacing={2}>
        {meta.strategies.map(({ description }) => (
          <Stack
            key={description}
            direction="column"
            sx={{
              borderRadius: 1,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              padding: 2,
            }}
          >
            <Typography
              sx={{ typography: 'body2', paddingBottom: 2 }}
              color="text.secondary"
            >
              {description}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
