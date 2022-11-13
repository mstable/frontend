import { supportedMetavaults } from '@frontend/shared-constants';
import { usePrices } from '@frontend/shared-prices';
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
  const { data: feeData, isLoading: feeLoading } = useFeeData({
    formatUnits: 'gwei',
  });
  const metavaults = supportedMetavaults[chain?.id || chainId.mainnet];
  const featuredMv = metavaults.find((mv) => mv.featured);
  const totalTvl = useTotalTvl();
  const { currency } = usePrices();

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      sx={(theme) => ({
        p: { xs: 2, md: 4, lg: 7.5 },
        borderRadius: 2.6,
        backgroundColor: alpha(theme.palette.background.paper, 0.4),
        backdropFilter: 'blur(10px)',
        boxShadow: 1,
        cursor: 'default',
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
        '&:hover': {
          '.title': {
            animation: `${gradient} 0.3s ease forwards`,
          },
        },
      })}
      spacing={2}
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
        <Typography
          sx={(theme) => ({
            fontSize: 32,
            fontWeight: 800,
            mb: 4,
            color:
              theme.palette.mode === 'light'
                ? theme.palette.grey[500]
                : theme.palette.grey[700],
          })}
        >
          {intl.formatMessage({
            defaultMessage: 'The easiest way to yield in DeFi.',
          })}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={(theme) => ({
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            p: 2,
          })}
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
        alignItems="center"
      >
        <VaultCard
          metavault={featuredMv}
          to={`./${featuredMv.id}`}
          sx={{ width: 400, height: 500 }}
        />
      </Stack>
    </Stack>
  );
};
