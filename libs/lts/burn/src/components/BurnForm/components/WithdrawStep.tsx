import { TREASURY_YIELD_VAULT_LINK } from '@frontend/shared-constants';
import { MotionStack } from '@frontend/shared-ui';
import { Button, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useSetStep } from '../hooks';

import type { MotionStackProps } from '@frontend/shared-ui';

export const WithdrawStep = (props: MotionStackProps) => {
  const intl = useIntl();
  const setStep = useSetStep();

  return (
    <MotionStack {...props}>
      <Typography variant="h4" mb={4}>
        {intl.formatMessage({
          defaultMessage:
            'Withdraw your mStable Treasury Yield tokens to stables',
          id: 'NnFu82',
        })}
      </Typography>
      <Typography mb={2}>
        {intl.formatMessage({
          defaultMessage:
            'Your mStable Treasury Yield tokens are earning yield and you can hold on to them.<br></br>Optionally you can go to dHEDGE app to withdraw your MTy tokens to stablecoins.',
          id: 'a42kxt',
        })}
      </Typography>
      <Typography>
        {intl.formatMessage({
          defaultMessage:
            'If you burned MTA from Ethereum, please wait while the bridge issues your MTy tokens.',
          id: 'URTaZg',
        })}
      </Typography>
      <Stack direction="row" my={4} justifyContent="center" alignItems="center">
        <Button
          href={TREASURY_YIELD_VAULT_LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          {intl.formatMessage({
            defaultMessage: 'Withdraw to stablecoins',
            id: '4K2D1N',
          })}
        </Button>
      </Stack>
      <Stack
        width={1}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button
          color="secondary"
          onClick={() => {
            setStep(0);
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Back', id: 'cyR7Kh' })}
        </Button>
      </Stack>
    </MotionStack>
  );
};
