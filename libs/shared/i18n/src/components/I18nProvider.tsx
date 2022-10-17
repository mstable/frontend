import { Typography } from '@mui/material';
import { IntlProvider } from 'react-intl';

import { Provider, useTrackedState } from '../state';
import { formatLocale } from '../utils';

import type { Children } from '@frontend/shared-utils';
import type { MessageFormatElement } from 'react-intl';

interface I18nProviderProps extends Children {
  messages?: Record<
    string,
    Record<string, string> | Record<string, MessageFormatElement[]>
  >;
  defaultLanguage?: string;
}

const I18nProviderWrapped = ({
  children,
  messages = {},
}: I18nProviderProps) => {
  const language = useTrackedState();

  const lang = formatLocale(language);
  const mess = messages[lang] ?? {};

  return (
    <IntlProvider
      locale={lang}
      messages={mess}
      defaultLocale="en"
      textComponent={Typography}
      wrapRichTextChunksInFragment
      defaultRichTextElements={{
        p: (chunks) => <p>{chunks}</p>,
        b: (chunks) => <b>{chunks}</b>,
        br: () => <br />,
        strong: (chunks) => <strong>{chunks}</strong>,
      }}
    >
      {children}
    </IntlProvider>
  );
};

export const I18nProvider = ({
  defaultLanguage,
  ...rest
}: I18nProviderProps) => (
  <Provider initialState={defaultLanguage}>
    <I18nProviderWrapped {...rest} />
  </Provider>
);
