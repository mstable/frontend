import { darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { mergeDeepRight } from 'ramda';

import { colors } from '../constants';

import type { RecursivePartial } from '@frontend/shared-utils';
import type { Theme } from '@rainbow-me/rainbowkit';

const light = lightTheme();
const dark = darkTheme();

const common: RecursivePartial<Theme> = {
  fonts: { body: 'Plus Jakarta Sans' },
  colors: {
    accentColor: colors.blue02,
  },
};

export const rbkLightTheme: Theme = mergeDeepRight(light, common);

export const rbkDarkTheme: Theme = mergeDeepRight(
  mergeDeepRight(dark, common),
  {
    colors: {
      modalBackground: colors.darkBlue09,
    },
  },
);
