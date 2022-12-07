import { useMemo } from 'react';

import {
  MvUSDC,
  SimplePurpleBkgIcon,
  TriplePurpleBkgIcon,
} from '@frontend/shared-icons';
import { Arrow, ContentContainer } from '@frontend/shared-ui';
import { alpha, Stack, styled, Typography, useTheme } from '@mui/material';
import { LayoutGroup, motion } from 'framer-motion';
import { User, Vault } from 'phosphor-react';
import { times } from 'ramda';
import { useIntl } from 'react-intl';

import { underLyingVaults } from '../constants';
import { useSteps } from '../hooks';

import type { StackProps, TypographyProps } from '@mui/material';
import type { Transition, Variants } from 'framer-motion';

export const VBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

export const HBox = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MBox = styled(motion.div)(({ theme }) => ({
  border: `1px solid ${theme.palette.info.main}`,
  paddingX: 1,
  paddingY: 0.5,
  background: `linear-gradient(45deg, ${alpha(
    theme.palette.info.main,
    0.2,
  )} 0%, ${alpha(theme.palette.info.main, 0.1)} 100%)`,
}));

const labelProps: TypographyProps = { variant: 'buttonSmall', noWrap: true };

const SIZES = [
  ['20%', '60%', '20%'],
  ['60%', '20%', '20%'],
  ['20%', '60%', '20%'],
  ['20%', '20%', '60%'],
];

