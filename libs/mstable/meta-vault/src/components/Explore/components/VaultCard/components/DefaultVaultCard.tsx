import {
  HoverablePrimaryCard,
  MVIcon,
  ProtocolIcon,
  ValueLabel,
} from '@frontend/shared-ui';
import {
  Avatar,
  AvatarGroup,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import { LineChart } from '../../LineChart';
import { useVaultCardProps } from '../hooks';

import type { VaultCardProps } from '../types';

export const DefaultVaultCard = (props: VaultCardProps) => {
  const {
    intl,
    isLoading,
    chartData,
    assetLoading,
    handleClick,
    tagProps,
    sharePriceLabel,
    sharePriceHint,
    sharePrice,
    roiLabel,
    roiHint,
    roi,
    tvlLabel,
    tvlHint,
    tvl,
  } = useVaultCardProps(props);
  const { metavault, to, onClick, ...rest } = props;

  return (
    <HoverablePrimaryCard
      primaryColor={metavault.primaryColor}
      {...rest}
      onClick={handleClick}
      sx={{ cursor: onClick || to ? 'pointer' : 'inherit', ...rest?.sx }}
      role={onClick || to ? 'button' : 'presentation'}
      p={3}
    >
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <MVIcon
          address={metavault.address}
          sx={{ height: 53, width: 53, mb: 2, ml: '-6px' }}
        />
        <ValueLabel
          label={sharePriceLabel}
          hint={sharePriceHint}
          components={{
            label: { sx: { mb: 0.5 } },
            container: { alignItems: 'flex-end' },
          }}
        >
          <Typography variant="value2">
            {isLoading ? <Skeleton width={75} /> : sharePrice}
          </Typography>
        </ValueLabel>
      </Stack>
      {isLoading ? (
        <Skeleton width={350} height={175} variant="rounded" />
      ) : (
        <LineChart id={metavault.id} {...chartData} />
      )}
      <Typography variant="h4" mt={5}>
        {metavault.name}
      </Typography>
      <Stack
        direction="row"
        mb={4}
        flexWrap="wrap"
        columnGap={1}
        rowGap={2}
        mt={2}
      >
        {metavault.tags.map((tag, idx) => (
          <Typography key={`tag-${idx}`} {...tagProps}>
            {intl.formatMessage(tag)}
          </Typography>
        ))}
      </Stack>
      <Stack
        direction="row"
        sx={(theme) => ({
          border: `1px solid ${theme.palette.divider}`,
          justifyContent: 'space-between',
          borderRadius: 1,
          padding: 1,
        })}
      >
        <ValueLabel
          label={roiLabel}
          hint={roiHint}
          components={{
            valueContainer: { pb: 0.3 },
            label: { sx: { mb: 0.5 } },
          }}
        >
          <Typography variant="value3">
            {assetLoading ? <Skeleton width={50} /> : roi}
          </Typography>
        </ValueLabel>
        <ValueLabel
          label={tvlLabel}
          hint={tvlHint}
          components={{
            label: { sx: { mb: 0.5 } },
          }}
        >
          <Stack direction="row" spacing={1} alignItems="baseline">
            <Typography variant="value3">
              {assetLoading ? <Skeleton width={50} /> : tvl}
            </Typography>
          </Stack>
        </ValueLabel>
        <ValueLabel
          label={intl.formatMessage({ defaultMessage: 'Protocols' })}
          components={{
            valueContainer: { pb: 0.3 },
            label: { sx: { mb: 0.5 } },
          }}
        >
          <AvatarGroup max={6}>
            {metavault.strategies.map((strat) => (
              <Avatar key={strat.protocol.id}>
                <ProtocolIcon
                  name={strat.protocol.id}
                  sx={{ height: 18, width: 18 }}
                />
              </Avatar>
            ))}
          </AvatarGroup>
        </ValueLabel>
      </Stack>
    </HoverablePrimaryCard>
  );
};
