import { useCallback } from 'react';

import produce from 'immer';

import { useTrackedState, useUpdate } from './state';
import { formatLocale } from './utils';

export const useChangeLanguage = () => {
  const { supportedLocales } = useTrackedState();
  const update = useUpdate();

  return useCallback(
    (locale: string) => {
      if (
        Object.keys(supportedLocales)
          .map(formatLocale)
          .includes(formatLocale(locale))
      ) {
        update(
          produce((draft) => {
            draft.locale = formatLocale(locale);
          }),
        );
      }
    },
    [supportedLocales, update],
  );
};
