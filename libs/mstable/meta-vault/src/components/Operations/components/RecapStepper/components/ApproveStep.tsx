import { useEffect, useState } from 'react';

import { usePushNotification } from '@frontend/shared-notifications';
import { usePrices } from '@frontend/shared-prices';
import { InfoTooltip } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Button,
  CircularProgress,
  Link,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Switch,
  Typography,
} from '@mui/material';
import { constants } from 'ethers';
import { pathOr } from 'ramda';
import { useIntl } from 'react-intl';
import {
  erc20ABI,
  etherscanBlockExplorers,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { useMetavault } from '../../../../../state';
import { useOperations } from '../../../hooks';

import type { StackProps, StepProps } from '@mui/material';
import type { ChangeEvent } from 'react';

const splitRow: StackProps = {
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'baseline',
};

export const ApproveStep = (props: StepProps) => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const { symbol } = usePrices();
  const pushNotification = usePushNotification();
  const [approveInfinite, setApproveInfinite] = useState(false);
  const {
    metavault: { address },
    asset,
  } = useMetavault();
  const { amount, needsApproval } = useOperations();
  const { price } = usePrices();
  const { data: feeData } = useFeeData({ formatUnits: 'gwei' });

  const { config: approveConfig, refetch: fetchApprovalConfig } =
    usePrepareContractWrite({
      addressOrName: asset,
      contractInterface: erc20ABI,
      functionName: 'approve',
      args: [address, constants.MaxUint256],
      enabled: false,
    });
  const {
    data: approveData,
    write: approve,
    isLoading: isApproveLoading,
    isSuccess: isApproveStarted,
  } = useContractWrite(approveConfig);
  const { isSuccess: isApproveSuccess } = useWaitForTransaction({
    hash: approveData?.hash,
    onSuccess: (data) => {
      pushNotification({
        title: intl.formatMessage({ defaultMessage: 'Token approved' }),
        content: (
          <Link
            href={`${etherscanBlockExplorers.goerli.url}/tx/${data?.transactionHash}`}
            target="_blank"
          >
            {intl.formatMessage({
              defaultMessage: 'View your transaction on etherscan',
            })}
          </Link>
        ),
        severity: 'success',
      });
    },
  });

  useEffect(() => {
    if (!!asset && needsApproval) {
      fetchApprovalConfig();
    }
  }, [asset, fetchApprovalConfig, needsApproval]);

  const estimatedGasAmount = pathOr(
    constants.Zero,
    ['request', 'gasLimit'],
    approveConfig,
  ).mul(feeData?.gasPrice ?? constants.Zero);
  const nativeTokenGasPrice = new BigDecimal(
    estimatedGasAmount,
    chain?.nativeCurrency?.decimals,
  );
  const fiatGasPrice = price * nativeTokenGasPrice?.simple;

  const handleToggleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setApproveInfinite(event.target.checked);
  };

  const handleApprove = () => {
    if (approveInfinite) {
      approve();
    } else {
      approve({
        recklesslySetUnpreparedArgs: [address, amount.exact],
      });
    }
  };

  return (
    <Step {...props}>
      <StepLabel>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Token approval' })}
          </Typography>
          <InfoTooltip
            label={intl.formatMessage({
              defaultMessage: 'Increase allowance for this token',
            })}
          />
        </Stack>
      </StepLabel>
      <StepContent>
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
        <Stack {...splitRow} mb={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <InfoTooltip
              label={intl.formatMessage({
                defaultMessage: 'Set allowance to maximum value',
              })}
            />
            <Typography>
              {intl.formatMessage({ defaultMessage: 'Set as infinite' })}
            </Typography>
          </Stack>
          <Switch
            size="small"
            checked={approveInfinite}
            onChange={handleToggleSwitch}
          />
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Button
            onClick={handleApprove}
            disabled={isApproveLoading || isApproveStarted}
          >
            {isApproveLoading ? (
              intl.formatMessage({ defaultMessage: 'Waiting for approval' })
            ) : isApproveStarted && !isApproveSuccess ? (
              <CircularProgress size={20} />
            ) : (
              intl.formatMessage({ defaultMessage: 'Approve' })
            )}
          </Button>
        </Stack>
      </StepContent>
    </Step>
  );
};
