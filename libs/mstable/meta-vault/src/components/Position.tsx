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

export const Position = () => {
  const intl = useIntl();

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'My Position' })}
      />
      <CardContent>
        <Stack
          direction="row"
          width={1}
          justifyContent="space-between"
          py={2}
          spacing={2}
          sx={{ overflowX: 'auto', maxWidth: 1 }}
        >
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Deposited' })}
            value="11k"
            subvalue="0%"
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Av. APY' })}
            value="47.55%"
            subvalue="+2.54%"
            components={{ subvalue: { color: 'success.main' } }}
          />
          <ValueLabel
            label={intl.formatMessage({ defaultMessage: 'Yields' })}
            value="$10.4"
            subvalue="-0.2%"
            components={{ subvalue: { color: 'error.main' } }}
          />
        </Stack>
      </CardContent>
      <Divider />
      <CardContent>
        <CollapsibleSection
          iconPosition="end"
          title={intl.formatMessage({ defaultMessage: 'History' })}
          components={{
            titleLabel: { variant: 'body2' },
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
      </CardContent>
    </Card>
  );
};
