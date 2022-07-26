import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/InfoRounded';
import ReportIcon from '@mui/icons-material/ReportRounded';
import WarningIcon from '@mui/icons-material/WarningRounded';

import { colors } from '../../constants';

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
          padding: base.spacing(2),
          '.MuiAlert-icon': {
            width: base.spacing(2.5),
            height: base.spacing(2.5),
            padding: 0,
            opacity: 1,
            marginRight: base.spacing(2),
          },
        },
        message: {
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
        action: {
          paddingTop: 0,
          '.MuiIconButton-root': {
            margin: base.spacing(-0.5),
          },
        },
        standardInfo: {
          backgroundColor: 'rgba(209, 198, 255, 0.2)',
          '.MuiAlert-icon': {
            color: colors.purple03,
          },
        },
        standardError: {
          backgroundColor: 'rgba(255, 141, 134, 0.2)',
          '.MuiAlert-icon': {
            color: colors.red03,
          },
        },
        standardSuccess: {
          backgroundColor: 'rgba(126, 255, 164, 0.2)',
          '.MuiAlert-icon': {
            color: colors.green03,
          },
        },
        standardWarning: {
          backgroundColor: 'rgba(255, 246, 161, 0.2)',
          '.MuiAlert-icon': {
            color: colors.yellow03,
          },
        },
        filled: {
          color: base.palette.common.white,
        },
        filledInfo: {
          backgroundColor: colors.purple02,
          '.MuiAlert-icon': {
            color: base.palette.common.white,
          },
        },
        filledError: {
          backgroundColor: colors.red02,
          '.MuiAlert-icon': {
            color: base.palette.common.white,
          },
        },
        filledSuccess: {
          backgroundColor: colors.green02,
          '.MuiAlert-icon': {
            color: base.palette.common.white,
          },
        },
        filledWarning: {
          backgroundColor: colors.yellow02,
          '.MuiAlert-icon': {
            color: base.palette.common.white,
          },
        },
      },
    },
  },
});
