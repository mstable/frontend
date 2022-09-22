import React from 'react';

import { History as HistoryIcon } from '@frontend/shared-icons';
import { InfoTooltip } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import {
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
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
  const theme = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing(3),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" color="GrayText">
          {title}
        </Typography>
        <InfoTooltip sx={{ ml: 1 }} label={tooltip} color="GrayText" />
      </div>
      <div style={{ textAlign: 'right' }}>
        <Typography variant="body2" {...valueProps}>
          {value}
        </Typography>
        <Typography variant="body2" color="GrayText">
          {subValue}
        </Typography>
      </div>
    </div>
  );
};

export const Position = () => {
  const theme = useTheme();
  const intl = useIntl();
  const { mvBalance, assetsPerShare, assetToken, mvDeposited } = useMetavault();
  const mvBalanceInAsset =
    mvBalance?.mulTruncate(assetsPerShare?.exact || '0') || BigDecimal.ZERO;
  const profitOrLoss =
    mvBalanceInAsset?.sub(mvDeposited || BigDecimal.ZERO) || BigDecimal.ZERO;
  const roi = mvBalanceInAsset.exact.eq(0)
    ? BigDecimal.ZERO
    : profitOrLoss.divPrecisely(mvBalanceInAsset).mulTruncate(100);

  return (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: theme.spacing(2),
          paddingBottom: theme.spacing(1),
        }}
      >
        <Typography variant="h5">
          {intl.formatMessage({ defaultMessage: 'My Position' })}
        </Typography>
        <Button
          sx={{
            '& .MuiButton-startIcon>*:nth-of-type(1)': {
              fontSize: 12,
            },
          }}
          size="small"
          variant="text"
          startIcon={<HistoryIcon />}
        >
          {intl.formatMessage({ defaultMessage: 'History' })}
        </Button>
      </div>
      <CardContent>
        <ValueRow
          title={intl.formatMessage({ defaultMessage: 'Position Value' })}
          tooltip={'tooltip'}
          value={`${mvBalanceInAsset.format() ?? '0.00'} ${assetToken?.symbol}`}
          subValue={`${mvBalance?.format() ?? '0.00'} Shares`}
        />
        <ValueRow
          title={intl.formatMessage({ defaultMessage: 'Profit/Loss' })}
          tooltip={'tooltip'}
          value={`${profitOrLoss.format() ?? '0.00'} ${assetToken?.symbol}`}
          valueProps={{
            color: theme.palette.success.main,
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
