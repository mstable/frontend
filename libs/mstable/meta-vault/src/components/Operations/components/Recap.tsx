import { useEffect, useMemo } from 'react';

import { erc4626ABI } from '@frontend/shared-constants';
import { usePrices } from '@frontend/shared-prices';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Box,
  Divider,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { constants } from 'ethers';
import { ArrowsClockwise, Fire, Ticket, Vault, Wallet } from 'phosphor-react';
import { pathOr } from 'ramda';
import { useIntl } from 'react-intl';
import {
  erc20ABI,
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
  sx: {
    borderRadius: '50%',
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
};

const DepositRecap = (props: StackProps) => {
  const intl = useIntl();
  const { amount, preview, isLoading, operation } = useOperations();
  const { assetToken } = useMetavault();

  return (
    <Stack {...props} direction="column" spacing={2}>
      <Stack {...logoContainerProps}>
        <Box {...logoBoxProps} bgcolor="info.main">
          <Vault weight="fill" color="#fff" />
        </Box>
        <Box {...logoBoxProps} bgcolor="background.paper">
          <ArrowsClockwise />
        </Box>
        <Box {...logoBoxProps} bgcolor="success.main">
          <Ticket weight="fill" color="#fff" />
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
        <Typography variant="value4">
          {operation === 'mint' && isLoading ? (
            <Skeleton width={100} height={16} />
          ) : (
            `${amount?.format(2) ?? '0.00'} ${
              assetToken?.symbol ??
              intl.formatMessage({ defaultMessage: 'Assets' })
            }`
          )}
        </Typography>
        <Typography variant="value4">
          {operation === 'deposit' && isLoading ? (
            <Skeleton width={100} height={16} />
          ) : (
            intl.formatMessage(
              { defaultMessage: '{value} Shares' },
              { value: preview?.format(2) ?? '0.00' },
            )
          )}
        </Typography>
      </Stack>
    </Stack>
  );
};

const WithdrawRecap = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const { amount, preview, isLoading, operation } = useOperations();
  const { assetToken } = useMetavault();

  return (
    <Stack {...props} direction="column" spacing={2}>
      <Stack {...logoContainerProps}>
        <Box {...logoBoxProps} bgcolor="background.highlight">
          <Fire weight="fill" color={theme.palette.grey['600']} />
        </Box>
        <Box {...logoBoxProps} bgcolor="background.paper">
          <ArrowsClockwise />
        </Box>
        <Box {...logoBoxProps} bgcolor="background.highlight">
          <Wallet weight="fill" color={theme.palette.grey['600']} />
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
        <Typography variant="value4">
          {operation === 'redeem' && isLoading ? (
            <Skeleton width={100} height={16} />
          ) : (
            intl.formatMessage(
              { defaultMessage: '{value} Shares' },
              { value: amount?.format(2) ?? '0.00' },
            )
          )}
        </Typography>
        <Typography variant="value4">
          {operation === 'withdraw' && isLoading ? (
            <Skeleton width={100} height={16} />
          ) : (
            `${preview?.format(2) ?? '0.00'} ${
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
  const { data: feeData } = useFeeData({ formatUnits: 'gwei' });
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
  const { config: approveConfig, refetch: fetchApprovalConfig } =
    usePrepareContractWrite({
      addressOrName: asset,
      contractInterface: erc20ABI,
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
    if (asset) {
      if (needsApproval) {
        fetchApprovalConfig();
      } else {
        fetchSubmitConfig();
      }
    }
  }, [asset, fetchApprovalConfig, fetchSubmitConfig, needsApproval]);

  return (
    <Stack {...props} direction="column">
      <Stack {...rowProps} pb={2}>
        <Typography variant="label2">
          {intl.formatMessage({ defaultMessage: 'Current Gas' })}
        </Typography>
        <Typography variant="value5">
          {intl.formatMessage(
            { defaultMessage: 'Average - {value} GWEI' },
            { value: feeData?.formatted?.gasPrice },
          )}
        </Typography>
      </Stack>
      <Stack {...rowProps} pb={1}>
        <Typography variant="label2">
          {needsApproval
            ? intl.formatMessage({ defaultMessage: 'Approval Cost' })
            : intl.formatMessage(
                { defaultMessage: '{operationLabel} Cost' },
                { operationLabel },
              )}
        </Typography>
        <Typography variant="value5">
          {nativeTokenGasPrice?.format(8) ?? '-'}&nbsp;
          {chain?.nativeCurrency?.symbol}
        </Typography>
      </Stack>
      <Stack {...rowProps} justifyContent="flex-end">
        <Typography variant="value5">
          {fiatGasPrice?.format(2) ?? '-'}&nbsp;{symbol}
        </Typography>
      </Stack>
    </Stack>
  );
};

export const Recap = (props: StackProps) => {
  const { tab } = useOperations();
  const { isConnected } = useAccount();

  return (
    <Stack {...props} spacing={3}>
      {tab === 0 ? <DepositRecap /> : <WithdrawRecap />}
      {isConnected && (
        <>
          <Divider flexItem />
          <GasFeesRecap />
        </>
      )}
    </Stack>
  );
};
