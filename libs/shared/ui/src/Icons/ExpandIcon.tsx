import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import type { SvgIconProps } from '@mui/material';

export type ExpandIconProps = { expanded?: boolean } & SvgIconProps;

export const ExpandIcon = ({ expanded, ...rest }: ExpandIconProps) =>
  expanded ? <ExpandMore {...rest} /> : <ExpandLess {...rest} />;
