import { BigDecimalInput, TokenInput } from '@frontend/shared-ui';
import { Divider, FormControl, InputLabel, Stack } from '@mui/material';
import { ArrowDown } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { useAccount, useBalance } from 'wagmi';

import { useMetaVault } from '../../../hooks';
import { useOperations, usePreview, useSetAmount } from '../hooks';

import type { StackProps } from '@mui/material';

export const OperationsForm = (props: StackProps) => {
  const intl = useIntl();
  const { address } = useAccount();
  const { asset } = useMetaVault();
  const { amount, token } = useOperations();
  const { preview } = usePreview();
  const setAmount = useSetAmount();
  const { data: balance } = useBalance({
    addressOrName: address,
    token: asset,
    enabled: !!asset,
    watch: true,
  });

  return (
    <Stack
      borderRadius={1}
      p={2}
      direction="column"
      sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}
      {...props}
    >
      <TokenInput
        label={intl.formatMessage({ defaultMessage: 'Tokens' })}
        amount={amount}
        token={token}
        balance={balance}
        onChange={setAmount}
        placeholder="0.00"
      />
      <Divider>
        <ArrowDown weight="bold" />
      </Divider>
      <FormControl>
        <InputLabel>
          {intl.formatMessage({ defaultMessage: 'Shares' })}
        </InputLabel>
        <BigDecimalInput readOnly value={preview} placeholder="0.00" />
      </FormControl>
    </Stack>
  );
};
