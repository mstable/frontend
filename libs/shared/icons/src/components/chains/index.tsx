import { SvgIcon } from '@mui/material';

import { ReactComponent as EthIconSvg } from './Ethereum.svg';
import { ReactComponent as PolygonSvg } from './Polygon.svg';

import type { SvgIconProps } from '@mui/material';

export const Ethereum = (props: SvgIconProps) => (
  <SvgIcon {...props} component={EthIconSvg} viewBox="0 0 32 32" />
);
export const Polygon = (props: SvgIconProps) => (
  <SvgIcon {...props} component={PolygonSvg} viewBox="0 0 100 100" />
);
