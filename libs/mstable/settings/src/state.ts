import { useEffect, useLayoutEffect, useState } from 'react';

import { useToggleThemeMode } from '@frontend/shared-theme';
import { useTheme } from '@mui/material';
import { createContainer } from 'react-tracked';
import { useLocalStorage } from 'react-use';

export type Flag = 'exactApproval' | 'dark';

const initialState: Record<Flag, boolean> = {
  exactApproval: false,
  dark: false,
};

export const {
  Provider: SettingsProvider,
  useUpdate,
  useTrackedState: useSettings,
} = createContainer(() => {
  const [ls, setLs] = useLocalStorage<Record<Flag, boolean>>(
    'settings',
    initialState,
  );
  const [state, setState] = useState<Record<Flag, boolean>>(ls);
  const {
    palette: { mode },
  } = useTheme();
  const toggleThemeMode = useToggleThemeMode();

  useEffect(() => {
    setLs(state);
  }, [setLs, state]);

  useLayoutEffect(() => {
    const set = state.dark ? 'dark' : 'light';
    if (mode !== set) {
      toggleThemeMode();
    }
  }, [mode, state, state.dark, toggleThemeMode]);

  return [state, setState];
});
