import {
  Footer,
  GradientBackground,
  WrongNetworkPage,
} from '@frontend/mstable-shared-ui';
import { Box } from '@mui/material';
import { Outlet } from '@tanstack/react-location';
import { useNetwork } from 'wagmi';

export const Main = () => {
  const { chain } = useNetwork();

  return (
    <GradientBackground
      display="flex"
      flexDirection="column"
      height={1}
      width={1}
      sx={{
        paddingY: { xs: 1, sm: 2, md: 2.5 },
        paddingX: { xs: 4, sm: 6, md: 8, lg: 16, xl: 30 },
      }}
    >
      <Box minHeight="80vh">
        {chain?.unsupported ? <WrongNetworkPage /> : <Outlet />}
      </Box>
      <Footer py={4} />
    </GradientBackground>
  );
};
