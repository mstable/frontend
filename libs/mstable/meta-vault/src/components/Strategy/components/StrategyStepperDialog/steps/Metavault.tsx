import {
  ConvexProtocol,
  CurveProtocol,
  MvUSDC,
  TriplePurpleBkgIcon,
} from '@frontend/shared-icons';
import { Stack, Typography } from '@mui/material';
import { Vault } from 'phosphor-react';
import { times } from 'ramda';
import { useIntl } from 'react-intl';

import {
  ArrowRight,
  ArrowUp,
  IconContainer,
  SquaredIconContainer,
} from '../components/Containers';
import { StepIndicator } from '../components/StepIndicator';

export const Metavault = () => {
  const intl = useIntl();

  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="space-evenly">
        <Stack direction="column" justifyContent="space-around">
          {times(
            (n) => (
              <ArrowRight
                key={`arrow-left-${n}`}
                width={100}
                sx={{
                  opacity: 0.75,
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
                key={`user-${n}`}
                sx={{
                  opacity: 0.75,
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
                width={100}
                sx={{
                  opacity: 0.75,
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
          width={466}
        >
          <TriplePurpleBkgIcon icon={<Vault />} size={56} />
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Meta Vault' })}
          </Typography>
        </SquaredIconContainer>
        <Stack direction="column" justifyContent="space-around">
          {times(
            (n) => (
              <ArrowRight
                key={`arrow-left-${n}`}
                width={100}
                sx={{
                  opacity: 0.75,
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
                key={`user-${n}`}
                sx={{
                  opacity: 0.75,
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
                width={100}
                sx={{
                  opacity: 0.75,
                }}
              />
            ),
            3,
          )}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Stack direction="column" alignItems="center" height={200} width={150}>
          <Stack direction="row" spacing={2}>
            <ArrowUp height={50} />
            <ArrowUp height={50} />
          </Stack>
          <IconContainer width={1}>
            <CurveProtocol />
            <Typography>mUSD/3CRV</Typography>
          </IconContainer>
          <Stack direction="row" spacing={2}>
            <ArrowUp height={50} />
            <ArrowUp height={50} />
          </Stack>
          <SquaredIconContainer width={1}>
            <ConvexProtocol />
            <Typography>Convex</Typography>
          </SquaredIconContainer>
        </Stack>
        <Stack direction="column" alignItems="center" height={200} width={150}>
          <Stack direction="row" spacing={2}>
            <ArrowUp height={50} />
            <ArrowUp height={50} />
          </Stack>
          <IconContainer>
            <CurveProtocol />
            <Typography>BUSD/3CRV</Typography>
          </IconContainer>
          <Stack direction="row" spacing={2}>
            <ArrowUp height={50} />
            <ArrowUp height={50} />
          </Stack>
          <SquaredIconContainer width={1}>
            <ConvexProtocol />
            <Typography>Convex</Typography>
          </SquaredIconContainer>
        </Stack>
        <Stack direction="column" alignItems="center" height={200} width={150}>
          <Stack direction="row" spacing={2}>
            <ArrowUp height={50} />
            <ArrowUp height={50} />
          </Stack>
          <IconContainer>
            <CurveProtocol />
            <Typography>FRAX/3CRV</Typography>
          </IconContainer>
          <Stack direction="row" spacing={2}>
            <ArrowUp height={50} />
            <ArrowUp height={50} />
          </Stack>
          <SquaredIconContainer width={1}>
            <ConvexProtocol />
            <Typography>Convex</Typography>
          </SquaredIconContainer>
        </Stack>
      </Stack>
      <Stack display="flex" justifyContent="center" alignItems="center" my={9}>
        <StepIndicator />
      </Stack>
      <Typography variant="h3" pb={3} textAlign="center">
        {intl.formatMessage({
          defaultMessage: 'What’s Meta Vault?',
        })}
      </Typography>
      <Typography variant="subtitle1" textAlign="center">
        {intl.formatMessage({
          defaultMessage:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        })}
      </Typography>
    </Stack>
  );
};
