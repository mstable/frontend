import { OpenAccountModalButton } from '@frontend/shared-providers';
import { MotionStack, TokenInput } from '@frontend/shared-ui';
import { Box, Button, Link, Skeleton, Stack, Typography } from '@mui/material';
import { ArrowFatDown } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useSetMTAAmount, useSetStep } from '../../../hooks';
import { useTrackedState } from '../../../state';
import { ApprovalButton } from './ApprovalButton';
import { SubmitButton } from './SubmitButton';

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
      bgcolor="divider"
      {...props}
      sx={{ svg: { color: 'text.primary' }, ...props?.sx }}
    >
      <ArrowFatDown size={20} />
    </Stack>
  );
};

export const InputStep = (props: MotionStackProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const { mta, mty, isLoading, isError, needsApproval, mtaBuybackPrice } =
    useTrackedState();
  const setStep = useSetStep();
  const setMTAAmount = useSetMTAAmount();

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
              'Burn MTA to receive {yield} vault tokens on Optimism at a value of {price} per MTA.<br></br>Here is the {roadmap} to help you make a better informed decision.',
            id: 'ZVjb/P',
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
            price: Intl.NumberFormat('en-US', {
              currency: 'USD',
              style: 'currency',
              maximumSignificantDigits: 4,
            }).format(mtaBuybackPrice),
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
          <TokenInput
            amount={mta.amount}
            max={mta.balance}
            error={isError}
            onChange={setMTAAmount}
            token={mta.contract}
            hideBottomRow
            disabled={!isConnected || mta.balance.exact.isZero()}
            components={{
              container: {
                width: 1,
                padding: (theme) => theme.spacing(0.5, 2, 0.5, 2),
              },
            }}
          />
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              width: 1,
              padding: (theme) => theme.spacing(0.5, 2, 2, 2),
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="label2" color="text.secondary">
              {isLoading ? (
                <Skeleton width={60} />
              ) : (
                Intl.NumberFormat('en-US', {
                  currency: 'USD',
                  style: 'currency',
                  maximumSignificantDigits: 2,
                }).format(mta.price)
              )}
            </Typography>
            {isConnected && (
              <Typography variant="label2" color="text.secondary">
                {isLoading ? (
                  <Skeleton width={60} />
                ) : (
                  intl.formatMessage(
                    {
                      defaultMessage: 'Balance: {balance}',
                      id: 'vclhrb',
                    },
                    {
                      balance: Intl.NumberFormat('en-US').format(
                        mta.balance.simple,
                      ),
                    },
                  )
                )}
              </Typography>
            )}
          </Stack>
          <ArrowDown
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          />
          <TokenInput
            amount={mty.amount}
            token={mty.contract}
            hideBottomRow
            components={{
              container: {
                width: 1,
                padding: (theme) => theme.spacing(0.5, 2, 0.5, 2),
              },
              input: {
                InputProps: {
                  tabIndex: -1,
                  disabled: true,
                },
              },
            }}
          />
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              width: 1,
              padding: (theme) => theme.spacing(0.5, 2, 2, 2),
            }}
          >
            <Typography variant="label2" color="text.secondary">
              {isLoading ? (
                <Skeleton width={60} />
              ) : (
                Intl.NumberFormat('en-US', {
                  currency: 'USD',
                  style: 'currency',
                  maximumSignificantDigits: 2,
                }).format(mty.price)
              )}
            </Typography>
            {isConnected && (
              <Typography variant="label2" color="text.secondary">
                {isLoading ? (
                  <Skeleton width={60} />
                ) : (
                  intl.formatMessage(
                    {
                      defaultMessage: 'Balance: {balance}',
                      id: 'vclhrb',
                    },
                    {
                      balance: Intl.NumberFormat('en-US').format(
                        mty.balance.simple,
                      ),
                    },
                  )
                )}
              </Typography>
            )}
          </Stack>
        </Box>
        <Stack width={3 / 4} justifyContent="center" alignItems="center" pt={2}>
          {isConnected ? (
            needsApproval ? (
              <ApprovalButton />
            ) : (
              <SubmitButton />
            )
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
        >
          {intl.formatMessage({ defaultMessage: 'Next Step', id: '8cv9D4' })}
        </Button>
      </Stack>
    </MotionStack>
  );
};
