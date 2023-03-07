import { useState } from 'react';

import { usePrices, usePushNotification } from '@frontend/shared-providers';
import { CountUp, Dialog, ViewEtherscanLink } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { constants } from 'ethers';
import { ArrowDown } from 'phosphor-react';
import { pathOr } from 'ramda';
import { useIntl } from 'react-intl';
import {
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

import type { Contract } from '@frontend/lts-constants';
import type { HexAddress } from '@frontend/shared-utils';
import type { StackProps } from '@mui/material';

export type VaultCardProps = {
  contract: Contract;
} & StackProps;

const rowProps: StackProps = {
  width: 1,
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const VaultCard = ({ contract, ...rest }: VaultCardProps) => {
  const intl = useIntl();
  const { chain } = useNetwork();
  const pushNotification = usePushNotification();
  const { price, symbol } = usePrices();
  const [open, setOpen] = useState(false);
  const { address: walletAddress, isConnected } = useAccount();
  const { data: feeData } = useFeeData({
    formatUnits: 'gwei',
  });
  const { data: bal, isLoading: balLoading } = useBalance({
    address: walletAddress,
    token: contract.address,
    enabled: isConnected,
  });
  const { data: stakingTokenAddress } = useContractRead({
    address: contract.address,
    abi: contract.abi,
    functionName: 'stakingToken',
  });
  const { data: stakingToken } = useToken({
    address: stakingTokenAddress as unknown as HexAddress,
  });
  const { config: submitConfig, isLoading: isPrepareLoading } =
    usePrepareContractWrite({
      address: contract.address,
      abi: contract.abi,
      functionName: 'exit',
      enabled: !balLoading && bal?.value.gt(constants.Zero),
    });
  const {
    data: submitData,
    write: submit,
    reset,
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
          {balLoading ? (
            <Skeleton width={60} />
          ) : (
            <CountUp
              variant="value4"
              end={new BigDecimal(bal?.value).simple}
              suffix={bal?.symbol}
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
          reset();
        }}
        title={intl.formatMessage(
          { defaultMessage: 'Exit {pool}', id: 'MtpzgV' },
          { pool: contract.name },
        )}
        content={
          <Stack spacing={2} pt={4} pb={2} px={4}>
            <Stack {...rowProps}>
              <Typography variant="label2" color="text.secondary">
                {intl.formatMessage({
                  defaultMessage: 'Withdraw',
                  id: 'PXAur5',
                })}
              </Typography>
              <CountUp
                variant="value5"
                end={new BigDecimal(bal?.value, bal?.decimals).simple}
                suffix={bal?.symbol}
              />
            </Stack>
            <Divider>
              <Box
                bgcolor="divider"
                borderRadius="50%"
                p={0.75}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <ArrowDown />
              </Box>
            </Divider>
            <Stack {...rowProps} pb={4}>
              <Typography variant="label2" color="text.secondary">
                {stakingToken?.name}
              </Typography>
              <CountUp
                variant="value5"
                end={new BigDecimal(bal?.value, bal?.decimals).simple}
                suffix={stakingToken?.symbol}
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
              onClick={submit}
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
