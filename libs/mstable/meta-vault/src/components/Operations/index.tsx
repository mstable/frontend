import { useState } from 'react';

import { Card, CardContent, Stack, Tab, Tabs } from '@mui/material';
import { useIntl } from 'react-intl';

import { Deposit } from './components/Deposit';
import { Withdraw } from './components/Withdraw';

import type { SyntheticEvent } from 'react';

export const Operations = () => {
  const intl = useIntl();
  const [tabIdx, setTabIdx] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabIdx(newValue);
  };

  return (
    <Card>
      <CardContent>
        <Stack>
          <Tabs
            value={tabIdx}
            onChange={handleTabChange}
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label={intl.formatMessage({ defaultMessage: 'DEPOSIT' })} />
            <Tab label={intl.formatMessage({ defaultMessage: 'WITHDRAW' })} />
          </Tabs>
          <Stack pt={2}>{tabIdx === 0 ? <Deposit /> : <Withdraw />}</Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
