import { SvgIcon } from '@mui/material';

import { ReactComponent as CheckSvg } from './check.svg';
import { ReactComponent as IndeterminateSvg } from './indeterminate.svg';
import { ReactComponent as UncheckSvg } from './uncheck.svg';

import type { SvgIconProps } from '@mui/material';

export const Check = (props: SvgIconProps) => (
  <SvgIcon {...props} component={CheckSvg} viewBox="0 0 16 16" />
);

export const Indeterminate = (props: SvgIconProps) => (
  <SvgIcon {...props} component={IndeterminateSvg} viewBox="0 0 16 16" />
);

export const Uncheck = (props: SvgIconProps) => (
  <SvgIcon {...props} component={UncheckSvg} viewBox="0 0 16 16" />
);
