import { useState } from 'react';

import { getGoerliSdk } from '@dethcrypto/eth-sdk-client';
import { BigDecimalInput, TokenInput } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';
import { ArrowDown, ArrowRight } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { useDebounce } from 'react-use';
import {
  useAccount,
  useBalance,
  useContractRead,
  useSigner,
  useToken,
} from 'wagmi';

import type { StackProps } from '@mui/material';

const splitRow: StackProps = {
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'baseline',
};

const Recap = () => {
  const intl = useIntl();
  return (
    <Stack
      sx={{ backgroundColor: 'background.highlight', p: 2, borderRadius: 1 }}
    >
      <Typography variant="buttonLarge" mb={3}>
        {intl.formatMessage({ defaultMessage: 'Recap' })}
      </Typography>
      <Stack {...splitRow} mb={1}>
        <Typography>
          {intl.formatMessage({ defaultMessage: 'Your Deposit' })}
        </Typography>
        <Typography variant="value4">200.00 USDC</Typography>
      </Stack>
      <Stack {...splitRow} mb={0.5}>
        <Typography>
          {intl.formatMessage({ defaultMessage: 'Gas Fees' })}
        </Typography>
        <Typography variant="value4">$40.23</Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" mb={1}>
        <Typography variant="value4" fontWeight="fontWeightLight">
          0.003 ETH
        </Typography>
      </Stack>
      <Divider flexItem sx={{ my: 2, backgroundColor: 'grey.800' }} />
      <Stack {...splitRow}>
        <Typography>
          {intl.formatMessage({ defaultMessage: 'You Get' })}
        </Typography>
        <Typography variant="value4">4.5 Shares</Typography>
      </Stack>
    </Stack>
  );
};

export const Deposit = () => {
  const intl = useIntl();
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const { data: token } = useToken({
    address: '0x5A036AFae87e6AEBf4eBc01bbEfb3F009eB01772',
  });
  const { data: balance } = useBalance({
    addressOrName: address,
    token: '0x5A036AFae87e6AEBf4eBc01bbEfb3F009eB01772',
  });
  const [amount, setAmout] = useState<BigDecimal | null>(null);
  const [previewShares, setPreviewShares] = useState<BigDecimal | null>(null);

  const sdk = getGoerliSdk(signer);
  const { refetch: refetchPreviewShares } = useContractRead({
    addressOrName: sdk.ERC4626.TVG.address,
    contractInterface: sdk.ERC4626.TVG.interface,
    functionName: 'previewDeposit',
    args: [amount?.exact],
    enabled: false,
    onSettled: (data) => {
      setPreviewShares(data ? new BigDecimal(data) : null);
    },
  });

  useDebounce(
    () => {
      if (amount) {
        refetchPreviewShares();
      }
    },
    300,
    [amount],
  );

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
      <Recap />
      <Button
        size="large"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {amount && <span>{`${amount?.format()} ${token?.symbol}`}</span>}

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography>Deposit</Typography>
          <ArrowRight />
        </Stack>
      </Button>
    </Stack>
  );
};
