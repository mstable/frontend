import { Box, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const Withdraw = () => {
  const intl = useIntl();
  return (
    <Box
      sx={(theme) => ({
        ...theme.mixins.centered,
        backgroundColor: 'background.highlight',
        height: 400,
      })}
    >
      <Typography fontWeight="bold">🚧 WIP</Typography>
    </Box>
  );
};
