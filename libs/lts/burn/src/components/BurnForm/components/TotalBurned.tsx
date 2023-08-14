import { Skeleton, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { mtaTokenMainnet } from '../../../constants';
import { useTrackedState } from '../state';

export const TotalBurned = () => {
  const { totalBurned } = useTrackedState();
  const intl = useIntl();

  return (
    <Stack pb={4} alignItems="center" spacing={1}>
      <Typography variant="h4">
        {intl.formatMessage({
          defaultMessage: 'Total Burned',
          id: 'wAUtNd',
        })}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        {!totalBurned ? (
          <Skeleton width={75} height={35} />
        ) : (
          <Typography variant="value2" color="text.secondary">
            {Intl.NumberFormat('en-US', {
              style: 'decimal',
              maximumFractionDigits: 0,
            }).format(totalBurned)}
          </Typography>
        )}
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <mtaTokenMainnet.icon />
          <Typography variant="value2" color="text.secondary">
            {intl.formatMessage({
              defaultMessage: 'MTA',
              id: 'ENufDd',
            })}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
