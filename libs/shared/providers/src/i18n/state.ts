import { useState } from 'react';

import { createContainer } from 'react-tracked';

import { formatLocale } from './utils';

import type { WithRequiredChildren } from '@frontend/shared-utils';
import type { Dispatch, SetStateAction } from 'react';

type I18nState = {
  locale: string;
  supportedLocales: Record<string, string>;
};

export const { Provider, useTrackedState, useUpdate } = createContainer<
  I18nState,
  Dispatch<SetStateAction<I18nState>>,
  WithRequiredChildren<Partial<I18nState>>
>(({ locale, supportedLocales }) =>
  useState<I18nState>({
    locale: formatLocale(locale ?? navigator.language),
    supportedLocales: supportedLocales ?? {
      en: 'English',
    },
  }),
);
