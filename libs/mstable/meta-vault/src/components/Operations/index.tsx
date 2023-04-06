import { useEffect } from 'react';

import { BigDecimal } from '@frontend/shared-utils';
import {
  alpha,
  Card,
  CardContent,
  Collapse,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useNavigate, useSearch } from '@tanstack/react-location';
import produce from 'immer';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useMetavault } from '../../state';
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

import type { CardProps } from '@mui/material';

import type { MvRoute } from '../../types';

export type OperationsProps = CardProps & {
  disabled?: boolean;
};

const OperationsWrapped = ({ disabled, ...rest }: OperationsProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const navigate = useNavigate<MvRoute>();
  const { input } = useSearch<MvRoute>();
  const changeTab = useChangeTab();
  const setAmount = useSetAmount();
  const changeOperation = useChangeOperation();
  const { assetToken } = useMetavault();
  const { operation, tab, needsApproval, isSubmitLoading } = useOperations();

  useEffect(() => {
    if (input && isConnected) {
      if (operation !== input.operation) {
        changeOperation(input.operation);
      }
      setAmount(BigDecimal.fromSimple(input.amount, assetToken?.decimals));
      navigate({
        replace: true,
        search: produce((draft) => {
          delete draft.input;
        }),
      });
    }
  }, [
    assetToken?.decimals,
    changeOperation,
    input,
    isConnected,
    navigate,
    operation,
    setAmount,
  ]);

  return (
    <Card {...rest} sx={{ position: 'relative', ...rest?.sx }}>
      {disabled && (
        <Stack
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            zIndex: 100,
            backgroundColor: (theme) =>
              alpha(theme.palette.background.default, 0.5),
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" textAlign="center">
            {intl.formatMessage({
              defaultMessage: 'Operations are momentarily disabled',
              id: 'VMhVlJ',
            })}
          </Typography>
        </Stack>
      )}
      <CardContent>
        <Tabs
          value={tab}
          onChange={(_, tab: 0 | 1) => {
            changeTab(tab);
          }}
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab
            label={intl.formatMessage({
              defaultMessage: 'DEPOSIT',
              id: 'KYgRAc',
            })}
            disabled={isSubmitLoading}
          />
          <Tab
            label={intl.formatMessage({
              defaultMessage: 'WITHDRAW',
              id: 'zRbVmO',
            })}
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
              <ApprovalButton fullWidth disabled={disabled} />
            </Collapse>
            <SubmitButton disabled={disabled} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const Operations = (props: OperationsProps) => (
  <Provider>
    <OperationsWrapped {...props} />
  </Provider>
);
