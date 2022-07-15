import { TitleCard } from '@frontend/shared-ui';
import { Box, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const VaultPerformance = () => {
  const intl = useIntl();

  return (
    <TitleCard
      title={intl.formatMessage({ defaultMessage: 'Vault Performance' })}
    >
      <Box
        sx={(theme) => ({
          ...theme.mixins.centered,
          backgroundColor: 'background.highlight',
          height: 400,
        })}
      >
        <Typography fontWeight="bold">🚧 WIP</Typography>
      </Box>
    </TitleCard>
  );
};
