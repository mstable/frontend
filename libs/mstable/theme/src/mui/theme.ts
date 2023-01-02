import { createTheme, responsiveFontSizes } from '@mui/material';

import { breakpointsOptions } from './breakpoints';
import { getAlert } from './components/Alert';
import { getAppBar } from './components/AppBar';
import { getAvatar } from './components/Avatar';
import { getButton } from './components/Button';
import { getButtonBase } from './components/ButtonBase';
import { getButtonGroup } from './components/ButtonGroup';
import { getCard } from './components/Card';
import { getCardHeader } from './components/CardHeader';
import { getCheckbox } from './components/Checkbox';
import { getChip } from './components/Chip';
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
import { getLink } from './components/Link';
import { getMenu } from './components/Menu';
import { getMenuItem } from './components/MenuItem';
import { getOutlinedInput } from './components/OutlinedInput';
import { getPaper } from './components/Paper';
import { getRadio } from './components/Radio';
import { getSelect } from './components/Select';
import { getTab } from './components/Tab';
import { getTableCell } from './components/TableCell';
import { getTextField } from './components/TextField';
import { getToggleButton } from './components/ToggleButton';
import { getToggleButtonGroup } from './components/ToggleButtonGroup';
import { getTooltip } from './components/Tooltip';
import { getTypography } from './components/Typography';
import { getMixinsOptions } from './mixins';
import { getPaletteOptions } from './palette';
import { getShadowsOptions } from './shadows';
import { shapeOptions } from './shape';
import { getTypographyOptions } from './typography';

import type { PaletteMode } from '@mui/material';

export const getTheme = (mode: PaletteMode) => {
  const paletteOptions = getPaletteOptions(mode);
  const base = createTheme(
    paletteOptions,
    shapeOptions,
    breakpointsOptions,
    getTypographyOptions(paletteOptions),
    getShadowsOptions(mode),
  );

  return createTheme(
    base,
    getAlert(base),
    getAppBar(base),
    getAvatar(base),
    getButton(base),
    getButtonBase(base),
    getButtonGroup(base),
    getCheckbox(base),
    getChip(base),
    getCard(base),
    getCardHeader(base),
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
    getLink(base),
    getMenu(base),
    getMenuItem(base),
    getMixinsOptions(base),
    getOutlinedInput(base),
    getPaper(base),
    getRadio(base),
    getSelect(base),
    getTab(base),
    getTableCell(base),
    getTextField(base),
    getToggleButton(base),
    getToggleButtonGroup(base),
    getTooltip(base),
    getTypography(base),
  );
};

export const light = responsiveFontSizes(getTheme('light'));
export const dark = responsiveFontSizes(getTheme('dark'));
