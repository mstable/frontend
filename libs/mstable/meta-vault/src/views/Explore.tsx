import { supportedMetavaults } from '@frontend/shared-constants';
import { MstableBackground, RouterLink } from '@frontend/shared-ui';
import { Link, Stack, Typography } from '@mui/material';
import { chainId, useNetwork } from 'wagmi';

export const Explore = () => {
  const { chain } = useNetwork();

  return (
    <Stack direction="column" minHeight="80vh">
      <MstableBackground sx={(theme) => theme.mixins.paddings.jumbo}>
        <Typography variant="h1">Metavaults</Typography>
      </MstableBackground>
      <Stack
        sx={(theme) => theme.mixins.paddings.jumbo}
        spacing={2}
        height="50vh"
      >
        {Object.entries(supportedMetavaults[chain?.id ?? chainId.mainnet]).map(
          ([key, val]) => (
            <Link key={key} component={RouterLink} to={`./${key}`}>
              {val.name}
            </Link>
          ),
        )}
      </Stack>
    </Stack>
  );
};
