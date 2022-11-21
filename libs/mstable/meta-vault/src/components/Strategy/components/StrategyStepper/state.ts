import { useState } from 'react';

import { createContainer } from 'react-tracked';

import type { Dispatch, SetStateAction } from 'react';

import type { Step } from './types';

type State = {
  step: Step;
};

export const { Provider, useTrackedState, useUpdate } = createContainer<
  State,
  Dispatch<SetStateAction<State>>,
  void
>(() =>
  useState({
    step: 'home',
  }),
);
