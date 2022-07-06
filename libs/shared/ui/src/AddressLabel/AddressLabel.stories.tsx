import { Stack } from '@mui/material';

import { AddressLabel as Label } from './index';

export default {
  title: 'Components/Address Label',
};

const address = '0xe76be9c1e12416d6bc6b63d8031729747910c4f4';

export const AddressLabel = () => (
  <Stack direction="column" spacing={2} p={2} width={400}>
    <Label address={address} />
    <Label address={address} hideCopyToClipboard />
    <Label address={address} hideEtherscan />
  </Stack>
);
