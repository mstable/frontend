import { Check, Indeterminate, Uncheck } from '../icons';

import type { Theme, ThemeOptions } from '@mui/material';

export const getCheckbox = (base: Theme): ThemeOptions => ({
  components: {
    MuiCheckbox: {
      defaultProps: {
        inputProps: {
          'aria-label': 'checkbox',
        },
        icon: <Uncheck />,
        checkedIcon: <Check />,
        indeterminateIcon: <Indeterminate />,
      },
      styleOverrides: {
        root: {
          padding: '8px',
        },
      },
    },
  },
});
