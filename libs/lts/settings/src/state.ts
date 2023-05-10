import { useCallback, useLayoutEffect } from 'react';

import { useToggleThemeMode } from '@frontend/shared-providers';
import { useMediaQuery, useTheme } from '@mui/material';
import { createContainer } from 'react-tracked';
import { useLocalStorage } from 'react-use';
import { useAccount } from 'wagmi';

import type { SetStateAction } from 'react';

export type SettingsState = {
  dark: boolean;
  showEmpty: boolean;
  slippage: number;
};

export const {
  Provider: SettingsProvider,
  useUpdate: useUpdateSettings,
  useTrackedState: useSettings,
} = createContainer(() => {
  const { address = 'disconnected' } = useAccount();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [ls, setLs] = useLocalStorage<SettingsState>('settings', {
    dark: prefersDarkMode,
    showEmpty: false,
    slippage: 0.001,
  });
  const {
    palette: { mode },
  } = useTheme();
  const toggleThemeMode = useToggleThemeMode();

  useLayoutEffect(() => {
    const set = ls?.dark ? 'dark' : 'light';
    if (mode !== set) {
      toggleThemeMode();
    }
  }, [address, ls, mode, toggleThemeMode]);

  const setState = useCallback(
    (input: SetStateAction<SettingsState>) => {
      setLs(typeof input === 'function' ? input(ls) : input);
    },
    [ls, setLs],
  );

  return [ls, setState];
});
