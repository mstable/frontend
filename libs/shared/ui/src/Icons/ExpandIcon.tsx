import { ExpandLess, ExpandMore } from '@mui/icons-material';

import type { SvgIconProps } from '@mui/material';

export type ExpandIconProps = { expanded?: boolean } & SvgIconProps;

export const ExpandIcon = ({ expanded, ...rest }: ExpandIconProps) =>
  expanded ? <ExpandMore {...rest} /> : <ExpandLess {...rest} />;
