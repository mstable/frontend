import { useTheme } from '@mui/material';

import { PaletteView } from '../components/PaletteView';

export default {
  title: 'Theme/Palette',
};

const PaletteTemplate = () => {
  const theme = useTheme();

  return <PaletteView theme={theme} />;
};

export const Light = PaletteTemplate.bind({});
Light.args = { themeMode: 'light' };

export const Dark = PaletteTemplate.bind({});
Dark.args = { themeMode: 'dark' };
