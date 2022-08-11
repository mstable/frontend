import { Card, CardContent, Stack, Tab, Tabs } from '@mui/material';
import { useIntl } from 'react-intl';

import { OperationsForm } from './components/OperationsForm';
import { RecapStepper } from './components/RecapStepper';
import { SubmitButton } from './components/SubmitButton';
import { useChangeTab, useOperations } from './hooks';
import { Provider } from './state';

const OperationsWrapped = () => {
  const intl = useIntl();
  const changeTab = useChangeTab();
  const { amount, tab, isError } = useOperations();

  return (
    <Card>
      <CardContent>
        <Stack>
          <Tabs
            value={tab}
            onChange={(_, tab: 0 | 1) => {
              changeTab(tab);
            }}
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label={intl.formatMessage({ defaultMessage: 'DEPOSIT' })} />
            <Tab label={intl.formatMessage({ defaultMessage: 'WITHDRAW' })} />
          </Tabs>
          <Stack pt={2} spacing={2}>
            <OperationsForm />
            {amount && !isError && <RecapStepper />}
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
