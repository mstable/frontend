import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/InfoRounded';
import ReportIcon from '@mui/icons-material/ReportRounded';
import WarningIcon from '@mui/icons-material/WarningRounded';
import { lighten } from '@mui/material';

import type { Theme, ThemeOptions } from '@mui/material';

export const getAlert = (base: Theme): ThemeOptions => ({
  components: {
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          ...base.typography.buttonLarge,
          marginTop: 0,
          marginBottom: 0,
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        variant: 'standard',
        iconMapping: {
          info: <InfoIcon />,
          error: <ReportIcon />,
          success: <CheckCircleIcon />,
          warning: <WarningIcon />,
        },
      },
      styleOverrides: {
        root: {
          flex: 1,
          borderRadius: '8px',
          padding: base.spacing(2),

          '.MuiAlert-icon': {
            width: base.spacing(2.5),
            height: base.spacing(2.5),
            padding: 0,
            marginRight: base.spacing(2),
          },
          '.MuiAlert-message': {
            overflow: 'hidden',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        },
        action: {
          paddingTop: 0,
          '.MuiIconButton-root': {
            margin: base.spacing(-0.5),
          },
        },
        standard: {
          color:
            base.palette.mode === 'light'
              ? base.palette.text.primary
              : base.palette.grey[900],
        },
        standardInfo: {
          backgroundColor: lighten(base.palette.info.main, 0.8),
          '.MuiAlert-icon': {
            color: base.palette.info.main,
          },
        },
        standardError: {
          backgroundColor: lighten(base.palette.error.main, 0.8),
          '.MuiAlert-icon': {
            color: base.palette.error.main,
          },
        },
        standardSuccess: {
          backgroundColor: lighten(base.palette.success.main, 0.8),
          '.MuiAlert-icon': {
            color: base.palette.success.main,
          },
        },
        standardWarning: {
          backgroundColor: lighten(base.palette.warning.main, 0.8),
          '.MuiAlert-icon': {
            color: base.palette.warning.main,
          },
        },
        filled: {
          color: base.palette.common.white,
          '.MuiAlert-icon': {
            color: base.palette.common.white,
          },
        },
        filledInfo: {
          backgroundColor: base.palette.info.main,
        },
        filledError: {
          backgroundColor: base.palette.error.main,
        },
        filledSuccess: {
          backgroundColor: base.palette.success.main,
        },
        filledWarning: {
          backgroundColor: base.palette.warning.main,
        },
      },
    },
  },
});
