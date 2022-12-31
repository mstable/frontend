import { useState } from 'react';

import { createContainer } from 'react-tracked';

export const { Provider, useTracked } = createContainer(() => useState(0));
