import { useState } from 'react';

import { createContainer } from 'react-tracked';

import type { FetchTokenResult } from '@wagmi/core';
import type { Dispatch, SetStateAction } from 'react';

type OperationsState = {
  amount?: number;
  inputToken?: FetchTokenResult;
};

const defaultInitialState: OperationsState = {};

export const { Provider, useSelector, useUpdate, useTrackedState } =
  createContainer<
    OperationsState,
    Dispatch<SetStateAction<OperationsState>>,
    { initialState?: Partial<OperationsState> }
  >(({ initialState }) =>
    useState({ ...defaultInitialState, ...initialState }),
  );
