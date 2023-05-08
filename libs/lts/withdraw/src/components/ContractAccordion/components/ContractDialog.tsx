import { useSettings } from '@frontend/lts-settings';
import { CountUp, Dialog } from '@frontend/shared-ui';
import {
  BigDecimal,
  countFirstDecimal,
  isNilOrEmpty,
} from '@frontend/shared-utils';
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
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

import type { WithdrawRoute } from '../../../types';
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
  const { address } = useSearch<WithdrawRoute>();
  const navigate = useNavigate<WithdrawRoute>();
  const { chains } = useNetwork();
  const contractChain = chains.find(propEq(contract.chain, 'id')) ?? mainnet;
  const { slippage } = useSettings();
  const { data: feeData } = useFeeData({
    formatUnits: 'gwei',
    chainId: contract.chain,
  });
  const { contracts } = useTrackedState();
  const vaultContract = contracts.find(
    propEq(contract?.vaultAddress, 'address'),
  );
  const { data: preview, isLoading: previewLoading } =
    useContractPreview(contract);
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

  const bal = new BigDecimal(contract.balance, contract.token?.decimals).simple;

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
            <Typography variant="label1">
              {intl.formatMessage({
                defaultMessage: 'Position',
                id: 'U6qGuO',
              })}
            </Typography>
            <CountUp
              duration={1}
              variant="value4"
              end={bal}
              decimals={Math.max(2, countFirstDecimal(bal))}
              suffix={contract.token?.symbol}
              maxWidth={250}
              noWrap
            />
          </Stack>
          <Collapse in={!previewLoading && !isNilOrEmpty(preview)}>
            <Stack spacing={2}>
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
              <Stack {...rowProps}>
                <Typography variant="label1" pb={1}>
                  {intl.formatMessage({
                    defaultMessage: 'Redeem',
                    id: 'XSdWHA',
                  })}
                </Typography>
              </Stack>
              {preview?.map((p, i) => {
                const val = new BigDecimal(p.value, p.token.decimals).simple;
                const dec = Math.max(2, countFirstDecimal(val));

                return (
                  <Stack {...rowProps} key={`prev-${i}`}>
                    <Typography variant="label2" color="text.secondary">
                      {p.token.name}
                    </Typography>
                    <CountUp
                      duration={1}
                      variant="value5"
                      end={new BigDecimal(p.value, p.token.decimals).simple}
                      decimals={dec}
                      suffix={p.token.symbol}
                    />
                  </Stack>
                );
              })}
            </Stack>
          </Collapse>
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
            <CountUp
              duration={1}
              variant="value5"
              end={nativeTokenGasPrice?.simple}
              decimals={Math.max(
                2,
                countFirstDecimal(nativeTokenGasPrice?.simple),
              )}
              suffix={contractChain.nativeCurrency.symbol}
              color="text.secondary"
            />
          </Stack>
          <Stack {...rowProps} justifyContent="flex-end">
            <CountUp
              duration={1}
              variant="value5"
              end={fiatGasPrice?.simple}
              decimals={Math.max(2, countFirstDecimal(fiatGasPrice?.simple))}
              suffix="$"
              color="text.secondary"
            />
          </Stack>
        </Stack>
      }
      actions={(onClose) => (
        <>
          <Button color="secondary" onClick={onClose} sx={{ minWidth: '16ch' }}>
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
            sx={{ minWidth: '16ch' }}
          >
            {isWriteLoading ? (
              intl.formatMessage({
                defaultMessage: 'Sign Transaction',
                id: 'w1LBDB',
              })
            ) : isWriteSuccess && !isSubmitSuccess ? (
              <CircularProgress color="primary" size={16} />
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
