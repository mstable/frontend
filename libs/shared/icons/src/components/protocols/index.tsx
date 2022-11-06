import { SvgIcon } from '@mui/material';

import { ReactComponent as AaveSvg } from './aave.svg';
import { ReactComponent as ConvexSvg } from './convex.svg';
import { ReactComponent as CurveSvg } from './curve.svg';
import { ReactComponent as MStableSvg } from './mstable.svg';
import { ReactComponent as UniswapSvg } from './uniswap.svg';

import type { SvgIconProps } from '@mui/material';

export const AaveProtocol = (props: SvgIconProps) => (
  <SvgIcon {...props} component={AaveSvg} viewBox="0 0 800 800" />
);
export const ConvexProtocol = (props: SvgIconProps) => (
  <SvgIcon {...props} component={ConvexSvg} viewBox="0 0 124.2 143.6" />
);
export const CurveProtocol = (props: SvgIconProps) => (
  <SvgIcon {...props} component={CurveSvg} viewBox="0 0 460 460" />
);
export const MStableProtocol = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MStableSvg} viewBox="0 0 700 700" />
);
export const UniswapProtocol = (props: SvgIconProps) => (
  <SvgIcon {...props} component={UniswapSvg} viewBox="40.04 0 470.19 541.43" />
);
