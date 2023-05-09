import { Box, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useTrackedState } from '../state';

import type { StackProps } from '@mui/material';

type IndicatorProps = {
  step: number;
  label: string;
  visited: boolean;
} & StackProps;

const Indicator = ({ step, label, visited, ...rest }: IndicatorProps) => (
  <Stack alignItems="center" spacing={2} height={150} zIndex={2} {...rest}>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      width={40}
      height={40}
      border={(theme) => `1px solid ${theme.palette.divider}`}
      bgcolor={visited ? 'info.main' : 'divider'}
    >
      <Typography variant="h4">{step}</Typography>
    </Box>
    <Typography maxWidth={100} textAlign="center">
      {label}
    </Typography>
  </Stack>
);

export const StepIndicator = (props: StackProps) => {
  const intl = useIntl();
  const { step } = useTrackedState();

  return (
    <Stack
      direction="row"
      spacing={30}
      sx={(theme) => ({
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        '::after': {
          position: 'absolute',
          content: '""',
          top: 20,
          left: 0,
          height: 2,
          width: '90%',
          background:
            step > 0 ? theme.palette.info.main : theme.palette.divider,
        },
      })}
      {...props}
    >
      <Indicator
        step={1}
        label={intl.formatMessage({ defaultMessage: 'Burn', id: 'sUIPLS' })}
        visited={step + 1 >= 1}
      />
      <Indicator
        step={2}
        label={intl.formatMessage({
          defaultMessage: 'Withdraw to stables',
          id: 'xfMpIF',
        })}
        visited={step + 1 >= 2}
      />
    </Stack>
  );
};
