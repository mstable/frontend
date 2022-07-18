import { CollapsibleSection, TitleCard } from '@frontend/shared-ui';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const Strategy = () => {
  const intl = useIntl();

  return (
    <TitleCard
      title={intl.formatMessage({ defaultMessage: 'Strategy' })}
      titleAction={
        <Button color="secondary">
          {intl.formatMessage({ defaultMessage: 'Visualize Strategy' })}
        </Button>
      }
    >
      <Typography mt={2}>
        This Stablecoin Meta Vault is a market-neutral strategy that has little
        susceptibility to volatility.
        <br />
        It uses USDC, DAI, and USDT in order to deposit that into the 3CRV-Pool.
        The 3CRV token is then deposited in various curve pools that are paired
        with the 3CRV token and staked in Convex. The earned CVX and CRV tokens
        are periodically claimed and swapped for more stablecoins that are then
        deposited back into the strategy.
        <br />
        The yield is accruing from liquidations of the accrued rewards and the
        swap fees on Curve.
      </Typography>
      <CollapsibleSection
        iconPosition="end"
        components={{
          container: {
            sx: {
              mt: 3,
              backgroundColor: 'background.highlight',
              borderRadius: 1,
            },
          },
        }}
        title={
          <Stack
            direction="column"
            p={2}
            sx={{
              borderRadius: 1,
              cursor: 'pointer',
              ':hover': { color: 'primary.main' },
            }}
          >
            <Typography variant="h5" gutterBottom>
              {intl.formatMessage({ defaultMessage: 'What are the risks?' })}
            </Typography>
            <Typography>
              {intl.formatMessage({
                defaultMessage:
                  'See what assets and protocols are exposed to this strategy.',
              })}
            </Typography>
          </Stack>
        }
      >
        <Box
          sx={(theme) => ({
            ...theme.mixins.centered,
            height: 60,
          })}
        >
          <Typography fontWeight="bold">🚧 WIP</Typography>
        </Box>
      </CollapsibleSection>
    </TitleCard>
  );
};
