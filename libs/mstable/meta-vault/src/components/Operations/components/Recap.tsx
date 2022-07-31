import { Divider, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import type { BigDecimal } from '@frontend/shared-utils';
import type { StackProps } from '@mui/material';
import type { FetchTokenResult } from '@wagmi/core';

export type RecapProps = {
  amount: BigDecimal | null;
  token: FetchTokenResult | null;
  previewShares: BigDecimal | null;
} & StackProps;

const splitRow: StackProps = {
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'baseline',
};

export const Recap = ({
  amount,
  token,
  previewShares,
  ...rest
}: RecapProps) => {
  const intl = useIntl();

  return (
    <Stack
      sx={{ backgroundColor: 'background.highlight', p: 2, borderRadius: 1 }}
    >
      <Typography variant="buttonLarge" mb={3}>
        {intl.formatMessage({ defaultMessage: 'Recap' })}
      </Typography>
      <Stack {...splitRow} mb={1}>
        <Typography>
          {intl.formatMessage({ defaultMessage: 'Your Deposit' })}
        </Typography>
        <Typography variant="value4">
          {amount?.format() ?? '-'}&nbsp;{token?.symbol}
        </Typography>
      </Stack>
      {/* <Stack {...splitRow} mb={0.5}>
        <Typography>
          {intl.formatMessage({ defaultMessage: 'Gas Fees' })}
        </Typography>
        <Typography variant="value4">$40.23</Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" mb={1}>
        <Typography variant="value4" fontWeight="fontWeightLight">
          0.003 ETH
        </Typography>
      </Stack> */}
      <Divider flexItem sx={{ my: 2, backgroundColor: 'grey.800' }} />
      <Stack {...splitRow}>
        <Typography>
          {intl.formatMessage({ defaultMessage: 'You Get' })}
        </Typography>
        <Typography variant="value4">
          {previewShares?.format() ?? '-'}&nbsp;
          {intl.formatMessage({ defaultMessage: 'Shares' })}
        </Typography>
      </Stack>
    </Stack>
  );
};
