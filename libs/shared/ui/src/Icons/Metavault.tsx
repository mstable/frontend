import { MvUSDC } from '@frontend/shared-icons';
import { tokens } from '@mstable/metavaults-web';
import { SvgIcon } from '@mui/material';
import { CurrencyCircleDollar } from 'phosphor-react';
import {} from 'wagmi';
import { mainnet } from 'wagmi/chains';

import type { SvgIconProps } from '@mui/material';

export type MVIconProps = {
  address?: string;
} & SvgIconProps;

export const supportedMVs: Partial<
  Record<string, (props: SvgIconProps) => JSX.Element>
> = {
  [tokens[mainnet.id]['mvusdc-3pcv'].address]: MvUSDC,
};

export const MVIcon = ({ address, ...rest }: MVIconProps) => {
  const Icon = supportedMVs[address];

  return Icon ? (
    <Icon {...rest} />
  ) : (
    <SvgIcon viewBox="0 0 256 256" {...rest}>
      <CurrencyCircleDollar width={256} height={256} />
    </SvgIcon>
  );
};
