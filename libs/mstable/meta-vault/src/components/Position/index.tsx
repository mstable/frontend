import { ValueLabel } from '@frontend/shared-ui';
import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { useIntl } from 'react-intl';

import { useMetavault } from '../../state';

export const Position = () => {
  const intl = useIntl();
  const { mvBalance } = useMetavault();

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'My Position' })}
      />
      <CardContent>
        <Stack
          direction="row"
          width={1}
          py={2}
          spacing={2}
          sx={{ overflowX: 'auto', maxWidth: 1 }}
          divider={<Divider orientation="vertical" flexItem variant="inset" />}
        >
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Deposited' })}
            value={`${mvBalance?.format() ?? '0.00'} Shares`}
            subvalue="0%"
            components={{ container: { width: 1 } }}
          />
        </Stack>
      </CardContent>
      <Divider />
    </Card>
  );
};
