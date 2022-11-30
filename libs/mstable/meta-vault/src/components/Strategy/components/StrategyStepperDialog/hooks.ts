import { useCallback, useMemo } from 'react';

import produce from 'immer';
import { equals } from 'ramda';

import { useTrackedState, useUpdate } from './state';

import type { Step } from './types';

export const useSteps = () => {
  const { activeStep, steps } = useTrackedState();
  const update = useUpdate();

  const activeStepIdx = useMemo(
    () => steps.findIndex(equals(activeStep)),
    [activeStep, steps],
  );
  const isActiveFirst = useMemo(() => activeStepIdx === 0, [activeStepIdx]);
  const isActiveLast = useMemo(
    () => activeStepIdx === steps.length - 1,
    [activeStepIdx, steps.length],
  );

  const setStep = useCallback(
    (step: Step) => {
      update(
        produce((state) => {
          state.activeStep = step;
        }),
      );
    },
    [update],
  );

  const handleNext = useCallback(() => {
    update(
      produce((state) => {
        state.activeStep = steps[Math.min(steps.length - 1, activeStepIdx + 1)];
      }),
    );
  }, [activeStepIdx, steps, update]);

  const handlePrev = useCallback(() => {
    update(
      produce((state) => {
        state.activeStep = steps[Math.max(0, activeStepIdx - 1)];
      }),
    );
  }, [activeStepIdx, steps, update]);

  const handleReset = useCallback(() => {
    update(
      produce((state) => {
        state.activeStep = 'home';
      }),
    );
  }, [update]);

  return {
    steps,
    activeStep,
    activeStepIdx,
    isActiveFirst,
    isActiveLast,
    setStep,
    handleNext,
    handlePrev,
    handleReset,
  };
};
