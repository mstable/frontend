import { SvgIcon } from '@mui/material';

import { ReactComponent as MvDAISvg } from './mvDAI.svg';
import { ReactComponent as MvETHSvg } from './mvETH.svg';
import { ReactComponent as MvFraxSvg } from './mvFrax.svg';
import { ReactComponent as MvMTASvg } from './mvMTA.svg';
import { ReactComponent as MvMUSDSvg } from './mvMUSD.svg';
import { ReactComponent as MvUSDCSvg } from './mvUSDC.svg';

import type { SvgIconProps } from '@mui/material';

export const MvDAI = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MvDAISvg} viewBox="0 0 96 96" />
);
export const MvETH = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MvETHSvg} viewBox="0 0 65 65" />
);
export const MvFrax = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MvFraxSvg} viewBox="0 0 65 65" />
);
export const MvMTA = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MvMTASvg} viewBox="0 0 96 96" />
);
export const MvMUSD = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MvMUSDSvg} viewBox="0 0 120 120" />
);
export const MvUSDC = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MvUSDCSvg} viewBox="0 0 96 96" />
);
