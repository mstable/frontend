import { useCallback, useMemo } from 'react';

import { stepsLabels } from './constants';
import { useTracked } from './state';

// This diagram has 4 state steps:
// 0 - Welcome page
// 1 - Deposit
// 2 - Metavault
// 3 - Withdraw
const STEP_LENGTH = stepsLabels.length;

export const useSteps = () => {
  const [state, setState] = useTracked();

  const isFirst = useMemo(() => state === 0, [state]);
  const isLast = useMemo(() => state === STEP_LENGTH - 1, [state]);

  const handleNext = useCallback(() => {
    setState((state) => Math.min(STEP_LENGTH - 1, state + 1));
  }, [setState]);

  const handlePrev = useCallback(() => {
    setState((state) => Math.max(0, state - 1));
  }, [setState]);

  const handleReset = useCallback(() => {
    setState(0);
  }, [setState]);

  return {
    step: state,
    maxLength: STEP_LENGTH,
    isFirst,
    isLast,
    setStep: setState,
    label: useMemo(() => stepsLabels[state], [state]),
    handleNext,
    handlePrev,
    handleReset,
  };
};
