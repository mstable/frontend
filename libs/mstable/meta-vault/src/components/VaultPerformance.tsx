import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const VaultPerformance = () => {
  const intl = useIntl();

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Vault Performance' })}
      />
      <CardContent>
        <Box
          sx={(theme) => ({
            ...theme.mixins.centered,
            backgroundColor: 'background.highlight',
            height: 400,
          })}
        >
          <Typography fontWeight="bold">🚧 WIP</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
