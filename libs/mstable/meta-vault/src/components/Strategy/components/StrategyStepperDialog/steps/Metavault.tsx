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
                  opacity: 0.3,
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
                  opacity: 0.3,
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
            <CurveProtocol fontSize="small" />
            <Typography variant="buttonSmall" color="text.secondary">
              mUSD/3CRV
            </Typography>
          </IconContainer>
          <Stack direction="row" spacing={2}>
            <ArrowUp height={50} />
            <ArrowUp height={50} />
          </Stack>
          <SquaredIconContainer width={1}>
            <ConvexProtocol fontSize="small" />
            <Typography variant="buttonSmall" color="text.secondary">
              Convex
            </Typography>
          </SquaredIconContainer>
        </Stack>
        <Stack direction="column" alignItems="center" height={200} width={150}>
          <Stack direction="row" spacing={2}>
            <ArrowUp height={50} />
            <ArrowUp height={50} />
          </Stack>
          <IconContainer>
            <CurveProtocol fontSize="small" />
            <Typography variant="buttonSmall" color="text.secondary">
              BUSD/3CRV
            </Typography>
          </IconContainer>
          <Stack direction="row" spacing={2}>
            <ArrowUp height={50} />
            <ArrowUp height={50} />
          </Stack>
          <SquaredIconContainer width={1}>
            <ConvexProtocol fontSize="small" />
            <Typography variant="buttonSmall" color="text.secondary">
              Convex
            </Typography>
          </SquaredIconContainer>
        </Stack>
        <Stack direction="column" alignItems="center" height={200} width={150}>
          <Stack direction="row" spacing={2}>
            <ArrowUp height={50} />
            <ArrowUp height={50} />
          </Stack>
          <IconContainer>
            <CurveProtocol fontSize="small" />
            <Typography variant="buttonSmall" color="text.secondary">
              FRAX/3CRV
            </Typography>
          </IconContainer>
          <Stack direction="row" spacing={2}>
            <ArrowUp height={50} />
            <ArrowUp height={50} />
          </Stack>
          <SquaredIconContainer width={1}>
            <ConvexProtocol fontSize="small" />
            <Typography variant="buttonSmall" color="text.secondary">
              Convex
            </Typography>
          </SquaredIconContainer>
        </Stack>
      </Stack>
      <Stack display="flex" justifyContent="center" alignItems="center" my={9}>
        <StepIndicator />
      </Stack>
      <Stack direction="column" alignItems="center">
        <Typography variant="h3" pb={3} textAlign="center" maxWidth={1 / 2}>
          {intl.formatMessage({
            defaultMessage: 'How does the 3Pool Convex Meta Vault works?',
          })}
        </Typography>
        <Typography
          textAlign="center"
          variant="body2"
          color="text.secondary"
          maxWidth={1 / 2}
        >
          {intl.formatMessage({
            defaultMessage:
              'The Meta Vault then allocates the deposits into different underlying. This Meta Vault uses 3CRV based Metapools and and stakes it on Convex. The strategy earns from the underlying Liquidity Position that earns a fee on every swap, but also from the liquidation of the CRV and CVX rewards. Everything is automated for the user and rewards are auto-compounded.',
          })}
        </Typography>
      </Stack>
    </Stack>
  );
};
