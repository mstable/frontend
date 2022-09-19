import {
  ConvexProtocol,
  CurveProtocol,
  MStableProtocol,
} from '@frontend/shared-icons';
import { SvgIcon } from '@mui/material';
import { CurrencyCircleDollar } from 'phosphor-react';

import type { SupportedProtocol } from '@frontend/shared-constants';
import type { SvgIconProps } from '@mui/material';

export type ProtocolIconProps = {
  name: string;
} & SvgIconProps;

const supportedProtocols: Record<
  SupportedProtocol,
  (props: SvgIconProps) => JSX.Element
> = {
  mstable: MStableProtocol,
  convex: ConvexProtocol,
  curve: CurveProtocol,
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
      <CurrencyCircleDollar width={256} height={256} />
    </SvgIcon>
  );
};
