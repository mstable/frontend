import type { TradingPanelContextConfig } from '@dhedge/core-ui-kit/types';

export const CORE_UI_TOOLKIT_ACTIONS: TradingPanelContextConfig['actions'] = {
  onLog: (eventName, payload) => {
    console.log(`[core-ui-toolkit]: log ${eventName}`, payload);
  },
};
