import { useState } from 'react';

import { Card, CardContent, Stack, Tab, Tabs } from '@mui/material';
import { useIntl } from 'react-intl';

import { OperationsForm } from './components/OperationsForm';
import { RecapCard } from './components/RecapCard';
import { SubmitButton } from './components/SubmitButton';
import { useOperations } from './hooks';
import { Provider } from './state';

import type { SyntheticEvent } from 'react';

const OperationsWrapped = () => {
  const intl = useIntl();
  const [tabIdx, setTabIdx] = useState(0);
  const { amount } = useOperations();

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
          <Stack pt={2} spacing={2}>
            <OperationsForm />
            {amount && <RecapCard />}
            <SubmitButton />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const Operations = () => (
  <Provider>
    <OperationsWrapped />
  </Provider>
);
