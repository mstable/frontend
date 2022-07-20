import { useState } from 'react';

import {
  Checkbox as MuiCheckbox,
  FormControl,
  FormControlLabel as MuiFormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Radio as MuiRadio,
  RadioGroup,
  Select as MuiSelect,
} from '@mui/material';

import type { SelectChangeEvent } from '@mui/material';

export default {
  title: 'Theme/FormControls',
  subcomponents: {
    FormControl,
    FormControlLabel: MuiFormControlLabel,
    FormGroup,
    RadioGroup,
    InputLabel,
  },
};

export const Checkbox = () => (
  <FormGroup>
    <MuiFormControlLabel control={<MuiCheckbox />} label="Label" />
    <MuiFormControlLabel
      control={<MuiCheckbox defaultChecked />}
      label="Label"
    />
    <MuiFormControlLabel disabled control={<MuiCheckbox />} label="Disabled" />
  </FormGroup>
);

export const Radio = () => (
  <RadioGroup defaultValue={1}>
    <MuiFormControlLabel
      value={1}
      control={<MuiRadio defaultChecked />}
      label="Label 1"
    />
    <MuiFormControlLabel
      value={2}
      control={<MuiRadio defaultChecked />}
      label="Label 2"
    />
    <MuiFormControlLabel
      value={3}
      control={<MuiRadio defaultChecked />}
      label="Label 3"
    />
    <MuiFormControlLabel disabled control={<MuiRadio />} label="Disabled" />
  </RadioGroup>
);

export const Select = () => {
  const [selected, setSelected] = useState('0');

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };

  return (
    <FormGroup>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="label">Label</InputLabel>
        <MuiSelect
          labelId="label"
          id="select"
          value={selected}
          label="Label"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="1">Ten</MenuItem>
          <MenuItem value="2">Twenty</MenuItem>
          <MenuItem value="3">Thirty</MenuItem>
        </MuiSelect>
      </FormControl>
      <FormControl disabled sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="label">Label</InputLabel>
        <MuiSelect
          labelId="label"
          id="select"
          value={selected}
          label="Label"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="1">Ten</MenuItem>
          <MenuItem value="2">Twenty</MenuItem>
          <MenuItem value="3">Thirty</MenuItem>
        </MuiSelect>
      </FormControl>
    </FormGroup>
  );
};
