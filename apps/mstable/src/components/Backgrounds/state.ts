import { useState } from 'react';

import { createContainer } from 'react-tracked';

export const { Provider, useTrackedState, useUpdate } = createContainer(() =>
  useState({ next: null }),
);
