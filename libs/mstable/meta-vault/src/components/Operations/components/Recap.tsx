import { useEffect, useMemo } from 'react';

import { usePrices } from '@frontend/shared-prices';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Box,
  Collapse,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { constants } from 'ethers';
import { ArrowsClockwise, Fire, Ticket, Vault, Wallet } from 'phosphor-react';
import { pathOr } from 'ramda';
import { useIntl } from 'react-intl';
import {
  erc20ABI,
  erc4626ABI,
  useAccount,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi';

import { useMetavault } from '../../../state';
import { useOperationLabel, useOperations } from '../hooks';

import type { BoxProps, StackProps } from '@mui/material';

const rowProps: StackProps = {
  width: 1,
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoContainerProps: StackProps = {
  ...rowProps,
  position: 'relative',
  sx: (theme) => ({
    '::after': {
      content: '""',
      height: '2px',
      top: '50%',
      left: 38,
      right: 38,
      background: theme.palette.background.highlight,
      position: 'absolute',
      zIndex: 1,
    },
  }),
};

const logoBoxProps: BoxProps = {
  borderRadius: '50%',
  width: 30,
  height: 30,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
};

const DepositRecap = (props: StackProps) => {
  const intl = useIntl();
  const { amount, preview, isInputLoading, operation } = useOperations();
  const { assetToken } = useMetavault();

  return (
    <Stack {...props} direction="column" spacing={2}>
      <Stack {...logoContainerProps}>
        <Box
          {...logoBoxProps}
          bgcolor={
            amount?.exact.gt(constants.Zero) ? 'info.main' : 'icons.background'
          }
          sx={{
            svg: {
              color: amount?.exact.gt(constants.Zero)
                ? 'common.white'
                : 'icons.color',
            },
          }}
        >
          <Vault weight="fill" />
        </Box>
        <Box {...logoBoxProps} bgcolor="background.paper">
          <ArrowsClockwise />
        </Box>
        <Box
          {...logoBoxProps}
          bgcolor={
            amount?.exact.gt(constants.Zero)
              ? 'success.main'
              : 'icons.background'
          }
          sx={{
            svg: {
              color: amount?.exact.gt(constants.Zero)
                ? 'common.white'
                : 'icons.color',
            },
          }}
        >
          <Ticket weight="fill" />
        </Box>
      </Stack>
      <Stack {...rowProps}>
        <Typography variant="label2">
          {intl.formatMessage({ defaultMessage: 'You Deposit' })}
        </Typography>
        <Typography variant="label2">
          {intl.formatMessage({ defaultMessage: 'You Receive' })}
        </Typography>
      </Stack>
      <Stack {...rowProps}>
        <Typography variant="value5" color="text.secondary">
          {operation === 'mint' && isInputLoading ? (
            <Skeleton width={100} />
          ) : (
            `${
              operation === 'mint'
                ? preview?.simpleRounded.toString() ?? '0.00'
                : amount?.simpleRounded.toString() ?? '0.00'
            } ${
              assetToken?.symbol ??
              intl.formatMessage({ defaultMessage: 'Assets' })
            }`
          )}
        </Typography>
        <Typography variant="value5" color="text.secondary">
          {operation === 'deposit' && isInputLoading ? (
            <Skeleton width={100} />
          ) : (
            intl.formatMessage(
              { defaultMessage: '{value} Shares' },
              {
                value:
                  operation === 'deposit'
                    ? preview?.simpleRounded.toString() ?? '0.00'
                    : amount?.simpleRounded.toString() ?? '0.00',
              },
            )
          )}
        </Typography>
      </Stack>
    </Stack>
  );
};

const WithdrawRecap = (props: StackProps) => {
  const intl = useIntl();
  const { amount, preview, isInputLoading, operation } = useOperations();
  const { assetToken } = useMetavault();

  return (
    <Stack {...props} direction="column" spacing={2}>
      <Stack {...logoContainerProps}>
        <Box
          {...logoBoxProps}
          bgcolor={
            amount?.exact.gt(constants.Zero) ? 'error.main' : 'icons.background'
          }
          sx={{
            svg: {
              color: amount?.exact.gt(constants.Zero)
                ? 'common.white'
                : 'icons.color',
            },
          }}
        >
          <Fire weight="fill" />
        </Box>
        <Box {...logoBoxProps} bgcolor="background.paper">
          <ArrowsClockwise />
        </Box>
        <Box
          {...logoBoxProps}
          bgcolor={
            amount?.exact.gt(constants.Zero)
              ? 'success.main'
              : 'icons.background'
          }
          sx={{
            svg: {
              color: amount?.exact.gt(constants.Zero)
                ? 'common.white'
                : 'icons.color',
            },
          }}
        >
          <Wallet weight="fill" />
        </Box>
      </Stack>
      <Stack {...rowProps}>
        <Typography variant="label2">
          {intl.formatMessage({ defaultMessage: 'You Burn' })}
        </Typography>
        <Typography variant="label2">
          {intl.formatMessage({ defaultMessage: 'You Receive' })}
        </Typography>
      </Stack>
      <Stack {...rowProps}>
        <Typography variant="value5" color="text.secondary">
          {operation === 'withdraw' && isInputLoading ? (
            <Skeleton width={100} />
          ) : (
            intl.formatMessage(
              { defaultMessage: '{value} Shares' },
              {
                value:
                  operation === 'withdraw'
                    ? preview?.simpleRounded.toString() ?? '0.00'
                    : amount?.simpleRounded.toString() ?? '0.00',
              },
            )
          )}
        </Typography>
        <Typography variant="value5" color="text.secondary">
          {operation === 'redeem' && isInputLoading ? (
            <Skeleton width={100} />
          ) : (
            `${
              operation === 'redeem'
                ? preview?.simpleRounded.toString() ?? '0.00'
                : amount?.simpleRounded.toString() ?? '0.00'
            } ${
              assetToken?.symbol ??
              intl.formatMessage({ defaultMessage: 'Assets' })
            }`
          )}
        </Typography>
      </Stack>
    </Stack>
  );
};

const GasFeesRecap = (props: StackProps) => {
  const intl = useIntl();
  const { address: walletAddress } = useAccount();
  const operationLabel = useOperationLabel();
  const { chain } = useNetwork();
  const { symbol } = usePrices();
  const {
    metavault: { address },
    asset,
  } = useMetavault();
  const { amount, needsApproval, operation } = useOperations();
  const { price } = usePrices();
  const { data: feeData, isLoading: feeLoading } = useFeeData({
    formatUnits: 'gwei',
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const args = useMemo<any>(
    () =>
      ({
        deposit: [amount?.exact, walletAddress],
        mint: [amount?.exact, walletAddress],
        withdraw: [amount?.exact, walletAddress, walletAddress],
        redeem: [amount?.exact, walletAddress, walletAddress],
      }[operation] || []),
    [amount?.exact, operation, walletAddress],
  );
  const {
    config: submitConfig,
    refetch: fetchSubmitConfig,
    isLoading: submitLoading,
    isError: submitError,
  } = usePrepareContractWrite({
    address,
    abi: erc4626ABI,
    functionName: operation,
    args,
    enabled: false,
  });
  const {
    config: approveConfig,
    refetch: fetchApprovalConfig,
    isLoading: approveLoading,
    isError: approveError,
  } = usePrepareContractWrite({
    address: asset,
    abi: erc20ABI,
    functionName: 'approve',
    args: [address, constants.MaxUint256],
    enabled: false,
  });
  const nativeTokenGasPrice = useMemo(() => {
    const estimatedGas = pathOr(
      constants.Zero,
      ['request', 'gasLimit'],
      needsApproval ? approveConfig : submitConfig,
    ).mul(
      (feeData?.gasPrice ?? constants.Zero).add(
        feeData?.maxPriorityFeePerGas ?? constants.Zero,
      ),
    );

    return new BigDecimal(estimatedGas, chain?.nativeCurrency?.decimals);
  }, [
    approveConfig,
    chain?.nativeCurrency?.decimals,
    feeData?.gasPrice,
    feeData?.maxPriorityFeePerGas,
    needsApproval,
    submitConfig,
  ]);
  const fiatGasPrice = useMemo(
    () => BigDecimal.fromSimple(price * nativeTokenGasPrice?.simple),
    [nativeTokenGasPrice?.simple, price],
  );

  useEffect(() => {
    if (asset && amount && amount?.exact.gt(constants.Zero)) {
      if (needsApproval) {
        fetchApprovalConfig();
      } else {
        fetchSubmitConfig();
      }
    }
  }, [amount, asset, fetchApprovalConfig, fetchSubmitConfig, needsApproval]);

  return (
    <Stack {...props} direction="column">
      <Stack {...rowProps} pb={2}>
        <Typography variant="label2" color="text.secondary">
          {intl.formatMessage({ defaultMessage: 'Current Base Fee' })}
        </Typography>
        <Typography variant="value5">
          {feeLoading ? (
            <Skeleton width={85} />
          ) : (
            intl.formatMessage(
              { defaultMessage: '{value} GWEI' },
              { value: new BigDecimal(feeData?.gasPrice, 9).format(2) },
            )
          )}
        </Typography>
      </Stack>
      <Stack {...rowProps} pb={1}>
        <Typography variant="label2" color="text.secondary">
          {needsApproval
            ? intl.formatMessage({ defaultMessage: 'Approval Cost' })
            : intl.formatMessage(
                { defaultMessage: '{operationLabel} Cost' },
                { operationLabel },
              )}
        </Typography>
        <Typography variant="value5">
          {feeLoading || submitLoading || approveLoading ? (
            <Skeleton width={85} />
          ) : !fiatGasPrice || approveError || submitError ? (
            '-'
          ) : (
            `${nativeTokenGasPrice?.format(4) ?? '-'} ${
              chain?.nativeCurrency?.symbol
            }`
          )}
        </Typography>
      </Stack>
      <Stack {...rowProps} justifyContent="flex-end">
        <Typography variant="value5" color="text.secondary">
          {feeLoading || submitLoading || approveLoading ? (
            <Skeleton width={50} />
          ) : !fiatGasPrice || approveError || submitError ? (
            '-'
          ) : (
            `${fiatGasPrice?.format(2) ?? '-'} ${symbol}`
          )}
        </Typography>
      </Stack>
    </Stack>
  );
};

export const Recap = (props: StackProps) => {
  const { tab } = useOperations();
  const { isConnected } = useAccount();
  const { amount } = useOperations();

  return (
    <Stack {...props} spacing={3}>
      {tab === 0 ? <DepositRecap /> : <WithdrawRecap />}
      <Collapse in={isConnected && !!amount}>
        <Divider flexItem />
        <GasFeesRecap pt={2} />
      </Collapse>
    </Stack>
  );
};
