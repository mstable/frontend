import { useSettings } from '@frontend/lts-settings';
import { usePrices } from '@frontend/shared-providers';
import { CountUp, Dialog } from '@frontend/shared-ui';
import { BigDecimal, isNilOrEmpty } from '@frontend/shared-utils';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate, useSearch } from '@tanstack/react-location';
import { constants } from 'ethers';
import produce from 'immer';
import { ArrowDown } from 'phosphor-react';
import { propEq } from 'ramda';
import { useIntl } from 'react-intl';
import { mainnet, useFeeData, useNetwork } from 'wagmi';

import { useContractPreview, useContractSubmit } from '../hooks';
import { useTrackedState } from '../state';

import type { DialogProps } from '@frontend/shared-ui';
import type { StackProps } from '@mui/material';

import type { LTSRoute } from '../../../routes';
import type { LTSContract } from '../types';

export type ContractDialogProps = {
  contract: LTSContract;
} & Omit<DialogProps, 'open' | 'onClose' | 'content'>;

const rowProps: StackProps = {
  width: 1,
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const ContractDialog = ({ contract, ...rest }: ContractDialogProps) => {
  const intl = useIntl();
  const { address } = useSearch<LTSRoute>();
  const navigate = useNavigate<LTSRoute>();
  const { chains } = useNetwork();
  const contractChain = chains.find(propEq('id', contract.chain)) ?? mainnet;
  const { slippage } = useSettings();
  const { symbol } = usePrices();
  const { data: feeData } = useFeeData({
    formatUnits: 'gwei',
    chainId: contract.chain,
  });
  const vaultContract = useTrackedState().find(
    propEq('address', contract?.vaultAddress),
  );
  const { data: preview } = useContractPreview(contract);
  const {
    submit,
    reset,
    nativeTokenGasPrice,
    fiatGasPrice,
    isPrepareLoading,
    isWriteLoading,
    isWriteSuccess,
    isSubmitSuccess,
  } = useContractSubmit(contract);

  return (
    <Dialog
      {...rest}
      open={address === contract.address}
      title={intl.formatMessage(
        { defaultMessage: 'Exit {name}', id: 'djdjSw' },
        { name: contract.name },
      )}
      onClose={() => {
        navigate({
          search: produce((draft) => {
            delete draft.address;
          }),
        });
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
          {contract?.vaultAddress &&
            vaultContract?.balance.gt(constants.Zero) && (
              <Button
                onClick={() => {
                  navigate({
                    search: produce((draft) => {
                      draft.address = `"${contract?.vaultAddress}"`;
                    }),
                  });
                }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Redeem Vault',
                  id: 'vsI1HY',
                })}
              </Button>
            )}
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
  );
};
