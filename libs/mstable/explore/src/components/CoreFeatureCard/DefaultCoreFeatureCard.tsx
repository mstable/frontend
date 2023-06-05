import { hoverPrimarySx } from '@frontend/shared-ui';
import { alpha, keyframes, Stack, Typography, useTheme } from '@mui/material';
import { useIntl } from 'react-intl';

import { CoreVaultCard } from '../CoreVaultCard';

import type { PaletteMode } from '@mui/material';
import type { FC } from 'react';

import type { CoreFeatureCardProps } from './types';

const gradient = keyframes`
	to {
		background-position: 300%;
	}
`;

const colorGradient = (mode: PaletteMode) =>
  mode === 'light'
    ? `linear-gradient(90deg, #9D95FF 12.5%, #FAC371 37.5%, #55D5FF 62.5%, #FB88D7 87.5%, #9D95FF 100%)`
    : `linear-gradient(90deg, #9D95FF 12.5%, #FAC371 37.5%, #55D5FF 62.5%, #FB88D7 87.5%, #9D95FF 100%)`;

export const DefaultCoreFeatureCard: FC<CoreFeatureCardProps> = ({
  onClick,
  config,
}) => {
  const intl = useIntl();
  const theme = useTheme();

  return (
    <Stack
      onClick={onClick}
      role="button"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={(theme) => ({
        px: 4,
        py: { md: 8, lg: 15 },
        borderRadius: 2.6,
        width: '100%',
        background:
          theme.palette.mode === 'light'
            ? `linear-gradient(107.33deg, ${alpha(
                theme.palette.background.default,
                0.2,
              )} 0%, #F8FAFF 100%)`
            : `linear-gradient(106.57deg, ${alpha(
                theme.palette.background.default,
                0.2,
              )} 0%, #0A102C 100%)`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.divider}`,
        cursor: 'pointer',
        '.title': {
          fontSize: 64,
          fontWeight: 900,
          lineHeight: '64px',
          background: colorGradient(theme.palette.mode),
          backgroundSize: `300%`,
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        '.subtitle': {
          color:
            theme.palette.mode === 'light'
              ? theme.palette.grey['400']
              : theme.palette.grey['700'],
          fontSize: 32,
          fontWeight: 800,
          mb: 4,
        },
        '.panel': {
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          p: 2,
        },
        '&:hover': {
          boxShadow: 1,
          border: `1px solid ${
            theme.palette.mode === 'light'
              ? theme.palette.grey['200']
              : theme.palette.grey['700']
          }`,
          background:
            theme.palette.mode === 'light'
              ? `linear-gradient(106.79deg, rgba(234, 235, 255, 0.08) 3.2%, rgba(248, 250, 255, 0.4) 97.33%)`
              : ` linear-gradient(106.33deg, rgba(44, 48, 78, 0.08) 5.27%, rgba(10, 16, 44, 0.4) 99.37%)`,
          '.title': {
            animation: `${gradient} 10s linear infinite`,
          },
          '.panel': {
            border: `1px solid ${
              theme.palette.mode === 'light'
                ? theme.palette.grey['200']
                : theme.palette.grey['700']
            }`,
          },
          '.vaultcard': hoverPrimarySx(theme, config.primaryColor),
        },
      })}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 2, sm: 4, md: 8, lg: 15 }}
      >
        <Stack
          direction="column"
          width={{ xs: 1, md: 1 / 2 }}
          alignItems="flex-start"
        >
          <Typography
            sx={{
              fontSize: 64,
              fontWeight: 900,
              lineHeight: '64px',
              color: theme.palette.mode === 'light' ? 'grey.600' : 'grey.500',
              pt: { xs: 4, md: 8 },
              pb: 1,
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Explore', id: '7JlauX' })}
          </Typography>
          <Typography className="title" mb={3}>
            {intl.formatMessage({
              defaultMessage: 'Vaults',
              id: 's2zphO',
            })}
          </Typography>
          <Typography
            color={
              theme.palette.mode === 'light'
                ? theme.palette.grey['400']
                : theme.palette.grey['700']
            }
            fontSize={32}
            fontWeight={800}
            mb={4}
          >
            {intl.formatMessage({
              defaultMessage: 'Earn diversified yield across DeFi.',
              id: 'P1xtEU',
            })}
          </Typography>
        </Stack>
        <Stack width={1 / 2} alignItems="flex-end">
          <CoreVaultCard
            config={config}
            to={`/vault/${config.address}`}
            className="vaultcard"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
