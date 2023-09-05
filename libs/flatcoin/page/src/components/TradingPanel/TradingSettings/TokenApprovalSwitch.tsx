import { FormControlLabel, Switch, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useFlatcoinTradingState, useUpdateTradingAllowance } from '../state';

export const TokenApprovalSwitch = () => {
  const intl = useIntl();
  const { isInfiniteAllowance } = useFlatcoinTradingState();
  const updateAllowance = useUpdateTradingAllowance();

  return (
    <FormControlLabel
      value={isInfiniteAllowance}
      control={
        <Switch
          checked={isInfiniteAllowance}
          onChange={(e) => {
            updateAllowance(e.target.checked);
          }}
        />
      }
      label={
        <Typography variant="label2" flexGrow={1}>
          {intl.formatMessage({
            defaultMessage: 'Set As Infinite',
            id: 'Gtmi1D',
          })}
        </Typography>
      }
      labelPlacement="start"
      disableTypography
      sx={{ width: 1, marginTop: '0px!important' }}
    />
  );
};
