import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import HelpOutline from '@mui/icons-material/HelpOutline';
import WarningAmber from '@mui/icons-material/WarningAmber';

import type { AlertColor, SvgIconProps } from '@mui/material';

export type SeverityIconProps = {
  severity: AlertColor;
} & SvgIconProps;

export const SeverityIcon = ({ severity, ...rest }: SeverityIconProps) =>
  ({
    error: <ErrorOutline color="error" {...rest} />,
    info: <HelpOutline color="info" {...rest} />,
    success: <CheckCircleOutline color="success" {...rest} />,
    warning: <WarningAmber color="warning" {...rest} />,
  }[severity]);
