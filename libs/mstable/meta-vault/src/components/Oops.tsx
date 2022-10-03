import { MstableBackground } from '@frontend/shared-ui';
import { Stack, Typography } from '@mui/material';

export const Oops = () => {
  return (
    <Stack direction="column" minHeight="80vh">
      <MstableBackground sx={(theme) => theme.mixins.paddings.jumbo}>
        <Typography variant="h1">
          <span role="img" aria-label="oops">
            😓
          </span>
          &nbsp;Oops, nothing here
        </Typography>
      </MstableBackground>
    </Stack>
  );
};
