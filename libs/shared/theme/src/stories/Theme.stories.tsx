import { JsonView } from '@frontend/tools-storybook';
import { useTheme } from '@mui/material';

export default {
  title: 'Theme/JSON',
};

const ThemeTemplate = () => {
  const theme = useTheme();

  return <JsonView src={theme} jsonViewTheme={theme.palette.mode} />;
};

export const Light = ThemeTemplate.bind({});
Light.args = { themeMode: 'light' };

export const Dark = ThemeTemplate.bind({});
Dark.args = { themeMode: 'dark' };
