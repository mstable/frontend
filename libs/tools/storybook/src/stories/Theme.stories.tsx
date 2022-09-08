import { useTheme } from '@mui/material';

import { JsonView } from '../components/JsonView';

export default {
  title: 'Theme/JSON',
};

const Template = () => {
  const theme = useTheme();

  return <JsonView src={theme} jsonViewTheme={theme.palette.mode} />;
};

export const Light = Template.bind({});
Light.args = { themeMode: 'light' };

export const Dark = Template.bind({});
Dark.args = { themeMode: 'dark' };
