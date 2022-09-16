import { useEffect, useMemo } from 'react';

import { erc4626ABI } from '@frontend/shared-constants';
import { usePrices } from '@frontend/shared-prices';
import { BigDecimal } from '@frontend/shared-utils';
import { Stack, Typography } from '@mui/material';
import { constants } from 'ethers';
import { pathOr } from 'ramda';
import { useIntl } from 'react-intl';
import {
  useAccount,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi';

import { useMetavault } from '../../../../../state';
import { useOperationLabel, useOperations } from '../../../hooks';

import type { StackProps } from '@mui/material';

const splitRow: StackProps = {
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'baseline',
};

export const OperationRecapContent = (props: StackProps) => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const { data: feeData } = useFeeData({ formatUnits: 'gwei' });
  const operationLabel = useOperationLabel();
  const { amount, operation, needsApproval } = useOperations();
  const {
    metavault: { address },
  } = useMetavault();
  const { address: walletAddress } = useAccount();
  const { price, symbol } = usePrices();

  const args = useMemo(
    () =>
      ({
        deposit: [amount?.exact, walletAddress],
        mint: [amount?.exact, walletAddress],
        withdraw: [amount?.exact, walletAddress, walletAddress],
        redeem: [amount?.exact, walletAddress, walletAddress],
      }[operation] || []),
    [amount?.exact, operation, walletAddress],
  );

  const { config: submitConfig, refetch: fetchSubmitConfig } =
    usePrepareContractWrite({
      addressOrName: address,
      contractInterface: erc4626ABI,
      functionName: operation,
      args,
      enabled: false,
    });

  useEffect(() => {
    if (!!amount?.exact && !!walletAddress && !needsApproval) {
      fetchSubmitConfig();
    }
  }, [amount?.exact, fetchSubmitConfig, needsApproval, walletAddress]);

  const estimatedGasAmount = pathOr(
    constants.Zero,
    ['request', 'gasLimit'],
    submitConfig,
  ).mul(feeData?.gasPrice ?? constants.Zero);
  const nativeTokenGasPrice = new BigDecimal(
    estimatedGasAmount,
    chain?.nativeCurrency?.decimals,
  );
  const fiatGasPrice = price * nativeTokenGasPrice?.simple;

  return (
    <Stack direction="column" {...props}>
      <Stack {...splitRow} mb={1}>
        <Typography>
          {intl.formatMessage({ defaultMessage: 'Current Gas' })}
        </Typography>
        <Typography variant="value5" fontWeight="bold">
          {feeData?.formatted?.gasPrice}&nbsp;
          {intl.formatMessage({ defaultMessage: 'GWEI' })}
        </Typography>
      </Stack>
      <Stack {...splitRow} mb={0.5}>
        <Typography>
          {intl.formatMessage(
            { defaultMessage: '{operationLabel} cost' },
            { operationLabel },
          )}
        </Typography>
        <Typography variant="value5" fontWeight="bold">
          {symbol}
          {(amount?.simple + fiatGasPrice).toFixed(2)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" mb={1}>
        <Typography variant="value4" fontWeight="fontWeightLight">
          {((amount?.simple + fiatGasPrice) / price).toFixed(8)}&nbsp;
          {chain?.nativeCurrency?.symbol}
        </Typography>
      </Stack>
    </Stack>
  );
};
