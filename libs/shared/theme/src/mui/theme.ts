import { createTheme } from '@mui/material';

import { getAppBar } from './components/AppBar';
import { getAvatar } from './components/Avatar';
import { getButton } from './components/Button';
import { getButtonBase } from './components/ButtonBase';
import { getButtonGroup } from './components/ButtonGroup';
import { getCheckbox } from './components/Checkbox';
import { getCSSBaseline } from './components/CSSBaseline';
import { getDialog } from './components/Dialog';
import { getDialogActions } from './components/DialogActions';
import { getDialogContent } from './components/DialogContent';
import { getDialogTitle } from './components/DialogTitle';
import { getDivider } from './components/Divider';
import { getFormControl } from './components/FormControl';
import { getFormControlLabel } from './components/FormControlLabel';
import { getFormGroup } from './components/FormGroup';
import { getFormHelperText } from './components/FormHelperText';
import { getFormLabel } from './components/FormLabel';
import { getInputBase } from './components/InputBase';
import { getInputLabel } from './components/InputLabel';
import { getMenu } from './components/Menu';
import { getMenuItem } from './components/MenuItem';
import { getOutlinedInput } from './components/OutlinedInput';
import { getRadio } from './components/Radio';
import { getSelect } from './components/Select';
import { getTextField } from './components/TextField';
import { getTypography } from './components/Typography';
import { getMixinsOptions } from './mixins';
import { getPaletteOptions } from './palette';
import { shapeOptions } from './shape';
import { getTypographyOptions } from './typography';

import type { PaletteMode } from '@mui/material';

export const getTheme = (mode: PaletteMode) => {
  const paletteOptions = getPaletteOptions(mode);
  const base = createTheme(
    paletteOptions,
    shapeOptions,
    getTypographyOptions(paletteOptions),
  );

  return createTheme(
    base,
    getAppBar(base),
    getAvatar(base),
    getButton(base),
    getButtonBase(base),
    getButtonGroup(base),
    getCheckbox(base),
    getCSSBaseline(base),
    getDialog(base),
    getDialogActions(base),
    getDialogContent(base),
    getDialogTitle(base),
    getDivider(base),
    getFormControl(base),
    getFormControlLabel(base),
    getFormGroup(base),
    getFormHelperText(base),
    getFormLabel(base),
    getInputBase(base),
    getInputLabel(base),
    getMenu(base),
    getMenuItem(base),
    getMixinsOptions(base),
    getOutlinedInput(base),
    getRadio(base),
    getSelect(base),
    getTextField(base),
    getTypography(base),
  );
};

export const light = getTheme('light');
export const dark = getTheme('dark');
