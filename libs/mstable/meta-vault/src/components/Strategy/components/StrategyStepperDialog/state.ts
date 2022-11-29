import { useState } from 'react';

import { createContainer } from 'react-tracked';

import type { Step } from './types';

type State = {
  steps: Step[];
  activeStep: Step;
};

export const { Provider, useTrackedState, useUpdate } = createContainer(() =>
  useState<State>({
    steps: ['home', 'deposit', 'metavault', 'withdraw'],
    activeStep: 'home',
  }),
);
