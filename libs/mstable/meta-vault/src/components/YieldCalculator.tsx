import { CollapsibleSection, TokenInput } from '@frontend/shared-ui';
import {
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

const splitRow: StackProps = {
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'baseline',
};

export const YieldCalculator = () => {
  const intl = useIntl();

  return (
    <Card>
      <CollapsibleSection
        title={intl.formatMessage({ defaultMessage: 'Yield Calculator' })}
        iconPosition="end"
        components={{
          titleContainer: { py: 3, px: 2 },
          titleTypography: { sx: (theme) => theme.typography.h4 },
          childrenContainer: { sx: { px: 2 } },
        }}
      >
        <Stack direction="column">
          <Stack direction="row">
            <TokenInput
              value={200}
              hidePercentage
              symbol="USDC"
              label={intl.formatMessage({ defaultMessage: 'Enter Amount' })}
              components={{ container: { sx: { width: 1 } } }}
            />
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <TextField
              value={10}
              variant="standard"
              placeholder="0.00"
              label={intl.formatMessage({
                defaultMessage: 'Interest Rate (%)',
              })}
              InputProps={{
                type: 'number',
                disableUnderline: true,
                sx: (theme) => theme.typography.value1,
              }}
              sx={{ width: 1 }}
            />
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Typography variant="buttonLarge" sx={{ mt: 1, mb: 3 }}>
            {intl.formatMessage({ defaultMessage: 'Return Projection' })}
          </Typography>
          <Stack {...splitRow} mb={2}>
            <Typography variant="body2">
              {intl.formatMessage({ defaultMessage: 'Accrued Interest' })}
            </Typography>
            <Typography variant="value3">250 USDC</Typography>
          </Stack>
          <Stack {...splitRow} mb={1}>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    p: 0,
                    alignSelf: 'center',
                    '& .MuiSvgIcon-root': {
                      fontSize: 20,
                    },
                  }}
                />
              }
              label={intl.formatMessage({ defaultMessage: 'Include Gas Fees' })}
              sx={{ ml: '-3px', alignItems: 'baseline' }}
              componentsProps={{ typography: { variant: 'body2' } }}
            />
            <Typography variant="value3">-$40.23</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Stack {...splitRow} my={1}>
            <Typography variant="h4">
              {intl.formatMessage({ defaultMessage: 'Total' })}
            </Typography>
            <Typography variant="value3">250 USDC</Typography>
          </Stack>
        </Stack>
      </CollapsibleSection>
    </Card>
  );
};
