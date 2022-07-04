import { createTheme } from '@mui/material';

import { getAppBar } from './components/AppBar';
import { getAvatar } from './components/Avatar';
import { getAvatarGroup } from './components/AvatarGroup';
import { getButton } from './components/Button';
import { getButtonBase } from './components/ButtonBase';
import { getCSSBaseline } from './components/CSSBaseline';
import { getDialog } from './components/Dialog';
import { getDialogActions } from './components/DialogActions';
import { getDialogContent } from './components/DialogContent';
import { getDialogTitle } from './components/DialogTitle';
import { getDivider } from './components/Divider';
import { getInputBase } from './components/InputBase';
import { getInputLabel } from './components/InputLabel';
import { getMenu } from './components/Menu';
import { getMenuItem } from './components/MenuItem';
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
    getAvatarGroup(base),
    getButton(base),
    getButtonBase(base),
    getCSSBaseline(base),
    getDialog(base),
    getDialogActions(base),
    getDialogContent(base),
    getDialogTitle(base),
    getDivider(base),
    getInputBase(base),
    getInputLabel(base),
    getMenu(base),
    getMenuItem(base),
    getMixinsOptions(base),
    getTextField(base),
    getTypography(base),
  );
};

export const light = getTheme('light');
export const dark = getTheme('dark');
