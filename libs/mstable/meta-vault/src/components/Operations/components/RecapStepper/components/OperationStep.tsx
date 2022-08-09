import { Stack, Step, StepContent, StepLabel, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useFeeData } from 'wagmi';

import { useOperationLabel } from '../../../hooks';

import type { StackProps, StepProps } from '@mui/material';

const splitRow: StackProps = {
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'baseline',
};

export const OperationStep = (props: StepProps) => {
  const intl = useIntl();
  const operationLabel = useOperationLabel();
  const { data } = useFeeData({ formatUnits: 'gwei' });

  return (
    <Step {...props}>
      <StepLabel>{operationLabel}</StepLabel>
      <StepContent>
        <Stack {...splitRow} mb={1}>
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Current Gas' })}
          </Typography>
          <Typography variant="value5" fontWeight="bold">
            {data?.formatted?.gasPrice}&nbsp;
            {intl.formatMessage({ defaultMessage: 'GWEI' })}
          </Typography>
        </Stack>
      </StepContent>
    </Step>
  );
};
