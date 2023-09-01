import { Card, CardContent, Stack, Tab, Tabs } from '@mui/material';

import { useFlatcoinType, usePositionTypeNameMap } from '../../hooks';
import { useTradingType } from './hooks/useTradingType';
import { FlatcoinTradingStateProvider } from './state';
import { TradingButton } from './TradingButton';
import { TradingInputs } from './TradingInputs';
import { TradingRecap } from './TradingRecap';
import { TradingSettings } from './TradingSettings';

import type { CardProps } from '@mui/material';
import type { FC } from 'react';

import type { PositionType } from '../../types';

const TABS: PositionType[] = ['flatcoin', 'leveraged'];
const TRADING_TAB_INDEX_MAP = TABS.reduce<Record<number, PositionType>>(
  (acc, type, index) => {
    acc[index] = type;
    return acc;
  },
  {},
);

const useTradingPanel = () => {
  const [type, updateFlatcoinType] = useFlatcoinType();
  const [, updateTradingType] = useTradingType();

  const onTabChange = (index: number) => {
    const type = TRADING_TAB_INDEX_MAP[index];
    updateFlatcoinType(type);
    type === 'leveraged' && updateTradingType('deposit');
  };

  const tabNameMap = usePositionTypeNameMap();

  return {
    onTabChange,
    tabNameMap,
    currentTab: TABS.indexOf(type),
  };
};

export const TradingPanel: FC<CardProps> = (props) => {
  const { tabNameMap, currentTab, onTabChange } = useTradingPanel();
  return (
    <FlatcoinTradingStateProvider>
      <Card {...props} sx={{ position: 'relative', ...props?.sx }}>
        <CardContent>
          <TradingSettings
            sx={{ position: 'absolute', right: 5, top: 5, zIndex: 10 }}
          />
          <Tabs
            value={currentTab}
            onChange={(_, tab: number) => {
              onTabChange(tab);
            }}
            textColor="inherit"
            variant="fullWidth"
            sx={{ marginTop: 2 }}
          >
            {TABS.map((tab) => (
              <Tab key={tab} label={tabNameMap[tab]} sx={{ fontSize: 12 }} />
            ))}
          </Tabs>
          <Stack pt={2} spacing={2}>
            <TradingInputs />
            <Stack
              direction="column"
              spacing={1.5}
              sx={{
                p: 2,
                borderRadius: 1,
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <TradingRecap />
              <TradingButton />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </FlatcoinTradingStateProvider>
  );
};
