import { OpenAccountModalButton } from '@frontend/shared-providers';
import { MotionStack } from '@frontend/shared-ui';
import { Button, Stack, Typography } from '@mui/material';
import { constants } from 'ethers';
import { useAccount } from 'wagmi';

import { useSetStep } from '../../hooks';
import { useTrackedState } from '../../state';
import { ApprovalButton } from './components/ApprovalButton';
import { SubmitButton } from './components/SubmitButton';
import { TokenInputs } from './components/TokenInputs';

import type { MotionStackProps } from '@frontend/shared-ui';
export const InputStep = (props: MotionStackProps) => {
  const { isConnected } = useAccount();
  const { l1token, l2token, needsApproval } = useTrackedState();
  const setStep = useSetStep();

  return (
    <MotionStack alignItems="flex-start" {...props}>
      <Typography variant="h5" mb={2}>
        Burn your dHEDGE V1 {l1token.contract.name ?? 'vault'} tokens to receive{' '}
        {l2token.contract.name ?? ''} vault tokens
      </Typography>
      <Stack width={1} justifyContent="center" alignItems="center" my={8}>
        <Stack width={3 / 4}>
          <TokenInputs mb={4} />
          {isConnected ? (
            <>{needsApproval ? <ApprovalButton /> : <SubmitButton />}</>
          ) : (
            <OpenAccountModalButton fullWidth size="large" />
          )}
        </Stack>
      </Stack>
      <Stack
        width={1}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button
          onClick={() => {
            setStep(1);
          }}
          disabled={l2token.balance.exact.eq(constants.Zero)}
        >
          Next Step
        </Button>
      </Stack>
    </MotionStack>
  );
};
