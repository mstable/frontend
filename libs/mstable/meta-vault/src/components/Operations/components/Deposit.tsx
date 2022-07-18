import { TokenInput } from '@frontend/shared-ui';
import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { ArrowDown, ArrowRight } from 'phosphor-react';
import { useIntl } from 'react-intl';

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
        symbol="USDC"
        balance={100}
        placeholder="0.00"
      />
      <Divider>
        <ArrowDown weight="bold" />
      </Divider>
      <TextField
        variant="standard"
        placeholder="0.00"
        label={intl.formatMessage({ defaultMessage: 'Shares' })}
        InputProps={{
          type: 'number',
          disableUnderline: true,
          sx: (theme) => theme.typography.value1,
        }}
      />
      <Recap />
      <Button
        size="large"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>200.00 USDC</span>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography>Deposit</Typography>
          <ArrowRight />
        </Stack>
      </Button>
    </Stack>
  );
};
