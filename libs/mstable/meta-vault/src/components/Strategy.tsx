import { TitleCard } from '@frontend/shared-ui';
import { Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const Strategy = () => {
  const intl = useIntl();

  return (
    <TitleCard title={intl.formatMessage({ defaultMessage: 'Strategy' })}>
      <Typography>
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
    </TitleCard>
  );
};