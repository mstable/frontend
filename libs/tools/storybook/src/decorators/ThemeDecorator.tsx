import { dark, light } from '@frontend/mstable-theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

import type { DecoratorFunction } from '@storybook/addons';

export const ThemeDecorator: DecoratorFunction<JSX.Element> = (
  Story,
  context,
) => {
  const themeMode =
    context?.args?.['themeMode'] ?? context?.globals?.['themeMode'] ?? 'light';

  return (
    <ThemeProvider theme={themeMode === 'dark' ? dark : light}>
      <CssBaseline />
      <Story {...context} />
    </ThemeProvider>
  );
};
