import { MenuItem, Select } from '@mui/material';

import { supportedLocales } from '../constants';
import { useTrackedState, useUpdate } from '../state';

import type { SelectChangeEvent, SelectProps } from '@mui/material';

export interface I18nSwitchProps
  extends Omit<SelectProps, 'value' | 'onChange'> {
  locales?: Record<keyof typeof supportedLocales, string>;
}

export const I18nSwitch = ({
  locales = supportedLocales,
  ...rest
}: I18nSwitchProps) => {
  const language = useTrackedState();
  const setLanguage = useUpdate();

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <Select size="small" {...rest} value={language} onChange={handleChange}>
      {Object.entries(locales).map(([locale, name]) => (
        <MenuItem key={locale} value={locale}>
          {name}
        </MenuItem>
      ))}
    </Select>
  );
};
