import { FC } from 'react';
import { ButtonProps, IconButton, useTheme } from '@mui/material';
import { useToggleThemeMode } from '@frontend/shared-providers';
import { Moon, Sun } from 'phosphor-react';

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
