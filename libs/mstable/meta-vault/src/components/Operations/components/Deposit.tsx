import { useEffect, useState } from 'react';

import { addresses, erc4626ABI } from '@frontend/shared-constants';
import { usePushNotification } from '@frontend/shared-notifications';
import { BigDecimalInput, TokenInput } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  Link,
  Stack,
} from '@mui/material';
import { constants } from 'ethers';
import { ArrowDown, ArrowRight } from 'phosphor-react';
import { path, pathOr } from 'ramda';
import { useIntl } from 'react-intl';
import {
  erc20ABI,
  etherscanBlockExplorers,
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
  useSigner,
  useToken,
  useWaitForTransaction,
} from 'wagmi';

import { Recap } from './Recap';
export const Deposit = () => {
  const intl = useIntl();
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const [amount, setAmout] = useState<BigDecimal | null>(null);
  const [previewShares, setPreviewShares] = useState<BigDecimal | null>(null);
  const pushNotification = usePushNotification();
  const { chain } = useNetwork();

  const { data: asset, isLoading: assetLoading } = useContractRead({
    addressOrName: path([chain?.id, 'ERC4626', 'TVG'], addresses),
    contractInterface: erc4626ABI,
    functionName: 'asset',
    enabled: !!signer && !!chain?.id,
  });
  const { refetch: refetchPreviewShares } = useContractRead({
    addressOrName: path([chain?.id, 'ERC4626', 'TVG'], addresses),
    contractInterface: erc4626ABI,
    functionName: 'previewDeposit',
    args: [amount?.exact],
    enabled: false,
    onSettled: (data) => {
      setPreviewShares(data ? new BigDecimal(data) : null);
    },
  });
  const { data: feeData } = useFeeData({ formatUnits: 'gwei' });
  const { data: token } = useToken({
    address: asset as unknown as string,
    enabled: !!asset,
  });
  const { data: balance } = useBalance({
    addressOrName: address,
    token: token?.address,
    enabled: !!token?.address && !!asset && !assetLoading,
    cacheTime: 0,
    staleTime: 0,
  });
  const { data: allowance } = useContractRead({
    addressOrName: token?.address,
    contractInterface: erc20ABI,
    functionName: 'allowance',
    args: [address, path([chain?.id, 'ERC4626', 'TVG'], addresses)],
    enabled: !!token?.address && !!address,
    watch: true,
    cacheTime: 0,
  });

  const needsApproval = amount && allowance && amount.exact.gt(allowance);

  const { config: approveConfig } = usePrepareContractWrite({
    addressOrName: token?.address,
    contractInterface: erc20ABI,
    functionName: 'approve',
    args: [
      path([chain?.id, 'ERC4626', 'TVG'], addresses),
      constants.MaxUint256,
    ],
    enabled: !!token?.address && needsApproval && !!chain?.id,
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
      prepareDeposit();
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

  const { config: depositConfig, refetch: prepareDeposit } =
    usePrepareContractWrite({
      addressOrName: path([chain?.id, 'ERC4626', 'TVG'], addresses),
      contractInterface: erc4626ABI,
      functionName: 'deposit',
      args: [amount?.exact, address],
      enabled: !!address && !!amount && !needsApproval && !!chain.id,
    });
  const {
    data: depositData,
    write: deposit,
    isLoading: isDepositLoading,
    isSuccess: isDepositStarted,
  } = useContractWrite(depositConfig);
  const { isSuccess: isDepositSuccess } = useWaitForTransaction({
    hash: depositData?.hash,
    onSuccess: (data) => {
      setAmout(null);
      setPreviewShares(null);
      pushNotification({
        title: intl.formatMessage({ defaultMessage: 'Deposit completed' }),
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
    if (amount) {
      refetchPreviewShares();
    } else {
      setPreviewShares(null);
    }
  }, [amount, refetchPreviewShares]);

  const estimatedGas =
    amount && feeData
      ? pathOr(
          constants.Zero,
          ['request', 'gasLimit'],
          needsApproval ? approveConfig : depositConfig,
        ).mul(feeData.gasPrice)
      : null;

  return (
    <Stack
      borderRadius={1}
      p={2}
      direction="column"
      sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}
      spacing={2}
    >
      <TokenInput
        label={intl.formatMessage({ defaultMessage: 'Tokens' })}
        amount={amount}
        token={token}
        balance={balance}
        onChange={setAmout}
        placeholder="0.00"
      />
      <Divider>
        <ArrowDown weight="bold" />
      </Divider>
      <FormControl>
        <InputLabel>
          {intl.formatMessage({ defaultMessage: 'Shares' })}
        </InputLabel>
        <BigDecimalInput readOnly value={previewShares} placeholder="0.00" />
      </FormControl>
      <Recap
        amount={amount}
        token={token}
        previewShares={previewShares}
        estimatedGas={estimatedGas}
      />
      {(() => {
        if (!address) {
          return (
            <Button size="large" disabled>
              {intl.formatMessage({
                defaultMessage: 'Connect your wallet to deposit',
              })}
            </Button>
          );
        }

        if (!amount) {
          return (
            <Button size="large" disabled>
              {intl.formatMessage({ defaultMessage: 'Deposit' })}
              &nbsp;
              <ArrowRight weight="bold" />
            </Button>
          );
        }

        if (isApproveLoading) {
          return (
            <Button size="large" disabled>
              {intl.formatMessage({ defaultMessage: 'Waiting for approval' })}
            </Button>
          );
        }

        if (isApproveStarted && !isApproveSuccess) {
          return (
            <Button size="large" disabled>
              {intl.formatMessage({ defaultMessage: 'Approving' })}
            </Button>
          );
        }

        if (needsApproval) {
          return (
            <Stack direction="row" spacing={1}>
              <Button
                fullWidth
                size="large"
                onClick={() => {
                  approve({
                    recklesslySetUnpreparedArgs: [
                      path([chain?.id, 'ERC4626', 'TVG'], addresses),
                      amount.exact,
                    ],
                  });
                }}
              >
                {intl.formatMessage({ defaultMessage: 'Approve exact' })}
              </Button>
              <Button
                fullWidth
                size="large"
                onClick={() => {
                  approve();
                }}
              >
                {intl.formatMessage({ defaultMessage: 'Approve ∞' })}
              </Button>
            </Stack>
          );
        }

        if (isDepositLoading) {
          return (
            <Button size="large" disabled>
              {intl.formatMessage({ defaultMessage: 'Waiting for approval' })}
            </Button>
          );
        }

        if (isDepositStarted && !isDepositSuccess) {
          return (
            <Button size="large" disabled>
              {intl.formatMessage({ defaultMessage: 'Depositing' })}
            </Button>
          );
        }

        return (
          <Button
            size="large"
            onClick={() => {
              deposit();
            }}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {amount && <span>{`${amount?.format()} ${token?.symbol}`}</span>}
            <span>
              {intl.formatMessage({ defaultMessage: 'Deposit' })}
              &nbsp;
              <ArrowRight weight="bold" />
            </span>
          </Button>
        );
      })()}
    </Stack>
  );
};
