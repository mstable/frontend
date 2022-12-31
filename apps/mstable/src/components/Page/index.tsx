import { Box } from '@mui/material';
import { useNetwork } from 'wagmi';

import { GradientBackground } from '../Backgrounds';
import { WrongNetworkPage } from '../Errors';
import { Footer } from '../Footer';

import type { Children } from '@frontend/shared-utils';

export const Page = ({ children }: Children) => {
  const { chain } = useNetwork();

  return (
    <GradientBackground
      display="flex"
      flexDirection="column"
      height={1}
      width={1}
      sx={{
        paddingY: { xs: 1, sm: 2, md: 2.5 },
        paddingX: { xs: 2, sm: 4, md: 8, lg: 16, xl: 30 },
      }}
    >
      <Box minHeight="80vh">
        {chain?.unsupported ? <WrongNetworkPage /> : children}
      </Box>
      <Footer py={4} />
    </GradientBackground>
  );
};
