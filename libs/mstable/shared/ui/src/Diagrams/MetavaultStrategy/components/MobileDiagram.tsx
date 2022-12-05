import { cloneElement } from 'react';

import {
  MvUSDC,
  SimplePurpleBkgIcon,
  TriplePurpleBkgIcon,
} from '@frontend/shared-icons';
import { Arrow, ContentContainer } from '@frontend/shared-ui';
import { Stack, Typography, useTheme } from '@mui/material';
import { User, Vault } from 'phosphor-react';
import { useIntl } from 'react-intl';

import { underLyingVaults } from '../constants';
import { useSteps } from '../hooks';

import type { StackProps } from '@mui/material';
import type { TypographyProps } from '@mui/material';

const labelProps: TypographyProps = { variant: 'buttonSmall', noWrap: true };

const arrowHeight = 32;
const containerHeight = 34;

export const MobileDiagram = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const { step } = useSteps();

  return (
    <Stack {...props} direction="column">
      <Stack direction="row" spacing={{ xs: 2, sm: 3 }} mb="40px">
        <Stack direction="row" flexGrow={1}>
          <TriplePurpleBkgIcon icon={<User />} size={32} />
          <Arrow flexGrow={1} mr={0.5} />
          <ContentContainer
            accentBkg={step === 1}
            style={{
              position: 'relative',
              height: containerHeight,
            }}
          >
            <MvUSDC />
            <Typography {...labelProps}>USDC</Typography>
            <Arrow
              direction="down"
              minHeight={32}
              sx={{
                position: 'absolute',
                right: 36,
                bottom: -arrowHeight - 4,
              }}
            />
          </ContentContainer>
        </Stack>
        <Stack direction="row" flexGrow={1}>
          <ContentContainer
            accentBkg={step === 3}
            style={{
              position: 'relative',
              height: containerHeight,
            }}
          >
            <MvUSDC />
            <Typography {...labelProps}>USDC</Typography>
            <Arrow
              direction="up"
              minHeight={32}
              sx={{
                position: 'absolute',
                right: 36,
                bottom: -arrowHeight - 4,
              }}
            />
          </ContentContainer>
          <Arrow flexGrow={1} mr={0.5} />
          <TriplePurpleBkgIcon icon={<User />} size={32} />
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="center">
        <ContentContainer
          accentBkg={step !== 0}
          style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
        >
          <SimplePurpleBkgIcon icon={<Vault />} />
          <Typography {...labelProps}>
            {intl.formatMessage({ defaultMessage: 'Meta Vault' })}
          </Typography>
        </ContentContainer>
      </Stack>
      <Stack direction="row" justifyContent="space-between" mt={0.5}>
        {underLyingVaults.map((v) => (
          <Stack
            key={`${v.token.label}${v.vault.label}`}
            direction="column"
            alignItems="center"
            spacing={0.5}
          >
            <Stack direction="row">
              <Arrow direction="up" minHeight={arrowHeight} />
              <Arrow direction="down" minHeight={arrowHeight} />
            </Stack>
            <ContentContainer
              accentBkg={step === 2}
              style={{
                width: '100%',
                height: containerHeight,
                justifyContent: 'center',
              }}
            >
              {cloneElement(v.token.icon, { sx: { fontSize: 16 } })}
              <Typography {...labelProps} color="text.secondary">
                {v.token.label}
              </Typography>
            </ContentContainer>
            <Stack direction="row">
              <Arrow direction="up" minHeight={arrowHeight} />
              <Arrow direction="down" minHeight={arrowHeight} />
            </Stack>
            <ContentContainer
              square
              accentBkg={step === 2}
              style={{ width: '100%' }}
            >
              {cloneElement(v.vault.icon, { sx: { fontSize: 16 } })}
              <Typography {...labelProps} color="text.secondary">
                {v.vault.label}
              </Typography>
            </ContentContainer>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
