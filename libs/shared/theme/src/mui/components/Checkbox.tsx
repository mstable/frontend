// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Check, Indeterminate, Uncheck } from '@frontend/shared-icons';

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
