import { useEffect } from 'react';

import { Stack, useMediaQuery, useTheme } from '@mui/material';

import { AnimatedDiagram } from './components/AnimatedDiagram';
import { Controls } from './components/Controls';
import { MobileDiagram } from './components/MobileDiagram';
import { StepIndicator } from './components/StepIndicator';
import { StepLabel } from './components/StepLabel';
import { useSteps } from './hooks';
import { Provider } from './state';

export type DiagramStrategyProps = {
  onClose?: () => void;
};

const DiagramStrategyWrapped = ({ onClose }: DiagramStrategyProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { handleReset } = useSteps();

  useEffect(() => {
    handleReset();
  }, [handleReset]);

  return (
    <Stack direction="column" minHeight="60vh" pt={4} height={1}>
      {isMobile ? (
        <MobileDiagram flexGrow={1} />
      ) : (
        <AnimatedDiagram flexGrow={1} />
      )}
      <Stack direction="row" justifyContent="center" alignItems="center" my={3}>
        <StepIndicator />
      </Stack>
      <StepLabel minHeight={isMobile ? 260 : 150} />
      <Controls onClose={onClose} py={4} />
    </Stack>
  );
};

export const DiagramStrategy = (props: DiagramStrategyProps) => (
  <Provider>
    <DiagramStrategyWrapped {...props} />
  </Provider>
);
