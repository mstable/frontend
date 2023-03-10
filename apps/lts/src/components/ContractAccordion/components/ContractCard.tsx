import { useState } from 'react';

import { useSettings } from '@frontend/lts-settings';
import { usePrices, usePushNotification } from '@frontend/shared-providers';
import {
  AddressLabel,
  CountUp,
  Dialog,
  ViewEtherscanLink,
} from '@frontend/shared-ui';
import { BigDecimal, isNilOrEmpty } from '@frontend/shared-utils';
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { constants } from 'ethers';
import { ArrowDown } from 'phosphor-react';
import { pathOr, propEq } from 'ramda';
import { useIntl } from 'react-intl';
import {
  mainnet,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import { useContractPrepareConfig, useContractPreview } from '../hooks';

import type { Grid2Props, StackProps } from '@mui/material';

import type { LTSContract } from '../types';

export type ContractCardProps = {
  contract: LTSContract;
} & Grid2Props;

const rowProps: StackProps = {
  width: 1,
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const ContractCard = ({ contract, ...rest }: ContractCardProps) => {
  const intl = useIntl();
  const { chains } = useNetwork();
  const contractChain = chains.find(propEq('id', contract.chain)) ?? mainnet;
  const blockExplorer = contractChain.blockExplorers.default;
  const { slippage } = useSettings();
  const pushNotification = usePushNotification();
  const { price, symbol } = usePrices();
  const { data: feeData } = useFeeData({
    formatUnits: 'gwei',
    chainId: contract.chain,
  });
  const [open, setOpen] = useState(false);
  const { data: preview } = useContractPreview(contract);
  const config = useContractPrepareConfig(contract);
  const { config: submitConfig, isLoading: isPrepareLoading } =
    usePrepareContractWrite(config);
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
          <ViewEtherscanLink hash={data?.hash} blockExplorer={blockExplorer} />
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
            blockExplorer={blockExplorer}
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
            blockExplorer={blockExplorer}
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
    contractChain.nativeCurrency.decimals,
  );
  const fiatGasPrice = BigDecimal.fromSimple(
    price * nativeTokenGasPrice?.simple,
  );

  return (
    <Grid2 {...rest}>
      <Stack
        direction="column"
        spacing={3}
        sx={{
          p: 2,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: (theme) =>
            alpha(theme.palette.background.highlight, 0.5),
          borderRadius: 1,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={2} alignItems="center" {...rest}>
            <contract.icon sx={{ width: 44, height: 44 }} />
            <Stack>
              <Typography fontWeight="bold">{contract.name}</Typography>
              <AddressLabel
                address={contract.address}
                small
                link
                maxWidth={120}
                blockExplorerUrl={blockExplorer.url}
              />
            </Stack>
          </Stack>
          <CountUp
            variant="value4"
            end={
              new BigDecimal(contract.balance, contract.token?.decimals).simple
            }
            suffix={contract.token?.symbol}
            maxWidth={250}
            noWrap
          />
        </Stack>
        {contract.balance.gt(constants.Zero) && (
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
        )}
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
                variant="value4"
                end={
                  new BigDecimal(contract.balance, contract.token?.decimals)
                    .simple
                }
                suffix={contract.token?.symbol}
                maxWidth={250}
                noWrap
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
                      {p.token.name}
                    </Typography>
                    <CountUp
                      variant="value5"
                      end={new BigDecimal(p.value, p.token.decimals).simple}
                      suffix={p.token.symbol}
                    />
                  </Stack>
                ))}
              </>
            )}
            {['pool', 'stable'].includes(contract.type) && (
              <Stack {...rowProps} justifyContent="flex-end">
                <Typography variant="value5" color="text.secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Allow {slippage} of slippage',
                      id: 'zS899f',
                    },
                    {
                      slippage: intl.formatNumber(slippage, {
                        style: 'percent',
                        minimumSignificantDigits: 1,
                      }),
                    },
                  )}
                </Typography>
              </Stack>
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
                      contractChain.nativeCurrency.symbol
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
    </Grid2>
  );
};
