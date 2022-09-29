import { useState } from 'react';

import { BigDecimal } from '@frontend/shared-utils';
import { Stack } from '@mui/material';

import { BigDecimalInput } from '../FormControls';
import { HighlightUpdate as HU, MiddleTruncated as MT } from './index';

export default {
  title: 'Components/Typography',
  subcomponents: { MiddleTruncated: MT, HighlightUpdate: HU },
};

const address = '0xe76be9c1e12416d6bc6b63d8031729747910c4f4';

export const MiddleTruncated = () => (
  <Stack
    direction="column"
    spacing={2}
    p={2}
    width={1 / 4}
    height={200}
    border="1px dashed"
  >
    <MT>{address}</MT>
    <MT end={8}>{address}</MT>
  </Stack>
);

export const HighlightUpdate = () => {
  const [value, setValue] = useState(BigDecimal.ZERO);

  return (
    <Stack direction="column" spacing={2} p={2}>
      <BigDecimalInput value={value} onChange={setValue} />
      <HU value={value} />
    </Stack>
  );
};
