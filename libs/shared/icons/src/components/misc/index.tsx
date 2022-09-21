import { SvgIcon } from '@mui/material';

import { ReactComponent as HistorySvg } from './history.svg';

import type { SvgIconProps } from '@mui/material';

export const History = (props: SvgIconProps) => (
  <SvgIcon {...props} component={HistorySvg} viewBox="0 0 10 10" />
);
