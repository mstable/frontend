import { useCallback } from 'react';

import { useUpdate } from './state';
import { formatLocale } from './utils';

export const useChangeLanguage = () => {
  const update = useUpdate();

  return useCallback(
    (locale: string) => {
      update(formatLocale(locale));
    },
    [update],
  );
};
