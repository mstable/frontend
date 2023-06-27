import { useTokenAllowanceHandler } from '@dhedge/core-ui-kit/hooks/trading/allowance';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const TokenAllowanceSwitch = () => {
  const intl = useIntl();
  const [isInfiniteAllowance, onChange] = useTokenAllowanceHandler();

  return (
    <FormControlLabel
      value={isInfiniteAllowance}
      control={
        <Switch
          checked={isInfiniteAllowance}
          onChange={(e) => {
            onChange(e.target.checked);
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
