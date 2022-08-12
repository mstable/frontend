import {
  DAI,
  Ether,
  FEI,
  MBTC,
  MTA,
  MUSD,
  RAI,
  USDC,
  USDT,
} from '@frontend/shared-icons';
import { SvgIcon } from '@mui/material';
import { CurrencyCircleDollar } from 'phosphor-react';

import type { SvgIconProps } from '@mui/material';

export type TokenIconProps = {
  symbol: string;
} & SvgIconProps;

const SupportedTokens = {
  dai: DAI,
  eth: Ether,
  fei: FEI,
  mbtc: MBTC,
  mta: MTA,
  musd: MUSD,
  rai: RAI,
  usdc: USDC,
  usdt: USDT,
};

export const TokenIcon = ({ symbol, ...rest }: TokenIconProps) => {
  const Icon = SupportedTokens[symbol?.toLowerCase()];

  return Icon ? (
    <Icon {...rest} />
  ) : (
    <SvgIcon
      viewBox="24 24 208 208"
      {...rest}
      sx={{ fontSize: 24, ...rest?.sx }}
    >
      <CurrencyCircleDollar width={256} height={256} />
    </SvgIcon>
  );
};
