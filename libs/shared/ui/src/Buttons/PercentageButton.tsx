import { Button } from '@mui/material';

import type { ButtonProps } from '@mui/material';

export const PercentageButton = (props: ButtonProps) => (
  <Button
    {...props}
    variant="outlined"
    size="small"
    sx={(theme) => ({
      padding: 0.5,
      margin: 0,
      minWidth: 28,
      minHeight: 16,
      borderRadius: '4px',
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[600]
          : theme.palette.grey[500],
      borderColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[800],
      letterSpacing: '-0.04em',
      textTransform: 'uppercase',
      ':hover': {
        color: 'primary.main',
        borderColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
      },
      '&.Mui-disabled': {
        color: 'text.disabled',
        borderColor: 'action.disabledBackground',
        ':hover': {
          borderColor: 'text.disabled',
        },
      },
      ...props?.sx,
    })}
  />
);
