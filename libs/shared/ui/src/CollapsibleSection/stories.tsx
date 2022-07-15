import { Stack, Typography } from '@mui/material';

import { CollapsibleSection as Comp } from './index';

export default {
  title: 'Components/CollapsibleSection',
  component: Comp,
};

const Content = () => <Typography>This is section content</Typography>;

export const CollapsibleSection = () => (
  <Stack direction="column" spacing={2} p={2} width={400}>
    <Comp title="Section title">
      <Content />
    </Comp>
  </Stack>
);
