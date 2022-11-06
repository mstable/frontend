import {
  CheckCircleOutline,
  ErrorOutline,
  HelpOutline,
  WarningAmber,
} from '@mui/icons-material';

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
