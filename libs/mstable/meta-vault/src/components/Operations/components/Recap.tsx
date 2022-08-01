import { usePrices } from '@frontend/shared-prices';
import { BigDecimal } from '@frontend/shared-utils';
import { Divider, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNetwork } from 'wagmi';

import type { StackProps } from '@mui/material';
import type { FetchTokenResult } from '@wagmi/core';
import type { BigNumber } from 'ethers';

export type RecapProps = {
  amount: BigDecimal | null;
  token: FetchTokenResult | null;
  previewShares: BigDecimal | null;
  estimatedGas: BigNumber | null;
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
  estimatedGas,
  ...rest
}: RecapProps) => {
  const intl = useIntl();
  const { price, symbol } = usePrices();
  const { chain } = useNetwork();

  const nativeTokenGasPrice =
    estimatedGas && chain?.nativeCurrency?.decimals
      ? new BigDecimal(estimatedGas, chain.nativeCurrency.decimals)
      : null;
  const fiatGasPrice =
    nativeTokenGasPrice && price ? price * nativeTokenGasPrice.simple : null;

  return (
    <Stack
      {...rest}
      sx={{
        backgroundColor: 'background.highlight',
        p: 2,
        borderRadius: 1,
        ...rest?.sx,
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
          {previewShares?.format() ?? '-'}&nbsp;
          {intl.formatMessage({ defaultMessage: 'Shares' })}
        </Typography>
      </Stack>
    </Stack>
  );
};
