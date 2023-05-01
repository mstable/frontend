import { OpenAccountModalButton } from '@frontend/shared-providers';
import { MotionStack } from '@frontend/shared-ui';
import { Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import type { MotionStackProps } from '@frontend/shared-ui';

export const Welcome = (props: MotionStackProps) => {
  const intl = useIntl();

  return (
    <MotionStack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Typography>
        {intl.formatMessage({
          defaultMessage:
            'Connect your wallet to easily access your remaining balances and initiate the withdrawal process.',
          id: 'aBbsWU',
        })}
      </Typography>
      <OpenAccountModalButton sx={{ maxWidth: 180, maxHeight: 36, px: 1 }} />
    </MotionStack>
  );
};
