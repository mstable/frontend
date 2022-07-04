import { Typography, useTheme } from '@mui/material';
import { Moon, SunDim } from 'phosphor-react';

import type { TypographyProps } from '@mui/material';

export const ThemeModeIcon = (props: TypographyProps) => {
  const {
    palette: { mode },
  } = useTheme();

  return (
    <Typography
      {...props}
      sx={{ fontSize: 24, width: 24, height: 24, ...props?.sx }}
    >
      {mode === 'dark' ? <Moon /> : <SunDim />}
    </Typography>
  );
};
