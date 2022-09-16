import { SvgIcon } from '@mui/material';

import { ReactComponent as ConvexSvg } from './convex.svg';
import { ReactComponent as CurveSvg } from './curve.svg';
import { ReactComponent as MStableSvg } from './mstable.svg';

import type { SvgIconProps } from '@mui/material';

export const ConvexProtocol = (props: SvgIconProps) => (
  <SvgIcon {...props} component={ConvexSvg} viewBox="0 0 124.2 143.6" />
);
export const CurveProtocol = (props: SvgIconProps) => (
  <SvgIcon {...props} component={CurveSvg} viewBox="0 0 460 460" />
);
export const MStableProtocol = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MStableSvg} viewBox="0 0 700 700" />
);
