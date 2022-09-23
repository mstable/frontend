import React from 'react';

import { InfoTooltip } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { constants } from 'ethers';
import { Receipt } from 'phosphor-react';
import { useIntl } from 'react-intl';

import { useMetavault } from '../../state';

import type { TypographyProps } from '@mui/material';

const ValueRow: React.FC<{
  title: string;
  tooltip: string;
  value: string;
  valueProps?: TypographyProps;
  subValue: string;
}> = ({ title, tooltip, value, valueProps = {}, subValue }) => {
  return (
    <Box
      mb={3}
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box display="flex" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <InfoTooltip sx={{ ml: 1 }} label={tooltip} color="text.secondary" />
      </Box>
      <Box textAlign="right">
        <Typography variant="body2" {...valueProps}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subValue}
        </Typography>
      </Box>
    </Box>
  );
};

export const Position = () => {
  const intl = useIntl();
  const { mvBalance, assetsPerShare, assetToken, mvDeposited } = useMetavault();
  const mvBalanceInAsset = new BigDecimal(
    mvBalance?.exact.mul(assetsPerShare?.exact || constants.Zero) ||
      constants.Zero,
  );
  const profitOrLoss =
    mvBalanceInAsset?.sub(mvDeposited || BigDecimal.ZERO) || BigDecimal.ZERO;
  const roi =
    mvBalanceInAsset.exact.eq(constants.Zero) || !mvDeposited
      ? BigDecimal.ZERO
      : new BigDecimal(profitOrLoss.divPrecisely(mvDeposited).exact.mul(100));

  return (
    <Card>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        pb={1}
      >
        <Typography variant="h5">
          {intl.formatMessage({ defaultMessage: 'My Position' })}
        </Typography>
        <Button
          size="small"
          variant="text"
          startIcon={<Receipt weight="fill" size={12} />}
        >
          {intl.formatMessage({ defaultMessage: 'History' })}
        </Button>
      </Box>
      <CardContent>
        <ValueRow
          title={intl.formatMessage({ defaultMessage: 'Position Value' })}
          tooltip={'tooltip'}
          value={`${mvBalanceInAsset.format() ?? '0.00'} ${
            assetToken?.symbol || ''
          }`}
          subValue={`${mvBalance?.format() ?? '0.00'} Shares`}
        />
        <ValueRow
          title={intl.formatMessage({ defaultMessage: 'Profit/Loss' })}
          tooltip={'tooltip'}
          value={`${profitOrLoss.format() ?? '0.00'} ${
            assetToken?.symbol || ''
          }`}
          valueProps={{
            color: (theme) => theme.palette.success.main,
          }}
          subValue={intl.formatMessage(
            { defaultMessage: '{roi}% ROI' },
            {
              roi: roi.format() ?? '0.00',
            },
          )}
        />
        <Button sx={{ width: '100%' }} color="secondary" size="large">
          {intl.formatMessage({ defaultMessage: 'Yield Calculator' })}
        </Button>
      </CardContent>
      <Divider />
    </Card>
  );
};
