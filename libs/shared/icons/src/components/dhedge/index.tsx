import { SvgIcon } from '@mui/material';

import { ReactComponent as DhedgeLogoSvg } from './dhedge-logo.svg';

import type { SvgIconProps } from '@mui/material';

export const DhedgeLogo = (props: SvgIconProps) => (
  <SvgIcon {...props} component={DhedgeLogoSvg} viewBox="0 0 310 360" />
);
