import {
  Checkbox as MuiCheckbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Radio as MuiRadio,
  RadioGroup,
  Stack,
} from '@mui/material';

export default {
  title: 'Theme/FormControls',
  subcomponents: {
    FormControl,
    FormControlLabel,
    FormGroup,
    RadioGroup,
    InputLabel,
  },
};

const Template = () => {
  // const [selected, setSelected] = useState('0');

  // const handleChange = (event: SelectChangeEvent) => {
  //   setSelected(event.target.value as string);
  // };

  return (
    <Stack direction="column" spacing={2} p={2}>
      <FormGroup>
        <FormControlLabel control={<MuiCheckbox />} label="Label" />
        <FormControlLabel
          control={<MuiCheckbox defaultChecked />}
          label="Label"
        />
        <FormControlLabel disabled control={<MuiCheckbox />} label="Disabled" />
      </FormGroup>
      <RadioGroup defaultValue={1}>
        <FormControlLabel
          value={1}
          control={<MuiRadio defaultChecked />}
          label="Label 1"
        />
        <FormControlLabel
          value={2}
          control={<MuiRadio defaultChecked />}
          label="Label 2"
        />
        <FormControlLabel
          value={3}
          control={<MuiRadio defaultChecked />}
          label="Label 3"
        />
        <FormControlLabel disabled control={<MuiRadio />} label="Disabled" />
      </RadioGroup>
      {/* <FormGroup>
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
      </FormGroup> */}
    </Stack>
  );
};

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
