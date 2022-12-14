import { ProtocolIcon } from '@frontend/shared-ui';
import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useMetavault } from '../../../state';

import type { StackProps } from '@mui/material';

export const Protocols = (props: StackProps) => {
  const intl = useIntl();
  const {
    metavault: { strategies },
  } = useMetavault();

  return (
    <Stack {...props} direction="column" spacing={1}>
      <Typography variant="body2" sx={{ color: 'text.secondary', pb: 2 }}>
        {intl.formatMessage({
          defaultMessage:
            'The following protocols are used in the strategies and are therefore exposed to their risk:',
          id: 'bvmoAt',
        })}
      </Typography>
      <Stack direction="column" spacing={2}>
        {strategies.map(({ protocol, strategy }) => (
          <Stack
            key={protocol.id}
            direction="column"
            sx={{
              borderRadius: 1,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              padding: 2,
            }}
          >
            <Stack direction="row" spacing={1} mb={2} alignItems="center">
              <ProtocolIcon name={protocol.id} />
              <Typography variant="h5">{protocol.name}</Typography>
            </Stack>

            <Typography
              sx={{ typography: 'body2', paddingBottom: 2 }}
              color="text.secondary"
            >
              {intl.formatMessage(protocol.description)}
            </Typography>
            <Typography sx={{ typography: 'body2' }}>
              {intl.formatMessage(strategy)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
