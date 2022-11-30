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
          <Typography variant="buttonSmall">USDC</Typography>
        </IconContainer>
        <ArrowRight width={1} />
        <IconContainer minWidth={466} justifyContent="center">
          <SimplePurpleBkgIcon icon={<Vault />} />
          <Typography variant="buttonSmall">Meta Vault</Typography>
        </IconContainer>
        <ArrowRight width={1} />
        <IconContainer>
          <MvUSDC />
          <Typography variant="buttonSmall">USDC</Typography>
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
            <CurveProtocol fontSize="small" />
            <Typography variant="buttonSmall" color="text.secondary">
              mUSD/3CRV
            </Typography>
          </IconContainer>
          <ArrowUp height={100} />
          <SquaredIconContainer width={1}>
            <ConvexProtocol fontSize="small" />
            <Typography variant="buttonSmall" color="text.secondary">
              Convex
            </Typography>
          </SquaredIconContainer>
        </Stack>
        <Stack direction="column" alignItems="center" height={200} width={150}>
          <ArrowUp height={100} />
          <IconContainer>
            <CurveProtocol fontSize="small" />
            <Typography variant="buttonSmall" color="text.secondary">
              BUSD/3CRV
            </Typography>
          </IconContainer>
          <ArrowUp height={100} />
          <SquaredIconContainer width={1}>
            <ConvexProtocol fontSize="small" />
            <Typography variant="buttonSmall" color="text.secondary">
              Convex
            </Typography>
          </SquaredIconContainer>
        </Stack>
        <Stack direction="column" alignItems="center" height={200} width={150}>
          <ArrowUp height={100} />
          <IconContainer>
            <CurveProtocol fontSize="small" />
            <Typography variant="buttonSmall" color="text.secondary">
              FRAX/3CRV
            </Typography>
          </IconContainer>
          <ArrowUp height={100} />
          <SquaredIconContainer width={1}>
            <ConvexProtocol fontSize="small" />
            <Typography variant="buttonSmall" color="text.secondary">
              Convex
            </Typography>
          </SquaredIconContainer>
        </Stack>
      </Stack>

      <Typography
        variant="h3"
        pb={3}
        pt={10}
        textAlign="center"
        maxWidth={1 / 2}
      >
        {intl.formatMessage({
          defaultMessage: 'Need more light on the strategy?',
        })}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        maxWidth={1 / 2}
        textAlign="center"
      >
        {intl.formatMessage({
          defaultMessage:
            'Start the tour and get more insight on the strategy.',
        })}
      </Typography>
    </Stack>
  );
};
