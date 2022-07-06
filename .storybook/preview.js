import { addons } from '@storybook/addons';

import { ThemeDecorator } from '@frontend/shared-storybook';
import theme from './theme';

export const globalTypes = {
  themeMode: {
    name: 'Theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

export const parameters = {
  backgrounds: { disable: true },
  controls: {
    disable: true,
    hideNoControlsWarning: true,
  },
};

export const decorators = [ThemeDecorator];

addons.setConfig({
  theme,
});
