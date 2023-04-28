import { MotionStack, TokenInput } from '@frontend/shared-ui';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { ArrowFatDown } from 'phosphor-react';
import { useIntl } from 'react-intl';

import { useSetAmount, useSetStep } from '../hooks';
import { useTrackedState } from '../state';

import type { MotionStackProps } from '@frontend/shared-ui';
import type { StackProps } from '@mui/material';

const ArrowDown = (props: StackProps) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      p={1.5}
      border={(theme) => `1px solid ${theme.palette.divider}`}
      borderRadius={1}
      bgcolor="grey.800"
      {...props}
    >
      <ArrowFatDown size={20} />
    </Stack>
  );
};

export const InputStep = (props: MotionStackProps) => {
  const intl = useIntl();
  const { amount, preview, input } = useTrackedState();
  const setStep = useSetStep();
  const setAmount = useSetAmount();

  return (
    <MotionStack alignItems="flex-start" {...props}>
      <Typography variant="h4" mb={4}>
        {intl.formatMessage({
          defaultMessage:
            'Burn your MTA tokens to receive mStable Treasury Yield tokens',
          id: '5WragJ',
        })}
      </Typography>
      <Typography>
        {intl.formatMessage(
          {
            defaultMessage:
              'Burn MTA to receive {yield} vault tokens on Optimism at a value of $0.0318 per MTA.<br></br>Here is the {roadmap} to help you make a better informed decision.',
            id: 'p6MoDc',
          },
          {
            yield: (
              <Link
                href="https://app.dhedge.org/vault/0x0f6eae52ae1f94bc759ed72b201a2fdb14891485"
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.formatMessage({
                  defaultMessage: 'mStable Treasury Yield',
                  id: 'yNEh8X',
                })}
              </Link>
            ),
            roadmap: (
              <Link
                href="https://medium.com/mstable/some-article"
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.formatMessage({
                  defaultMessage: 'mStable roadmap',
                  id: 'iD4mN7',
                })}
              </Link>
            ),
          },
        )}
      </Typography>
      <Stack width={1} justifyContent="center" alignItems="center" my={8}>
        <Box
          sx={{
            width: 3 / 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <ArrowDown
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          />
          <TokenInput
            amount={amount}
            onChange={setAmount}
            token={input}
            hideBottomRow
            components={{
              container: {
                width: 1,
                padding: 2,
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              },
            }}
          />
          <TokenInput
            amount={preview}
            token={input}
            hideBottomRow
            components={{
              container: {
                width: 1,
                padding: 2,
              },
            }}
          />
        </Box>
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
        >
          {intl.formatMessage({ defaultMessage: 'Next Step', id: '8cv9D4' })}
        </Button>
      </Stack>
    </MotionStack>
  );
};
