import {
  ConvexProtocol,
  CurveProtocol,
  MvUSDC,
  SimplePurpleBkgIcon,
  TriplePurpleBkgIcon,
} from '@frontend/shared-icons';
import { Stack, Typography } from '@mui/material';
import { User, Vault } from 'phosphor-react';
import { useIntl } from 'react-intl';

import {
  ArrowRight,
  ArrowUp,
  IconContainer,
  SquaredIconContainer,
} from '../components/Containers';

export const Home = () => {
  const intl = useIntl();

  return (
    <Stack direction="column" alignItems="center">
      <Stack direction="row" alignItems="center" spacing={0.5} width={1}>
        <TriplePurpleBkgIcon icon={<User />} size={56} />
        <ArrowRight width={1} />
        <IconContainer>
          <MvUSDC />
          <Typography>USDC</Typography>
        </IconContainer>
        <ArrowRight width={1} />
        <IconContainer minWidth={466} justifyContent="center">
          <SimplePurpleBkgIcon icon={<Vault />} />
          <Typography>Meta Vault</Typography>
        </IconContainer>
        <ArrowRight width={1} />
        <IconContainer>
          <MvUSDC />
          <Typography>USDC</Typography>
        </IconContainer>
        <ArrowRight width={1} />
        <TriplePurpleBkgIcon icon={<User />} size={56} />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Stack direction="column" alignItems="center" height={200} width={150}>
          <ArrowUp height={100} />
          <IconContainer width={1}>
            <CurveProtocol />
            <Typography>mUSD/3CRV</Typography>
          </IconContainer>
          <ArrowUp height={100} />
          <SquaredIconContainer width={1}>
            <ConvexProtocol />
            <Typography>Convex</Typography>
          </SquaredIconContainer>
        </Stack>
        <Stack direction="column" alignItems="center" height={200} width={150}>
          <ArrowUp height={100} />
          <IconContainer>
            <CurveProtocol />
            <Typography>BUSD/3CRV</Typography>
          </IconContainer>
          <ArrowUp height={100} />
          <SquaredIconContainer width={1}>
            <ConvexProtocol />
            <Typography>Convex</Typography>
          </SquaredIconContainer>
        </Stack>
        <Stack direction="column" alignItems="center" height={200} width={150}>
          <ArrowUp height={100} />
          <IconContainer>
            <CurveProtocol />
            <Typography>FRAX/3CRV</Typography>
          </IconContainer>
          <ArrowUp height={100} />
          <SquaredIconContainer width={1}>
            <ConvexProtocol />
            <Typography>Convex</Typography>
          </SquaredIconContainer>
        </Stack>
      </Stack>
      <Typography variant="h3" pt={10} pb={3}>
        {intl.formatMessage({
          defaultMessage: 'Need more light on the strategy?',
        })}
      </Typography>
      <Typography variant="subtitle1">
        {intl.formatMessage({
          defaultMessage: 'Check the onboarding tour.',
        })}
      </Typography>
    </Stack>
  );
};
