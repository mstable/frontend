import React from 'react';

import { History as HistoryIcon } from '@frontend/shared-icons';
import { InfoTooltip } from '@frontend/shared-ui';
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
  const { mvBalance, assetBalance, assetToken } = useMetavault();

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
          value={`${assetBalance?.format() ?? '0.00'} ${assetToken?.symbol}`}
          subValue={`${mvBalance?.format() ?? '0.00'} Shares`}
        />
        <ValueRow
          title={intl.formatMessage({ defaultMessage: 'Profit/Loss' })}
          tooltip={'tooltip'}
          // TODO
          value={`${assetBalance?.format() ?? '0.00'} ${assetToken?.symbol}`}
          valueProps={{
            color: theme.palette.success.main,
          }}
          subValue={`7.55% ROI`}
        />
        <Button sx={{ width: '100%' }} color="secondary" size="large">
          {intl.formatMessage({ defaultMessage: 'Yield Calculator' })}
        </Button>
      </CardContent>
      <Divider />
    </Card>
  );
};
