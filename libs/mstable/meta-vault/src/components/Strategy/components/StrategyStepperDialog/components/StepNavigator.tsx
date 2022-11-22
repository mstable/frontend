import { Box, IconButton, Stack } from '@mui/material';
import { CaretLeft, CaretRight } from 'phosphor-react';

import { useSteps } from '../hooks';

import type { BoxProps, StackProps } from '@mui/material';

export type StepNavigatorProps = {
  containerProps?: BoxProps;
  hideNavigation?: boolean;
} & StackProps;

export const StepNavigator = ({
  children,
  containerProps,
  hideNavigation,
  ...rest
}: StepNavigatorProps) => {
  const { handlePrev, handleNext, isActiveFirst, isActiveLast } = useSteps();

  return (
    <Stack direction="row" {...rest}>
      {!hideNavigation && (
        <Stack display="flex" justifyContent="center" alignItems="center">
          <IconButton onClick={handlePrev} disabled={isActiveFirst}>
            <CaretLeft />
          </IconButton>
        </Stack>
      )}
      <Box flexGrow={1} px={2} {...containerProps}>
        {children}
      </Box>
      {!hideNavigation && (
        <Stack display="flex" justifyContent="center" alignItems="center">
          <IconButton onClick={handleNext} disabled={isActiveLast}>
            <CaretRight />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};
