import { supportedMetavaults } from '@frontend/shared-constants';
import { usePrices } from '@frontend/shared-prices';
import { hoverPrimarySx } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  alpha,
  Divider,
  keyframes,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-location';
import { GasPump, Vault } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { chainId, useFeeData, useNetwork } from 'wagmi';

import { useTotalTvl } from '../hooks';
import { VaultCard } from './VaultCard';

import type { PaletteMode } from '@mui/material';

const gradient = keyframes`  
	to {
		background-position: 300%;
	}
`;

const colorGradient = (mode: PaletteMode) =>
  mode === 'light'
    ? `linear-gradient(90deg, #9D95FF 12.5%, #FAC371 37.5%, #55D5FF 62.5%, #FB88D7 87.5%, #9D95FF 100%)`
    : `linear-gradient(90deg, #9D95FF 12.5%, #FAC371 37.5%, #55D5FF 62.5%, #FB88D7 87.5%, #9D95FF 100%)`;

export const FeatureCard = () => {
  const intl = useIntl();
  const theme = useTheme();
  const { chain } = useNetwork();
  const navigate = useNavigate();
  const { data: feeData, isLoading: feeLoading } = useFeeData({
    formatUnits: 'gwei',
  });
  const metavaults = supportedMetavaults[chain?.id || chainId.mainnet];
  const featuredMv = metavaults.find((mv) => mv.featured);
  const { data: totalTvl, isLoading: totalTvlLoading } = useTotalTvl();
  const { currency } = usePrices();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleClick = () => {
    navigate({ to: `./${featuredMv.id}` });
  };

  return isMobile ? (
    <Stack
      onClick={handleClick}
      role="button"
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={(theme) => ({
        px: 2,
        pt: 4,
        pb: 2,
        borderRadius: 2.6,
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
          fontSize: 28,
          fontWeight: 900,
          lineHeight: '35px',
          background: colorGradient(theme.palette.mode),
          backgroundSize: `300%`,
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: `${gradient} 10s linear infinite`,
        },
        '.subtitle': {
          color:
            theme.palette.mode === 'light'
              ? theme.palette.grey['400']
              : theme.palette.grey['700'],
          fontSize: 18,
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
          '.panel': {
            border: `1px solid ${
              theme.palette.mode === 'light'
                ? theme.palette.grey['200']
                : theme.palette.grey['700']
            }`,
          },
          '.vaultcard': hoverPrimarySx(theme, featuredMv.primaryColor),
        },
      })}
    >
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 900,
          lineHeight: '35px',
          color: theme.palette.mode === 'light' ? 'grey.600' : 'grey.500',
          pb: 1,
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Explore' })}
      </Typography>
      <Typography className="title" mb={3}>
        {intl.formatMessage({
          defaultMessage: 'Meta Vaults',
        })}
      </Typography>
      <Typography className="subtitle" mb={3}>
        {intl.formatMessage({
          defaultMessage: 'Earn diversified yield across DeFi.',
        })}
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        className="panel"
        mb={3}
      >
        <Vault weight="fill" color={theme.palette.icons.color} />
        <Typography variant="value5" pr={3}>
          {totalTvlLoading ? (
            <Skeleton width={60} height={14} />
          ) : (
            intl.formatNumber(totalTvl, {
              style: 'currency',
              currency,
              notation: 'compact',
            })
          )}
        </Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <GasPump weight="fill" color={theme.palette.icons.color} />
        <Typography variant="value5">
          {feeLoading ? (
            <Skeleton width={75} />
          ) : (
            intl.formatMessage(
              { defaultMessage: '{value} GWEI' },
              { value: new BigDecimal(feeData?.gasPrice, 9).simpleRounded },
            )
          )}
        </Typography>
      </Stack>
      <VaultCard metavault={featuredMv} className="vaultcard" featured />
    </Stack>
  ) : (
    <Stack
      onClick={handleClick}
      role="button"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={(theme) => ({
        px: 4,
        py: { md: 8, lg: 15 },
        borderRadius: 2.6,
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
          '.vaultcard': hoverPrimarySx(theme, featuredMv.primaryColor),
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
            {intl.formatMessage({ defaultMessage: 'Explore' })}
          </Typography>
          <Typography className="title" mb={3}>
            {intl.formatMessage({
              defaultMessage: 'Meta Vaults',
            })}
          </Typography>
          <Typography className="subtitle" mb={3}>
            {intl.formatMessage({
              defaultMessage: 'Earn diversified yield across DeFi.',
            })}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            className="panel"
          >
            <Vault weight="fill" color={theme.palette.icons.color} />
            <Typography variant="value5" pr={3}>
              {totalTvlLoading ? (
                <Skeleton width={60} height={14} />
              ) : (
                intl.formatNumber(totalTvl, {
                  style: 'currency',
                  currency,
                  notation: 'compact',
                })
              )}
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <GasPump weight="fill" color={theme.palette.icons.color} />
            <Typography variant="value5">
              {feeLoading ? (
                <Skeleton width={75} />
              ) : (
                intl.formatMessage(
                  { defaultMessage: '{value} GWEI' },
                  { value: new BigDecimal(feeData?.gasPrice, 9).simpleRounded },
                )
              )}
            </Typography>
          </Stack>
        </Stack>
        <Stack width={1 / 2} justifyContent="center" alignItems="flex-end">
          <VaultCard metavault={featuredMv} className="vaultcard" />
        </Stack>
      </Stack>
    </Stack>
  );
};
