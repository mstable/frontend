import { MenuItem, Select } from '@mui/material';

import { useTrackedState, useUpdate } from '../state';

import type { SelectChangeEvent, SelectProps } from '@mui/material';
import produce from 'immer';

export interface I18nSwitchProps
  extends Omit<SelectProps, 'value' | 'onChange'> {
  locales?: Record<string, string>;
}

export const I18nSwitch = (props: SelectProps) => {
  const { locale, supportedLocales } = useTrackedState();
  const update = useUpdate();

  const handleChange = (event: SelectChangeEvent) => {
    update(
      produce((draft) => {
        draft.locale = event.target.value;
      }),
    );
  };

  return (
    <Select size="small" {...props} value={locale} onChange={handleChange}>
      {Object.entries(supportedLocales).map(([locale, name]) => (
        <MenuItem key={locale} value={locale}>
          {name}
        </MenuItem>
      ))}
    </Select>
  );
};
