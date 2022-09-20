import { Card, CardContent, Stack, Tab, Tabs } from '@mui/material';
import { useIntl } from 'react-intl';

import { ApprovalButton } from './components/ApprovalButton';
import { OperationsForm } from './components/OperationsForm';
import { Recap } from './components/Recap';
import { SubmitButton } from './components/SubmitButton';
import { useChangeTab, useOperations } from './hooks';
import { Provider } from './state';

const OperationsWrapped = () => {
  const intl = useIntl();
  const changeTab = useChangeTab();
  const { tab, needsApproval } = useOperations();

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

            <Stack
              direction="column"
              spacing={1}
              sx={{
                p: 2,
                borderRadius: 1,
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <Recap pb={2} />
              {needsApproval && <ApprovalButton />}
              <SubmitButton />
            </Stack>
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
