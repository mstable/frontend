import { Stack } from '@mui/material';

import { GlobalLoader as GComp, Spinner as SComp } from './index';

export default {
  title: 'Components/Loaders',
  subcomponents: { GlobalLoader: GComp, Spinner: SComp },
};

export const GlobalLoader = () => <GComp />;

export const Spinner = () => (
  <Stack width={300} height={200} border="1px dashed">
    <SComp />
  </Stack>
);
