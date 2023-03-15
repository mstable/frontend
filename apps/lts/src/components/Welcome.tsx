import { OpenAccountModalButton } from '@frontend/shared-providers';
import { MotionStack } from '@frontend/shared-ui';
import { Typography } from '@mui/material';

import type { MotionStackProps } from '@frontend/shared-ui';

export const Welcome = (props: MotionStackProps) => {
  return (
    <MotionStack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      minHeight="25vh"
      {...props}
    >
      <Typography>Connect your wallet to start</Typography>
      <OpenAccountModalButton sx={{ maxWidth: 180, maxHeight: 36, px: 1 }} />
    </MotionStack>
  );
};
