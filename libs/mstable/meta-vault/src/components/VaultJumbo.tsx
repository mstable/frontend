import { CRV, Uniswap, USDC } from '@frontend/shared-icons';
import { ValueLabel } from '@frontend/shared-ui';
import { Button, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const VaultJumbo = () => {
  const intl = useIntl();

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      width={1}
      height={1}
      px={1}
      pb={2}
    >
      <Typography variant="h1" pt={14} pb={2}>
        {intl.formatMessage({ defaultMessage: 'Stablecoin Meta Vault' })}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button color="secondary" size="small">
          <CRV sx={{ mr: 1 }} />
          {intl.formatMessage({ defaultMessage: 'Curve' })}
        </Button>
        <Button color="secondary" size="small">
          <Uniswap sx={{ mr: 1 }} />
          {intl.formatMessage({ defaultMessage: 'Uniswap' })}
        </Button>
      </Stack>
      <Stack
        direction="row"
        mt={{ xs: 4, md: 6 }}
        spacing={{ xs: 3, md: 4 }}
        sx={{ overflowX: 'auto', maxWidth: 1 }}
      >
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Asset' })}
          subvalue="USDC"
          components={{ valueContainer: { pl: 0.5, pb: 0.3 } }}
        >
          <USDC />
        </ValueLabel>
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'TVL' })}
          value="1.1M"
          subvalue="+2.54% (Past Week)"
          components={{
            subvalue: {
              color: 'success.main',
            },
          }}
        />
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'AV. APY' })}
          value="8-11%"
          subvalue="-0.32% (Past Week)"
          components={{
            subvalue: {
              color: 'error.main',
            },
          }}
        />
      </Stack>
    </Stack>
  );
};
