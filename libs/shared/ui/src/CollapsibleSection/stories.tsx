import { LoremIpsum } from '@frontend/shared-storybook';
import { Stack } from '@mui/material';

import { CollapsibleSection as Comp } from './index';

export default {
  title: 'Components/CollapsibleSection',
  component: Comp,
};

export const CollapsibleSection = () => (
  <Stack width={400} border="1px dashed">
    <Comp title="Section title">
      <LoremIpsum />
    </Comp>
  </Stack>
);
