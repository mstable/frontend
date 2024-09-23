import { IconButton, useTheme } from '@mui/material';
import produce from 'immer';
import { Moon, Sun } from 'phosphor-react';

import { useSettings, useUpdateSettings } from '../providers/SettingsProvider';

import type { FC } from 'react';

export const ThemeSwitchButton: FC = () => {
  const {
    palette: { warning },
  } = useTheme();
  const { dark } = useSettings();

  const updateSettings = useUpdateSettings();

  return (
    <IconButton
      color="secondary"
      onClick={() => {
        updateSettings(
          produce((state) => {
            state.dark = !state.dark;
          }),
        );
      }}
    >
      {dark ? (
        <Moon size={24} weight="fill" />
      ) : (
        <Sun size={24} color={warning.main} weight="fill" />
      )}
    </IconButton>
  );
};
