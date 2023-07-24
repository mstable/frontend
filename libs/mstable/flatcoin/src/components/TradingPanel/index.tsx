import { useMemo } from 'react';

import { Card, CardContent, Stack, Tab, Tabs } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNavigate } from '@tanstack/react-location';

import { useFlatcoin } from '../../state';
import { FlatcoinTradingStateProvider } from './state';
import { TradingInputs } from './TradingInputs';
import { TradingRecap } from './TradingRecap';

import type { CardProps } from '@mui/material';
import type { FC } from 'react';

import type { FlatcoinRoute, PositionType } from '../../types';
import produce from 'immer';

const TABS: Lowercase<PositionType>[] = ['flatcoin', 'leveragedeth'];
const TRADING_TAB_INDEX_MAP = TABS.reduce<
  Record<number, Lowercase<PositionType>>
>((acc, type, index) => {
  acc[index] = type;
  return acc;
}, {});

const useTradingPanel = () => {
  const intl = useIntl();
  const navigate = useNavigate<FlatcoinRoute>();
  const { type } = useFlatcoin();

  const onTabChange = (index: number) => {
    navigate({
      replace: true,
      search: produce((draft) => {
        draft.type = TRADING_TAB_INDEX_MAP[index];
      }),
    });
  };

  const tabNameMap: Record<Lowercase<PositionType>, string> = useMemo(
    () => ({
      flatcoin: intl.formatMessage({
        defaultMessage: 'Flatcoin',
        id: 'Ew5cbe',
      }),
      leveragedeth: intl.formatMessage({
        defaultMessage: 'Leveraged ETH',
        id: 'xSqIpD',
      }),
    }),
    [intl],
  );

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
          {/*<TradingSettings*/}
          {/*  sx={{ position: 'absolute', right: 5, top: 5, zIndex: 10 }}*/}
          {/*/>*/}
          <Tabs
            value={currentTab}
            onChange={(_, tab: number) => {
              onTabChange(tab);
            }}
            textColor="inherit"
            variant="fullWidth"
            sx={{ marginTop: 1 }}
          >
            {TABS.map((tab) => (
              <Tab key={tab} label={tabNameMap[tab]} />
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
              {/*<TradingButton />*/}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </FlatcoinTradingStateProvider>
  );
};
