import { Footer, WrongNetworkPage } from '@frontend/mstable-shared-ui';
import { MstableBackground } from '@frontend/shared-ui';
import { Box } from '@mui/material';
import { Outlet } from '@tanstack/react-location';
import { useNetwork } from 'wagmi';

export const Main = () => {
  const { chain } = useNetwork();

  return (
    <MstableBackground
      display="flex"
      flexDirection="column"
      height={1}
      width={1}
      sx={(theme) => theme.mixins.paddings.page}
    >
      <Box flexGrow={1}>
        {chain?.unsupported ? <WrongNetworkPage /> : <Outlet />}
      </Box>
      <Footer py={4} />
    </MstableBackground>
  );
};
