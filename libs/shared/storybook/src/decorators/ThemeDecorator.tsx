import { dark, light } from '@frontend/shared-theme';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';

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
      <GlobalStyles
        styles={`
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
      `}
      />
      <Story {...context} />
    </ThemeProvider>
  );
};
