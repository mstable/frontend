import {
  AaveProtocol,
  ConvexProtocol,
  CurveProtocol,
  MStableProtocol,
  UniswapProtocol,
} from '@frontend/shared-icons';
import { SvgIcon } from '@mui/material';
import { Bank } from 'phosphor-react';

import type { SupportedProtocol } from '@frontend/shared-constants';
import type { SvgIconProps } from '@mui/material';

export type ProtocolIconProps = {
  name: SupportedProtocol | string;
} & SvgIconProps;

export const supportedProtocols: Record<
  SupportedProtocol,
  (props: SvgIconProps) => JSX.Element
> = {
  mstable: MStableProtocol,
  convex: ConvexProtocol,
  curve: CurveProtocol,
  aave: AaveProtocol,
  uniswap: UniswapProtocol,
};

export const ProtocolIcon = ({ name, ...rest }: ProtocolIconProps) => {
  const Icon = supportedProtocols[name?.toLowerCase()];

  return Icon ? (
    <Icon {...rest} />
  ) : (
    <SvgIcon
      viewBox="24 24 208 208"
      {...rest}
      sx={{ fontSize: 24, ...rest?.sx }}
    >
      <Bank width={256} height={256} />
    </SvgIcon>
  );
};
