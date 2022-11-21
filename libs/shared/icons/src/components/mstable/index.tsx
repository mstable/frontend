import { SvgIcon } from '@mui/material';

import { ReactComponent as MStableSvg } from './mstable.svg';
import { ReactComponent as MStableShortSvg } from './mstable-short.svg';
import { ReactComponent as MVaultSvg } from './mvault.svg';
import { ReactComponent as UserSvg } from './user.svg';

import type { SvgIconProps } from '@mui/material';

export const MStable = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MStableSvg} viewBox="0 0 1108 192" />
);
export const MStableShort = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MStableShortSvg} viewBox="0 0 700 700" />
);
export const User = (props: SvgIconProps) => (
  <SvgIcon {...props} component={UserSvg} viewBox="0 0 56 56" />
);
export const MVault = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MVaultSvg} viewBox="0 0 48 48" />
);
