/* eslint-disable jsx-a11y/accessible-emoji */
import { OpenAccountModalButton } from '@frontend/shared-providers';
import { Stack, Typography } from '@mui/material';

export const WelcomePage = () => {
  return (
    <Stack p={4} alignItems="center">
      <Typography variant="h1" mb={8} textAlign="center">
        👋 Welcome to the eHorizon application!
      </Typography>
      <Stack spacing={4} alignItems="center">
        <Typography>
          Please connect your wallet to start using this application.
        </Typography>
        <OpenAccountModalButton sx={{ maxWidth: 160 }} />
      </Stack>
    </Stack>
  );
};
