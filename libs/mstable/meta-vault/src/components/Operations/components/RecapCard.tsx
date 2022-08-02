import { usePrices } from '@frontend/shared-prices';
import { Divider, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNetwork } from 'wagmi';

import { useEstimateGas, useOperations, usePreview } from '../hooks';

import type { StackProps } from '@mui/material';

const splitRow: StackProps = {
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'baseline',
};

export const RecapCard = (props: StackProps) => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const { symbol } = usePrices();
  const { amount, token } = useOperations();
  const { preview } = usePreview();
  const { fiatGasPrice, nativeTokenGasPrice } = useEstimateGas();

  return (
    <Stack
      {...props}
      sx={{
        backgroundColor: 'background.highlight',
        p: 2,
        borderRadius: 1,
        ...props?.sx,
      }}
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
      <Stack {...splitRow} mb={0.5}>
        <Typography>
          {intl.formatMessage({ defaultMessage: 'Gas Fees' })}
        </Typography>
        <Typography variant="value4">
          {fiatGasPrice?.toFixed(2) ?? '-'}&nbsp;{symbol}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" mb={1}>
        <Typography variant="value4" fontWeight="fontWeightLight">
          {nativeTokenGasPrice?.toFixed(8) ?? '-'}&nbsp;
          {chain?.nativeCurrency?.symbol}
        </Typography>
      </Stack>
      <Divider flexItem sx={{ my: 2, backgroundColor: 'grey.800' }} />
      <Stack {...splitRow}>
        <Typography>
          {intl.formatMessage({ defaultMessage: 'You Get' })}
        </Typography>
        <Typography variant="value4">
          {preview?.format() ?? '-'}&nbsp;
          {intl.formatMessage({ defaultMessage: 'Shares' })}
        </Typography>
      </Stack>
    </Stack>
  );
};
