import { TradingPanelProvider } from '@dhedge/core-ui-kit';

import type { TradingPanelContextConfig } from '@dhedge/core-ui-kit/types';
import type { FC, PropsWithChildren } from 'react';

export const CoreUIToolkitProvider: FC<
  PropsWithChildren<TradingPanelContextConfig>
> = ({ children, actions, initialState }) => (
  <TradingPanelProvider actions={actions} initialState={initialState}>
    {children}
  </TradingPanelProvider>
);
