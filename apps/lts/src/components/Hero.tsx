import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const Hero = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack justifyContent="center" alignItems="center" {...props}>
      <Typography variant="h1" py={4}>
        {intl.formatMessage({
          defaultMessage: 'mStable Withdraw',
          id: '/b/fRE',
        })}
      </Typography>
      <Typography>
        Collect all your <strong>mStable</strong> assets, easily.
      </Typography>
    </Stack>
  );
};
