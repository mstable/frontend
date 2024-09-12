import { DHEDGE_DAPP_LINK } from '@frontend/shared-constants';
import { MotionStack } from '@frontend/shared-ui';
import { Button, Stack, Typography } from '@mui/material';

import { useSetStep } from '../hooks';
import { useTrackedState } from '../state';

import type { MotionStackProps } from '@frontend/shared-ui';

export const WithdrawStep = (props: MotionStackProps) => {
  const setStep = useSetStep();
  const { l2token } = useTrackedState();

  return (
    <MotionStack {...props}>
      <Typography variant="h4" mb={4}>
        Withdraw your {l2token.contract.name} tokens to stables
      </Typography>
      <Typography mb={2}>
        Your {l2token.contract.name} tokens are earning yield and you can hold
        on to them.<br></br>Optionally you can go to dHEDGE app to withdraw your{' '}
        {l2token.contract.symbol} tokens to stablecoins.
      </Typography>
      <Stack direction="row" my={4} justifyContent="center" alignItems="center">
        <Button
          href={`${DHEDGE_DAPP_LINK}/vault/${l2token.contract.address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Withdraw to stablecoins
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
          Back
        </Button>
      </Stack>
    </MotionStack>
  );
};
