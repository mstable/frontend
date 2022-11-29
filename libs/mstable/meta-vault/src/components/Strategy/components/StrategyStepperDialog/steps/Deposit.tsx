import {
  MvUSDC,
  SimplePurpleBkgIcon,
  TriplePurpleBkgIcon,
} from '@frontend/shared-icons';
import { Stack, Typography } from '@mui/material';
import { User, Vault } from 'phosphor-react';
import { times } from 'ramda';
import { useIntl } from 'react-intl';

import {
  ArrowRight,
  IconContainer,
  SquaredIconContainer,
} from '../components/Containers';
import { StepIndicator } from '../components/StepIndicator';

export const Deposit = () => {
  const intl = useIntl();

  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="space-evenly">
        <Stack direction="column" spacing={1}>
          {times(
            (n) => (
              <IconContainer
                key={`user-${n}`}
                sx={{
                  ...(n !== 1 && { transform: 'scale(75%)', opacity: 0.3 }),
                }}
              >
                <SimplePurpleBkgIcon icon={<User />} />
                <Typography>
                  {intl.formatMessage({ defaultMessage: 'User' })}
                </Typography>
              </IconContainer>
            ),
            3,
          )}
        </Stack>
        <Stack direction="column" justifyContent="space-around">
          {times(
            (n) => (
              <ArrowRight
                key={`arrow-left-${n}`}
                width={300}
                sx={{
                  ...(n !== 1 && { opacity: 0.75 }),
                }}
              />
            ),
            3,
          )}
        </Stack>
        <Stack direction="column" spacing={1}>
          {times(
            (n) => (
              <IconContainer
                key={`asset-${n}`}
                sx={{
                  ...(n !== 1 && { transform: 'scale(75%)', opacity: 0.3 }),
                }}
              >
                <MvUSDC />
                <Typography>
                  {intl.formatMessage({ defaultMessage: 'USDC' })}
                </Typography>
              </IconContainer>
            ),
            3,
          )}
        </Stack>
        <Stack direction="column" justifyContent="space-around">
          {times(
            (n) => (
              <ArrowRight
                key={`arrow-left-${n}`}
                width={300}
                sx={{
                  ...(n !== 1 && { opacity: 0.75 }),
                }}
              />
            ),
            3,
          )}
        </Stack>
        <SquaredIconContainer
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <TriplePurpleBkgIcon icon={<Vault />} size={56} />
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Meta Vault' })}
          </Typography>
        </SquaredIconContainer>
      </Stack>
      <Stack display="flex" justifyContent="center" alignItems="center" my={9}>
        <StepIndicator />
      </Stack>
      <Typography variant="h3" pb={3} textAlign="center">
        {intl.formatMessage({
          defaultMessage: 'User deposits USDC',
        })}
      </Typography>
      <Typography variant="subtitle1" textAlign="center">
        {intl.formatMessage({
          defaultMessage:
            'This Meta Vault accepts USDC. Anyone can deposit and receive vault shares.',
        })}
      </Typography>
    </Stack>
  );
};
