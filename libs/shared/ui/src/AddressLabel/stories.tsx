import { Stack } from '@mui/material';

import { AddressLabel as Comp } from './index';

export default {
  title: 'Components/Address Label',
  component: Comp,
};

const address = '0xe76be9c1e12416d6bc6b63d8031729747910c4f4';

export const AddressLabel = () => (
  <Stack direction="column" spacing={2} p={2} width={400}>
    <Comp address={address} />
    <Comp address={address} hideCopyToClipboard />
    <Comp address={address} hideEtherscan />
  </Stack>
);
