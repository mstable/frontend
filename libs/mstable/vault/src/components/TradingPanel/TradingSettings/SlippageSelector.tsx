import {
  useTradingPanelSettings,
  useTradingPanelType,
} from '@dhedge/core-ui-kit/hooks/state';
import { Input, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

import type { ChangeEvent, FC } from 'react';

const useSlippageSelector = () => {
  const [tradingType] = useTradingPanelType();
  const [settings, updateSettings] = useTradingPanelSettings();

  const isCustomSlippage = settings.slippage !== 'auto';

  const handleDefaultSlippageSelected = () => {
    updateSettings({ slippage: 'auto' });
  };

  const handleCustomSlippageChange = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = e.target.value;
    const invalid = +value < 0 || +value > 100;

    if (invalid || (value.trim().length === 0 && isCustomSlippage)) {
      updateSettings({ slippage: 'auto' });
    } else if (value.trim().length > 0) {
      updateSettings({ slippage: +value });
    }
  };

  return {
    settings,
    tradingType,
    isCustomSlippage,
    onDefaultSlippageSelect: handleDefaultSlippageSelected,
    onCustomSlippageSelect: handleCustomSlippageChange,
  };
};

export const SlippageSelector: FC = () => {
  const {
    settings,
    isCustomSlippage,
    onDefaultSlippageSelect,
    onCustomSlippageSelect,
  } = useSlippageSelector();

  return (
    <Stack direction="row" alignItems="end" spacing={4} sx={{ marginTop: 1 }}>
      <ToggleButtonGroup
        size="small"
        value={settings.slippage}
        exclusive
        onChange={onDefaultSlippageSelect}
      >
        <ToggleButton value="auto" sx={{ p: 1, width: 70 }}>
          Auto
        </ToggleButton>
        ;
      </ToggleButtonGroup>
      <Stack direction="row">
        <Input
          placeholder="0"
          value={isCustomSlippage ? settings.slippage : ''}
          onChange={onCustomSlippageSelect}
          type="number"
          sx={{
            typography: 'value3',
            maxWidth: 50,
            '& input::placeholder': {
              fontSize: '1.2rem!important',
            },
          }}
          size="small"
        />
        %
      </Stack>
    </Stack>
  );
};
