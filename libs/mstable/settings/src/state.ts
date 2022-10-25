import { useCallback, useLayoutEffect, useMemo } from 'react';

import { useToggleThemeMode } from '@frontend/shared-theme';
import { useTheme } from '@mui/material';
import { createContainer } from 'react-tracked';
import { useLocalStorage } from 'react-use';
import { useAccount } from 'wagmi';

import type { SetStateAction } from 'react';

export type Flag = 'exactApproval' | 'dark';

export type SettingsState = Record<Flag, boolean>;

const initialState: SettingsState = {
  exactApproval: false,
  dark: false,
};

type State = Record<'disconnected' & string, SettingsState>;

export const {
  Provider: SettingsProvider,
  useUpdate,
  useTrackedState: useSettings,
} = createContainer(() => {
  const { address = 'disconnected' } = useAccount();
  const [ls, setLs] = useLocalStorage<State>('settings', {
    disconnected: initialState,
  });
  const {
    palette: { mode },
  } = useTheme();
  const toggleThemeMode = useToggleThemeMode();

  useLayoutEffect(() => {
    const set = ls[address]?.dark ? 'dark' : 'light';
    if (mode !== set) {
      toggleThemeMode();
    }
  }, [address, ls, mode, toggleThemeMode]);

  const state = useMemo(() => ls[address] ?? initialState, [address, ls]);

  const setState = useCallback(
    (input: SetStateAction<SettingsState>) => {
      setLs({
        ...ls,
        [address]: typeof input === 'function' ? input(state) : input,
      });
    },
    [address, ls, setLs, state],
  );

  return [state, setState];
});
