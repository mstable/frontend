import { useToggleThemeMode } from '@frontend/shared-providers';
import { IconButton, useTheme } from '@mui/material';
import { Moon, Sun } from 'phosphor-react';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

export const ThemeSwitchButton: FC<ButtonProps> = (props) => {
  const {
    palette: { mode, warning },
  } = useTheme();
  const isDarkMode = mode === 'dark';
  const toggleThemeMode = useToggleThemeMode();

  return (
    <IconButton color="secondary" onClick={toggleThemeMode}>
      {isDarkMode ? (
        <Moon size={24} weight="fill" />
      ) : (
        <Sun size={24} color={warning.main} weight="fill" />
      )}
    </IconButton>
  );
};