export const AnimatedDiagram = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const { step } = useSteps();

  const currentSizes = useMemo(() => SIZES[step], [step]);

  const widthTransition: Transition = {
    type: 'spring',
    bounce: 0,
    duration: 0.5,
  };

  const widthVariants: Variants = {
    '0': (i) => ({
      width: SIZES[0][i],
      transition: widthTransition,
      opacity: 1,
    }),
    '1': (i) => ({
      width: SIZES[1][i],
      transition: widthTransition,
      opacity: i === 0 ? 1 : 0.5,
    }),
    '2': (i) => ({
      width: SIZES[2][i],
      transition: widthTransition,
      opacity: i === 1 ? 1 : 0.5,
    }),
    '3': (i) => ({
      width: SIZES[3][i],
      transition: widthTransition,
      opacity: i === 2 ? 1 : 0.5,
    }),
  };

  const underlyingVariants: Variants = {
    open: {
      opacity: 1,
      display: 'block',
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.05,
      },
    },
    closed: {
      opacity: 0,
      display: 'none',
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.05,
      },
    },
  };

  const underlyingItemVariants: Variants = {
    open: {
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        type: 'spring',
        bounce: 0,
      },
    },
  };

  const metavaultContainerVariants: Variants = {
    '0': { bottom: 0, borderRadius: '53px' },
    '1': {
      bottom: -180,
      borderRadius: '8px',
    },
    '2': { bottom: 0, borderRadius: '53px' },
    '3': {
      bottom: -180,
      borderRadius: '8px',
    },
  };

  const subArrowsContainerVariants: Variants = {
    open: (i) => ({
      opacity: 1,
      display: 'block',
      width: currentSizes[i],
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.05,
      },
    }),
    closed: {
      opacity: 0,
      width: 0,
      display: 'none',
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const arrowItemVariants: Variants = {
    open: (i) => ({
      opacity: 1 / 1 - 0.4 * i,
      transition: { type: 'spring', bounce: 0 },
    }),
    closed: { opacity: 0, transition: { type: 'spring', bounce: 0 } },
  };

  return (
    <Stack direction="column" alignItems="stretch" {...props}>
      <LayoutGroup>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <HBox
            key="deposit"
            layout
            sx={{
              justifyContent: 'flex-end',
            }}
            initial={false}
            animate={step.toString()}
            variants={widthVariants}
            custom={0}
          >
            <TriplePurpleBkgIcon icon={<User />} size={56} />
            <Arrow flexGrow={1} mr={1} />
            <ContentContainer accentBkg={[0, 1].includes(step)}>
              <MvUSDC />
              <Typography {...labelProps}>USDC</Typography>
            </ContentContainer>
            <Arrow flexGrow={1} />
          </HBox>

          <HBox
            key="metavault"
            layout
            initial={false}
            animate={step.toString()}
            variants={widthVariants}
            custom={1}
            style={{ position: 'relative', height: 34 }}
          >
            <ContentContainer
              layout
              accentBkg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                justifyContent: 'center',
                margin: theme.spacing(0, 1),
              }}
              variants={metavaultContainerVariants}
            >
              <SimplePurpleBkgIcon icon={<Vault />} />
              <Typography {...labelProps}>
                {intl.formatMessage({ defaultMessage: 'Meta Vault' })}
              </Typography>
            </ContentContainer>
          </HBox>

          <HBox
            key="withdraw"
            layout
            sx={{
              justifyContent: 'flex-start',
            }}
            initial={false}
            animate={step.toString()}
            variants={widthVariants}
            custom={2}
          >
            <Arrow flexGrow={1} mr={1} />
            <ContentContainer accentBkg={[0, 3].includes(step)}>
              <MvUSDC />
              <Typography {...labelProps}>USDC</Typography>
            </ContentContainer>
            <Arrow flexGrow={1} mr={1} />
            <TriplePurpleBkgIcon icon={<User />} size={56} />
          </HBox>
        </Stack>
        <Stack direction="column" overflow="hidden">
          <VBox
            key="deposit-user"
            layout
            style={{
              alignSelf: 'flex-start',
            }}
            initial={{ opacity: 0, display: 'none' }}
            animate={step === 1 ? 'open' : 'closed'}
            variants={subArrowsContainerVariants}
            custom={0}
          >
            {times(
              (n) => (
                <HBox key={`row-${n}`} variants={arrowItemVariants} custom={n}>
                  <TriplePurpleBkgIcon icon={<User />} size={56} />
                  <Arrow flexGrow={1} mr={1} />
                  <ContentContainer accentBkg={[0, 1].includes(step)}>
                    <MvUSDC />
                    <Typography {...labelProps}>USDC</Typography>
                  </ContentContainer>
                  <Arrow flexGrow={1} />
                </HBox>
              ),
              3,
            )}
          </VBox>

          <HBox
            key="underlying"
            layout
            initial={false}
            animate={[0, 2].includes(step) ? 'open' : 'closed'}
            variants={underlyingVariants}
            style={{
              alignSelf: 'center',
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={5}
            >
              {underLyingVaults.map((v) => (
                <VBox
                  key={`${v.token.label}${v.vault.label}`}
                  initial={false}
                  variants={underlyingItemVariants}
                  style={{ rowGap: 8, alignItems: 'center' }}
                >
                  <Stack direction="row">
                    <Arrow direction="up" minHeight={50} />
                    <Arrow direction="down" minHeight={50} />
                  </Stack>
                  <ContentContainer
                    accentBkg={[0, 2].includes(step)}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {v.token.icon}
                    <Typography {...labelProps} color="text.secondary">
                      {v.token.label}
                    </Typography>
                  </ContentContainer>
                  <Stack direction="row">
                    <Arrow direction="up" minHeight={50} />
                    <Arrow direction="down" minHeight={50} />
                  </Stack>
                  <ContentContainer
                    square
                    accentBkg={[0, 2].includes(step)}
                    style={{ width: '100%' }}
                  >
                    {v.vault.icon}
                    <Typography {...labelProps} color="text.secondary">
                      {v.vault.label}
                    </Typography>
                  </ContentContainer>
                </VBox>
              ))}
            </Stack>
          </HBox>

          <VBox
            layout
            key="withdraw-users"
            style={{
              alignSelf: 'flex-end',
            }}
            initial={{ opacity: 0, width: 0 }}
            animate={step === 3 ? 'open' : 'closed'}
            variants={subArrowsContainerVariants}
            custom={2}
          >
            {times(
              (n) => (
                <HBox key={`row-${n}`} variants={arrowItemVariants} custom={n}>
                  <Arrow flexGrow={1} mr={1} />
                  <ContentContainer accentBkg={[0, 1].includes(step)}>
                    <MvUSDC />
                    <Typography {...labelProps}>USDC</Typography>
                  </ContentContainer>
                  <Arrow flexGrow={1} mr={1} />
                  <TriplePurpleBkgIcon icon={<User />} size={56} />
                </HBox>
              ),
              3,
            )}
          </VBox>
        </Stack>
      </LayoutGroup>
    </Stack>
  );
};
