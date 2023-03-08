import { useState } from 'react';

import { useSettings } from '@frontend/lts-settings';
import { usePrices, usePushNotification } from '@frontend/shared-providers';
import { CountUp, Dialog, ViewEtherscanLink } from '@frontend/shared-ui';
import { BigDecimal, isNilOrEmpty } from '@frontend/shared-utils';
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
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import {
  useContractBalance,
  useContractPrepareConfig,
  useContractPreview,
} from '../hooks';
import { ContractHeader } from './ContractHeader';

import type { Contract } from '@frontend/lts-constants';
import type { StackProps } from '@mui/material';

export type ContractCardProps = {
  contract: Contract;
} & StackProps;

const rowProps: StackProps = {
  width: 1,
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const ContractCard = ({ contract, ...rest }: ContractCardProps) => {
  const intl = useIntl();
  const { showEmpty } = useSettings();
  const { chain } = useNetwork();
  const pushNotification = usePushNotification();
  const { price, symbol } = usePrices();
  const { data: feeData } = useFeeData({
    formatUnits: 'gwei',
  });
  const [open, setOpen] = useState(false);
  const { data: bal, isLoading: balLoading } = useContractBalance(contract);
  const { data: preview } = useContractPreview(contract);
  const config = useContractPrepareConfig(contract);
  const { config: submitConfig, isLoading: isPrepareLoading } =
    usePrepareContractWrite({
      ...config,
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

  if (!showEmpty && (balLoading || bal?.value.isZero())) {
    return null;
  }

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
              end={new BigDecimal(bal?.value, bal?.decimals).simple}
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
        title={intl.formatMessage(
          { defaultMessage: 'Exit {name}', id: 'djdjSw' },
          { name: contract.name },
        )}
        onClose={() => {
          setOpen(false);
          reset();
        }}
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
            {!isNilOrEmpty(preview) && (
              <>
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
                {preview?.map((p, i) => (
                  <Stack {...rowProps} key={`prev-${i}`}>
                    <Typography variant="label2" color="text.secondary">
                      {p?.token.name}
                    </Typography>
                    <CountUp
                      variant="value5"
                      end={new BigDecimal(p?.value, p?.token.decimals).simple}
                      suffix={p?.token.symbol}
                    />
                  </Stack>
                ))}
              </>
            )}
            <Stack {...rowProps} pt={4}>
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
