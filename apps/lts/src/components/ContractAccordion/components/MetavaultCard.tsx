import { useState } from 'react';

import { usePrices, usePushNotification } from '@frontend/shared-providers';
import { CountUp, Dialog, ViewEtherscanLink } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  alpha,
  Button,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { constants } from 'ethers';
import { pathOr } from 'ramda';
import { useIntl } from 'react-intl';
import {
  erc4626ABI,
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
  useToken,
  useWaitForTransaction,
} from 'wagmi';

import { ContractHeader } from './ContractHeader';

import type { Metavault } from '@frontend/lts-constants';
import type { StackProps } from '@mui/material';

export type MetavaultCardProps = {
  contract: Metavault;
} & StackProps;

const rowProps: StackProps = {
  width: 1,
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const MetavaultCard = ({ contract, ...rest }: MetavaultCardProps) => {
  const intl = useIntl();
  const pushNotification = usePushNotification();
  const [open, setOpen] = useState(false);
  const { chain } = useNetwork();
  const { price, symbol } = usePrices();
  const { address: walletAddress, isConnected } = useAccount();
  const { data: feeData } = useFeeData({
    formatUnits: 'gwei',
  });
  const { data: assetAddress } = useContractRead({
    address: contract.address,
    abi: erc4626ABI,
    functionName: 'asset',
  });
  const { data: asset } = useToken({ address: assetAddress });
  const { data: mvBal, isLoading: mvBalLoading } = useBalance({
    address: walletAddress,
    token: contract.address,
    enabled: isConnected,
  });
  const { data: assetBal, isLoading: assetBalLoading } = useContractRead({
    address: contract.address,
    abi: erc4626ABI,
    functionName: 'convertToAssets',
    args: [mvBal?.value ?? constants.Zero],
    enabled: !mvBalLoading,
  });
  const { config: submitConfig, isLoading: isPrepareLoading } =
    usePrepareContractWrite({
      address: contract.address,
      abi: erc4626ABI,
      functionName: 'withdraw',
      args: [assetBal, walletAddress, walletAddress],
      enabled: !!assetBal,
    });
  const {
    data: submitData,
    write: submit,
    isLoading: isWriteLoading,
    isSuccess: isWriteSuccess,
  } = useContractWrite({
    ...submitConfig,
    onSuccess: (data) => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Withdrawing',
          id: 'bAqUW1',
        }),
        content: (
          <ViewEtherscanLink
            hash={data?.hash}
            blockExplorer={chain?.blockExplorers?.['etherscan']}
          />
        ),
        severity: 'info',
      });
    },
    onError: () => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction Cancelled',
          id: '20X0BC',
        }),
        severity: 'info',
      });
    },
  });
  const { isSuccess: isSubmitSuccess } = useWaitForTransaction({
    hash: submitData?.hash,
    onSuccess: ({ transactionHash }) => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction Confirmed',
          id: 'rgdwQX',
        }),
        content: (
          <ViewEtherscanLink
            hash={transactionHash}
            blockExplorer={chain?.blockExplorers?.['etherscan']}
          />
        ),
        severity: 'success',
      });
    },
    onError: () => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction Error',
          id: 'p8bsw4',
        }),
        content: (
          <ViewEtherscanLink
            hash={submitData?.hash}
            blockExplorer={chain?.blockExplorers?.['etherscan']}
          />
        ),
        severity: 'error',
      });
    },
  });

  const estimatedGas = pathOr(
    constants.Zero,
    ['request', 'gasLimit'],
    submitConfig,
  ).mul(
    (feeData?.gasPrice ?? constants.Zero).add(
      feeData?.maxPriorityFeePerGas ?? constants.Zero,
    ),
  );
  const nativeTokenGasPrice = new BigDecimal(
    estimatedGas,
    chain?.nativeCurrency?.decimals,
  );
  const fiatGasPrice = BigDecimal.fromSimple(
    price * nativeTokenGasPrice?.simple,
  );
  const assetBalance = assetBal
    ? new BigDecimal(assetBal, asset?.decimals)
    : BigDecimal.ZERO;

  return (
    <>
      <Stack
        direction="column"
        spacing={3}
        {...rest}
        sx={{
          p: 2,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: (theme) =>
            alpha(theme.palette.background.highlight, 0.5),
          backdropFilter: 'blur(20px)',
          borderRadius: 1,
          ...rest?.sx,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ContractHeader contract={contract} />
          {mvBalLoading || assetBalLoading ? (
            <Skeleton width={60} />
          ) : (
            <CountUp
              variant="value4"
              end={assetBalance?.simple}
              suffix={asset?.symbol}
            />
          )}
        </Stack>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          {intl.formatMessage({
            defaultMessage: 'Exit Position',
            id: 'hPs6J+',
          })}
        </Button>
      </Stack>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title={intl.formatMessage(
          { defaultMessage: 'Exit {pool}', id: 'MtpzgV' },
          { pool: contract.name },
        )}
        content={
          <Stack spacing={2} pt={4}>
            <Stack {...rowProps}>
              <Typography variant="label2" color="text.secondary">
                {intl.formatMessage({
                  defaultMessage: 'Withdraw',
                  id: 'PXAur5',
                })}
              </Typography>
              <CountUp
                variant="value5"
                end={assetBalance?.simple}
                suffix={asset?.symbol}
              />
            </Stack>
            <Stack {...rowProps} justifyContent="flex-end" pb={4}>
              <CountUp
                variant="value5"
                color="text.secondary"
                end={new BigDecimal(mvBal?.value ?? constants.Zero).simple}
                suffix={intl.formatMessage({
                  defaultMessage: 'Shares',
                  id: 'mrwfXX',
                })}
              />
            </Stack>
            <Stack {...rowProps}>
              <Typography variant="label2" color="text.secondary">
                {intl.formatMessage({
                  defaultMessage: 'Current Base Fee',
                  id: 'bnF8kf',
                })}
              </Typography>
              <Typography variant="value5">
                {intl.formatMessage(
                  {
                    defaultMessage: '{fee} GWEI',
                    id: 'hesDHZ',
                  },
                  { fee: new BigDecimal(feeData?.gasPrice, 9).format(2) },
                )}
              </Typography>
            </Stack>
            <Stack {...rowProps}>
              <Typography variant="label2" color="text.secondary">
                {intl.formatMessage({
                  defaultMessage: 'Withdraw Cost',
                  id: 'Zab6JA',
                })}
              </Typography>
              <Typography variant="value5">
                {!fiatGasPrice
                  ? '-'
                  : `${nativeTokenGasPrice?.format(4) ?? '-'} ${
                      chain?.nativeCurrency?.symbol
                    }`}
              </Typography>
            </Stack>
            <Stack {...rowProps} justifyContent="flex-end">
              <CountUp
                variant="value5"
                end={fiatGasPrice?.simple}
                suffix={symbol}
                color="text.secondary"
              />
            </Stack>
          </Stack>
        }
        actions={(onClose) => (
          <>
            <Button color="secondary" onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
            <Button
              disabled={
                isPrepareLoading ||
                isWriteLoading ||
                (isWriteSuccess && !isSubmitSuccess)
              }
              onClick={() => {
                submit();
              }}
            >
              {isWriteLoading ? (
                intl.formatMessage({
                  defaultMessage: 'Sign Transaction',
                  id: 'w1LBDB',
                })
              ) : isWriteSuccess && !isSubmitSuccess ? (
                <CircularProgress size={20} />
              ) : (
                intl.formatMessage({
                  defaultMessage: 'Withdraw',
                  id: 'PXAur5',
                })
              )}
            </Button>
          </>
        )}
      />
    </>
  );
};
