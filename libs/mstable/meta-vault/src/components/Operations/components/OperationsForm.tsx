import { useMemo } from 'react';

import { TokenInput } from '@frontend/shared-ui';
import { Divider, FormControl, Stack } from '@mui/material';
import { ArrowDown } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { useAccount, useBalance } from 'wagmi';

import { useMetaVault } from '../../../hooks';
import {
  useChangeOperation,
  useOperations,
  usePreview,
  useSetAmount,
} from '../hooks';

import type { BigDecimal } from '@frontend/shared-utils';
import type { StackProps } from '@mui/material';

export const OperationsForm = (props: StackProps) => {
  const intl = useIntl();
  const { address: walletAddress } = useAccount();
  const { address, asset, assetToken, mvToken } = useMetaVault();
  const { amount, operation, tab } = useOperations();
  const { preview } = usePreview();
  const setAmount = useSetAmount();
  const changeOperation = useChangeOperation();
  const { data: assetBalance } = useBalance({
    addressOrName: walletAddress,
    token: asset,
    enabled: !!asset,
    watch: true,
  });
  const { data: mvBalance } = useBalance({
    addressOrName: walletAddress,
    token: address,
    enabled: !!walletAddress,
    watch: true,
  });

  const upAmount = useMemo(
    () => (['deposit', 'redeem'].includes(operation) ? amount : preview),
    [amount, operation, preview],
  );
  const upToken = useMemo(
    () => (tab === 0 ? assetToken : mvToken),
    [assetToken, mvToken, tab],
  );
  const upBalance = useMemo(
    () => (tab === 0 ? assetBalance : mvBalance),
    [assetBalance, mvBalance, tab],
  );
  const upLabel = useMemo(
    () =>
      tab === 0
        ? intl.formatMessage({ defaultMessage: 'Tokens' })
        : intl.formatMessage({ defaultMessage: 'Shares' }),

    [intl, tab],
  );
  const handleUpChange = (newValue: BigDecimal) => {
    changeOperation(tab === 0 ? 'deposit' : 'redeem');
    setAmount(newValue);
  };

  const downAmount = useMemo(
    () => (['deposit', 'redeem'].includes(operation) ? preview : amount),
    [amount, operation, preview],
  );
  const downToken = useMemo(
    () => (tab === 0 ? mvToken : assetToken),
    [assetToken, mvToken, tab],
  );
  const downBalance = useMemo(
    () => (tab === 0 ? assetBalance : mvBalance),
    [assetBalance, mvBalance, tab],
  );
  const downLabel = useMemo(
    () =>
      tab === 0
        ? intl.formatMessage({ defaultMessage: 'Shares' })
        : intl.formatMessage({ defaultMessage: 'Tokens' }),
    [intl, tab],
  );
  const handleDownChange = (newValue: BigDecimal) => {
    changeOperation(tab === 0 ? 'mint' : 'withdraw');
    setAmount(newValue);
  };

  return (
    <Stack
      borderRadius={1}
      p={2}
      direction="column"
      sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}
      {...props}
    >
      <TokenInput
        label={upLabel}
        amount={upAmount}
        token={upToken}
        balance={upBalance}
        onChange={handleUpChange}
        placeholder="0.00"
      />
      <Divider>
        <ArrowDown fontWeight="bold" />
      </Divider>
      <FormControl>
        <TokenInput
          label={downLabel}
          amount={downAmount}
          token={downToken}
          balance={downBalance}
          onChange={handleDownChange}
          placeholder="0.00"
          hideBottomRow
        />
      </FormControl>
    </Stack>
  );
};
