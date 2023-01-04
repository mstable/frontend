import { Switch } from '@mui/material';

import { useToggleThemeMode } from '../hooks';
import { useTrackedState } from '../state';

import type { SwitchProps } from '@mui/material';

interface ThemeSwitchProps extends SwitchProps {
  disableClick?: boolean;
}

export const ThemeSwitch = ({
  disableClick,
  sx,
  ...rest
}: ThemeSwitchProps) => {
  const { mode } = useTrackedState();
  const toggleThemeMode = useToggleThemeMode();

  const handleChange = () => {
    if (!disableClick) {
      toggleThemeMode();
    }
  };

  return (
    <Switch
      size="medium"
      sx={{
        ...sx,
        '& .MuiSwitch-thumb': {
          '&:before': {
            content: mode === 'dark' ? "'🌙'" : "'🌞'",
            fontSize: 12,
            height: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
      }}
      {...rest}
      checked={mode === 'dark'}
      onChange={handleChange}
    />
  );
};
