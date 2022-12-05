import { Stack, styled, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';

import { useSteps } from '../hooks';

import type { StackProps } from '@mui/material';

export const VBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

export const HBox = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StepLabel = (props: StackProps) => {
  const intl = useIntl();
  const { label } = useSteps();

  return (
    <Stack justifyContent="center" alignItems="center" spacing={3} {...props}>
      <Typography variant="h3" textAlign="center" maxWidth={1 / 2}>
        {intl.formatMessage(label.title)}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        maxWidth={2 / 3}
        textAlign="center"
      >
        {intl.formatMessage(label.subtitle)}
      </Typography>
    </Stack>
  );
};
