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
  useTheme,
} from '@mui/material';
import { useNavigate } from '@tanstack/react-location';
import { GasPump, Vault } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { chainId, useFeeData, useNetwork } from 'wagmi';

import { useTotalTvl } from '../hooks';
import { VaultCard } from './VaultCard';

const gradient = keyframes`  
	from {
		background-position: 0% 50%;
	}
	to {
		background-position: 100% 100%;
	}
`;

const gradientReverse = keyframes`  
	from {
		background-position: 100% 100%;
	}
	to {
    background-position: 0% 50%;		
	}
`;

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
  const totalTvl = useTotalTvl();
  const { currency } = usePrices();

  const handleClick = () => {
    navigate({ to: `./${featuredMv.id}` });
  };

  return (
    <Stack
      onClick={handleClick}
      role="button"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={(theme) => ({
        px: 4,
        py: { xs: 4, md: 8, lg: 15 },
        borderRadius: 2.6,
        backgroundColor: alpha(theme.palette.background.paper, 0.4),
        backdropFilter: 'blur(10px)',
        boxShadow: 1,
        border: `1px solid ${theme.palette.divider}`,
        cursor: 'pointer',
        '.title': {
          fontSize: 64,
          fontWeight: 900,
          lineHeight: '64px',
          pt: { xs: 4, md: 8 },
          background: `linear-gradient(${
            theme.palette.mode === 'light' ? '90' : '270'
          }deg,#D1C6FF 0%, #D1C6FF 2.49%, #6A67CB 68.52%, #6A67CB 100%)`,
          backgroundSize: `200% 200%`,
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: `${gradientReverse} 1s ease forwards`,
        },
        '.subtitle': {
          color:
            theme.palette.mode === 'light'
              ? theme.palette.grey['500']
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
          boxShadow: 2,
          border: `1px solid ${
            theme.palette.mode === 'light'
              ? theme.palette.grey['200']
              : theme.palette.grey['700']
          }`,

          background: `linear-gradient(180deg, ${alpha(
            featuredMv.primaryColor,
            0.12,
          )} 0%, ${alpha(theme.palette.background.default, 0.4)} 100%)`,
          '.title': {
            animation: `${gradient} 0.3s ease forwards`,
          },
          '.subtitle': {
            color: theme.palette.grey['600'],
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
          spacing={3}
        >
          <Typography className="title">
            {intl.formatMessage({
              defaultMessage: 'Discover<br></br>Meta Vaults',
            })}
          </Typography>
          <Typography className="subtitle">
            {intl.formatMessage({
              defaultMessage: 'The easiest way to yield in DeFi.',
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
              {isNaN(totalTvl) ? (
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
                  { value: new BigDecimal(feeData?.gasPrice, 9).format(3) },
                )
              )}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          width={{ xs: 1, md: 1 / 2 }}
          justifyContent="center"
          alignItems="flex-end"
        >
          <VaultCard
            metavault={featuredMv}
            sx={{ width: 400, height: 500 }}
            className="vaultcard"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
