import { SvgIcon } from '@mui/material';

import { ReactComponent as MvETHSvg } from './mvETH.svg';
import { ReactComponent as MvFraxSvg } from './mvFrax.svg';
import { ReactComponent as MvMUSDSvg } from './mvMUSD.svg';
import { ReactComponent as MvUSDCSvg } from './mvUSDC.svg';

import type { SvgIconProps } from '@mui/material';

export const MvETH = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MvETHSvg} viewBox="8 8.52 48 48" />
);
export const MvFrax = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MvFraxSvg} viewBox="8.33 8.52 48 48" />
);
export const MvMUSD = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MvMUSDSvg} viewBox="20 20 80 80" />
);
export const MvUSDC = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MvUSDCSvg} viewBox="8 8 64 64" />
);
