import { useState } from 'react';

import { createContainer } from 'react-tracked';

import { getRandomDataSet } from './utils';

export const {
  Provider: DataSetsProvider,
  useTrackedState: useDataSets,
  useUpdate,
} = createContainer(() => useState([getRandomDataSet()]));
