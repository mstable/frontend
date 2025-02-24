import { useIsMobile } from '@frontend/shared-hooks';
import { Box, Stack, Typography } from '@mui/material';

import { useTrackedState } from '../state';

import type { StackProps } from '@mui/material';

type IndicatorProps = {
  step: number;
  label: string;
  visited: boolean;
} & StackProps;

const Indicator = ({ step, label, visited, ...rest }: IndicatorProps) => (
  <Stack alignItems="center" spacing={1} height={100} zIndex={2} {...rest}>
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
      <Typography variant="h5">{step}</Typography>
    </Box>
    <Typography textAlign="center">{label}</Typography>
  </Stack>
);

export const StepIndicator = (props: StackProps) => {
  const isMobile = useIsMobile();
  const { step } = useTrackedState();

  return (
    <Stack
      direction="row"
      spacing={15}
      sx={(theme) => ({
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        '::after': {
          position: 'absolute',
          content: '""',
          top: 20,
          left: isMobile ? 15 : 70,
          height: 2,
          width: '70%',
          background:
            step > 0 ? theme.palette.info.main : theme.palette.divider,
        },
      })}
      {...props}
    >
      <Indicator
        step={1}
        label="Burn"
        visited={step + 1 >= 1}
        width={isMobile ? undefined : 170}
      />
      <Indicator
        step={2}
        label="Withdraw to stables"
        visited={step + 1 >= 2}
        width={isMobile ? undefined : 170}
      />
    </Stack>
  );
};
