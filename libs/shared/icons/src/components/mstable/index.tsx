import { SvgIcon } from '@mui/material';

import { ReactComponent as MStableSvg } from './mstable.svg';
import { ReactComponent as MStableShortSvg } from './mstable-short.svg';
import { ReactComponent as WarningSvg } from './warning.svg';

import type { SvgIconProps } from '@mui/material';

export const MStable = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MStableSvg} viewBox="0 0 1108 192" />
);
export const MStableShort = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MStableShortSvg} viewBox="0 0 700 700" />
);
export const Warning = (props: SvgIconProps) => (
  <SvgIcon {...props} component={WarningSvg} viewBox="0 0 48 48" />
);
