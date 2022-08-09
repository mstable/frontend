import { useMemo } from 'react';

import { TokenInput } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import { Divider, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useMetaVault } from '../../../hooks';
import { useChangeOperation, useOperations, useSetAmount } from '../hooks';

import type { StackProps } from '@mui/material';

export const OperationsForm = (props: StackProps) => {
  const intl = useIntl();
  const { address: walletAddress } = useAccount();
  const {
    assetToken,
    mvToken,
    assetBalance,
    mvBalance,
    assetsPerShare,
    sharesPerAsset,
  } = useMetaVault();
  const { amount, operation, preview, tab } = useOperations();
  const setAmount = useSetAmount();
  const changeOperation = useChangeOperation();

  const primaryInput = useMemo(
    () =>
      ({
        deposit: {
          label: intl.formatMessage({ defaultMessage: 'Tokens' }),
          amount: amount,
          token: assetToken,
          balance: assetBalance,
        },
        mint: {
          label: intl.formatMessage({ defaultMessage: 'Tokens' }),
          amount: preview,
          token: assetToken,
          balance: assetBalance,
        },
        redeem: {
          label: intl.formatMessage({ defaultMessage: 'Shares' }),
          amount: amount,
          token: mvToken,
          balance: mvBalance,
        },
        withdraw: {
          label: intl.formatMessage({ defaultMessage: 'Shares' }),
          amount: preview,
          token: mvToken,
          balance: mvBalance,
        },
      }[operation]),
    [
      amount,
      assetBalance,
      assetToken,
      intl,
      mvBalance,
      mvToken,
      operation,
      preview,
    ],
  );

  const secondaryInput = useMemo(
    () =>
      ({
        deposit: {
          label: intl.formatMessage({ defaultMessage: 'Shares' }),
          amount: preview,
          token: mvToken,
          balance:
            assetBalance && sharesPerAsset
              ? new BigDecimal(assetBalance.exact.mul(sharesPerAsset.exact))
              : BigDecimal.ZERO,
        },
        mint: {
          label: intl.formatMessage({ defaultMessage: 'Shares' }),
          amount: amount,
          token: mvToken,
          balance:
            assetBalance && sharesPerAsset
              ? new BigDecimal(assetBalance.exact.mul(sharesPerAsset.exact))
              : BigDecimal.ZERO,
        },
        redeem: {
          label: intl.formatMessage({ defaultMessage: 'Tokens' }),
          amount: preview,
          token: assetToken,
          balance:
            mvBalance && assetsPerShare
              ? new BigDecimal(mvBalance.exact.mul(assetsPerShare.exact))
              : BigDecimal.ZERO,
        },
        withdraw: {
          label: intl.formatMessage({ defaultMessage: 'Tokens' }),
          amount: amount,
          token: assetToken,
          balance:
            mvBalance && assetsPerShare
              ? new BigDecimal(mvBalance.exact.mul(sharesPerAsset.exact))
              : BigDecimal.ZERO,
        },
      }[operation]),
    [
      amount,
      assetBalance,
      assetToken,
      assetsPerShare,
      intl,
      mvBalance,
      mvToken,
      operation,
      preview,
      sharesPerAsset,
    ],
  );

  const handlePrimaryChange = (newValue: BigDecimal) => {
    const newOp = tab === 0 ? 'deposit' : 'redeem';
    if (newOp !== operation) {
      changeOperation(newOp);
    }
    setAmount(newValue);
  };

  const handleDownChange = (newValue: BigDecimal) => {
    const newOp = tab === 0 ? 'mint' : 'withdraw';
    if (newOp !== operation) {
      changeOperation(newOp);
    }
    setAmount(newValue);
  };

  const ratioLabel = useMemo(
    () =>
      walletAddress
        ? tab === 0
          ? intl.formatMessage(
              { defaultMessage: '1 {asset} = {ratio} Shares' },
              {
                ratio: sharesPerAsset?.simple ?? '-',
                asset: assetToken?.symbol,
              },
            )
          : intl.formatMessage(
              { defaultMessage: '1 Share = {ratio} {asset}' },
              {
                ratio: assetsPerShare?.simple ?? '-',
                asset: assetToken?.symbol,
              },
            )
        : intl.formatMessage({ defaultMessage: 'Rate' }),
    [
      assetToken?.symbol,
      assetsPerShare?.simple,
      intl,
      sharesPerAsset?.simple,
      tab,
      walletAddress,
    ],
  );

  return (
    <Stack
      borderRadius={1}
      p={2}
      direction="column"
      spacing={1}
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        ...props?.sx,
      }}
      {...props}
    >
      <TokenInput
        {...primaryInput}
        onChange={handlePrimaryChange}
        placeholder="0.00"
        disabled={!walletAddress}
        error={
          primaryInput.amount &&
          primaryInput.balance &&
          primaryInput.amount.exact.gt(primaryInput.balance.exact)
        }
      />
      <Divider role="presentation">
        <Typography
          variant="value6"
          sx={{
            p: 0.5,
            backgroundColor: 'background.highlight',
            borderRadius: '4px',
            color: walletAddress ? 'text.primary' : 'action.disabled',
            minWidth: 120,
          }}
        >
          {ratioLabel}
        </Typography>
      </Divider>
      <TokenInput
        {...secondaryInput}
        onChange={handleDownChange}
        placeholder="0.00"
        disabled={!walletAddress}
        error={
          secondaryInput.amount &&
          secondaryInput.balance &&
          secondaryInput.amount.exact.gt(secondaryInput.balance.exact)
        }
        hideBottomRow
      />
    </Stack>
  );
};
