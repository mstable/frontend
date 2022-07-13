import { useState } from 'react';

import { createContainer } from 'react-tracked';

import { formatLocale } from './utils';

import type { WithRequiredChildren } from '@frontend/shared-utils';
import type { Dispatch, SetStateAction } from 'react';

export const { Provider, useTrackedState, useUpdate } = createContainer<
  string,
  Dispatch<SetStateAction<string>>,
  WithRequiredChildren<{ initialState?: string }>
>(({ initialState }) =>
  useState(initialState ?? formatLocale(navigator.language)),
);
