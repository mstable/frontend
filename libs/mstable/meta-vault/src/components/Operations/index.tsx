import { useEffect } from 'react';

import { BigDecimal } from '@frontend/shared-utils';
import { Card, CardContent, Collapse, Stack, Tab, Tabs } from '@mui/material';
import { useNavigate, useSearch } from '@tanstack/react-location';
import produce from 'immer';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { ApprovalButton } from './components/ApprovalButton';
import { OperationsForm } from './components/OperationsForm';
import { Recap } from './components/Recap';
import { SubmitButton } from './components/SubmitButton';
import {
  useChangeOperation,
  useChangeTab,
  useOperations,
  useSetAmount,
} from './hooks';
import { Provider } from './state';

import type { MvGenerics } from '../../types';

const OperationsWrapped = () => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const navigate = useNavigate<MvGenerics>();
  const { input } = useSearch<MvGenerics>();
  const changeTab = useChangeTab();
  const setAmount = useSetAmount();
  const changeOperation = useChangeOperation();
  const { operation, tab, needsApproval, isSubmitLoading } = useOperations();

  useEffect(() => {
    if (input && isConnected) {
      if (operation !== input.operation) {
        changeOperation(input.operation);
      }
      setAmount(BigDecimal.fromSimple(input.amount));
      navigate({
        replace: true,
        search: produce((draft) => {
          delete draft.input;
        }),
      });
    }
  }, [changeOperation, input, isConnected, navigate, operation, setAmount]);

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
              <Collapse in={needsApproval}>
                <ApprovalButton fullWidth />
              </Collapse>
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
