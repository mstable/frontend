import { AddressLabel } from '@frontend/shared-ui';
import { Stack, Typography } from '@mui/material';

import type { Contract } from '@frontend/lts-constants';
import type { StackProps } from '@mui/material';

export type ContractHeaderProps = {
  contract: Contract;
} & StackProps;

export const ContractHeader = ({ contract, ...rest }: ContractHeaderProps) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" {...rest}>
      <contract.icon sx={{ width: 44, height: 44 }} />
      <Stack>
        <Typography fontWeight="bold">{contract.name}</Typography>
        <AddressLabel
          address={contract.address}
          small
          link
          hideCopyToClipboard
          maxWidth={120}
        />
      </Stack>
    </Stack>
  );
};
