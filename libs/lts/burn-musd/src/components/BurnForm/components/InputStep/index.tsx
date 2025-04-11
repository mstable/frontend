import { OpenAccountModalButton } from '@frontend/shared-providers';
import { MotionStack } from '@frontend/shared-ui';
import { Button, Stack } from '@mui/material';
import { constants } from 'ethers';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

import { l1Chain } from '../../../../constants';
import { useNeedsApproval } from '../../hooks/useNeedsApproval';
import { useTrackedState } from '../../state';
import { useSetStep } from '../../state.hooks';
import { ApprovalButton } from './ApprovalButton';
import { SubmitButton } from './SubmitButton';
import { TokenInputs } from './TokenInputs';

import type { MotionStackProps } from '@frontend/shared-ui';

export const InputStep = (props: MotionStackProps) => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { l2token } = useTrackedState();
  const setStep = useSetStep();
  const needsApproval = useNeedsApproval();
  const isL1Chain = chain?.id === l1Chain.id;

  return (
    <MotionStack alignItems="flex-start" {...props}>
      <Stack width={1} justifyContent="center" alignItems="center" my={8}>
        <Stack width={{ xs: 'auto', lg: 3 / 4 }}>
          <TokenInputs mb={4} />
          {!isConnected ? (
            <OpenAccountModalButton fullWidth size="large" />
          ) : isL1Chain ? (
            <>{needsApproval ? <ApprovalButton /> : <SubmitButton />}</>
          ) : (
            <Button onClick={() => switchNetwork(l1Chain.id)} size="large">
              Switch to {l1Chain.name}
            </Button>
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
