import { Typography } from '@mui/material';
import { IntlProvider } from 'react-intl';

import type { DecoratorFunction } from '@storybook/addons';

export const IntlDecorator: DecoratorFunction<JSX.Element> = (
  Story,
  context,
) => (
  <IntlProvider locale="en" defaultLocale="en" textComponent={Typography}>
    <Story {...context} />
  </IntlProvider>
);
