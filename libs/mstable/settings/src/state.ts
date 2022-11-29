import { useCallback, useLayoutEffect, useMemo } from 'react';

import { useToggleThemeMode } from '@frontend/shared-theme';
import { isNilOrEmpty } from '@frontend/shared-utils';
import { useMediaQuery, useTheme } from '@mui/material';
import { createContainer } from 'react-tracked';
import { useLocalStorage } from 'react-use';
import { useAccount } from 'wagmi';

import type { SetStateAction } from 'react';

export type Flag = 'exactApproval' | 'dark';

export type SettingsState = Record<Flag, boolean>;

type State = Record<'disconnected' & string, SettingsState>;

export const {
  Provider: SettingsProvider,
  useUpdate,
  useTrackedState: useSettings,
} = createContainer(() => {
  const { address = 'disconnected' } = useAccount();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [ls, setLs] = useLocalStorage<State>('settings', {
    disconnected: {
      exactApproval: false,
      dark: prefersDarkMode,
    },
  });
  const {
    palette: { mode },
  } = useTheme();
  const toggleThemeMode = useToggleThemeMode();

  useLayoutEffect(() => {
    if (address !== 'disconnected' && isNilOrEmpty(ls[address])) {
      setLs({
        ...ls,
        [address]: ls.disconnected,
      });
    }
  }, [address, ls, setLs]);

  useLayoutEffect(() => {
    const set = ls[address]?.dark ? 'dark' : 'light';
    if (mode !== set) {
      toggleThemeMode();
    }
  }, [address, ls, mode, toggleThemeMode]);

  const state = useMemo(() => ls[address] ?? ls.disconnected, [address, ls]);

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
