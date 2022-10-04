import { Card, CardContent, Stack, Tab, Tabs } from '@mui/material';
import { useIntl } from 'react-intl';

import { useChangeTab, useOperations } from '../../hooks';
import { ApprovalButton } from './components/ApprovalButton';
import { OperationsForm } from './components/OperationsForm';
import { Recap } from './components/Recap';
import { SubmitButton } from './components/SubmitButton';

export const Operations = () => {
  const intl = useIntl();
  const changeTab = useChangeTab();
  const { tab, needsApproval, isSubmitLoading } = useOperations();

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
            <Tab
              label={intl.formatMessage({ defaultMessage: 'DEPOSIT' })}
              disabled={isSubmitLoading}
            />
            <Tab
              label={intl.formatMessage({ defaultMessage: 'WITHDRAW' })}
              disabled={isSubmitLoading}
            />
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
