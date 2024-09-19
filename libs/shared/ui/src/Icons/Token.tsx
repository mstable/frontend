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
  MvDAI,
  MvETH,
  MvFrax,
  MvMTA,
  MvMUSD,
  MvUSDC,
  RAI,
  USDC,
  USDT,
} from '@frontend/shared-icons';
import { SvgIcon } from '@mui/material';
import { CurrencyCircleDollar } from 'phosphor-react';

import type { SvgIconProps } from '@mui/material';

export type TokenIconProps = {
  symbol?: string;
} & SvgIconProps;

export const supportedTokens: Partial<
  Record<string, (props: SvgIconProps) => JSX.Element>
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
  mvdai: MvDAI,
  mveth: MvETH,
  mvfrax: MvFrax,
  mvmta: MvMTA,
  mvmusd: MvMUSD,
  mvusdc: MvUSDC,
};

export const TokenIcon = ({ symbol, ...rest }: TokenIconProps) => {
  const Icon = supportedTokens[symbol?.toLowerCase()];

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
