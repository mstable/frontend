import { CollapsibleSection, ValueLabel } from '@frontend/shared-ui';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
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
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Av. APY' })}
            value="47.55%"
            subvalue="+2.54%"
            components={{
              container: { width: 1 },
              subvalue: { color: 'success.main' },
            }}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Yields' })}
            value="$10.4"
            subvalue="-0.2%"
            components={{
              container: { width: 1 },
              subvalue: { color: 'error.main' },
            }}
          />
        </Stack>
      </CardContent>
      <Divider />
      <CollapsibleSection
        iconPosition="end"
        title={intl.formatMessage({ defaultMessage: 'History' })}
        components={{
          container: { p: 2 },
          titleTypography: { variant: 'body2', fontWeight: 'bold' },
        }}
      >
        <Box
          sx={(theme) => ({
            ...theme.mixins.centered,
            height: 60,
          })}
        >
          <Typography fontWeight="bold">🚧 WIP</Typography>
        </Box>
      </CollapsibleSection>
    </Card>
  );
};