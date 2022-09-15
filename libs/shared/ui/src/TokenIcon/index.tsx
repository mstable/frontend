import {
  BUSD,
  DAI,
  Ether,
  FEI,
  FRAX,
  LUSD,
  MBTC,
  MTA,
  MUSD,
  RAI,
  USDC,
  USDT,
} from '@frontend/shared-icons';
import { SvgIcon } from '@mui/material';
import { CurrencyCircleDollar } from 'phosphor-react';

import type { SupportedToken } from '@frontend/shared-constants';
import type { SvgIconProps } from '@mui/material';

export type TokenIconProps = {
  symbol: string;
} & SvgIconProps;

const SupportedTokens: Record<
  SupportedToken,
  (props: SvgIconProps) => JSX.Element
> = {
  dai: DAI,
  eth: Ether,
  fei: FEI,
  mbtc: MBTC,
  mta: MTA,
  musd: MUSD,
  rai: RAI,
  usdc: USDC,
  usdt: USDT,
  lusd: LUSD,
  frax: FRAX,
  busd: BUSD,
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
