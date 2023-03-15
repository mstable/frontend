import { Stack } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';

import { ContractAccordion } from './components/ContractAccordion';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Topnav } from './components/Topnav';
import { Welcome } from './components/Welcome';

export const App = () => {
  const { isConnected } = useAccount();

  return (
    <Stack
      direction="column"
      sx={{
        width: 1,
        height: 1,
      }}
    >
      <Topnav />
      <Stack
        direction="column"
        sx={(theme) => ({
          width: 1,
          height: 1,
          pb: { xs: 2, md: 4 },
          px: theme.mixins.paddings.page.paddingX,
        })}
      >
        <Hero minHeight="25vh" />
        <Stack
          sx={{
            minHeight: '50vh',
          }}
        >
          <AnimatePresence>
            {isConnected ? (
              <ContractAccordion
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            ) : (
              <Welcome
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </Stack>
      </Stack>
      <Footer
        sx={(theme) => ({ py: 4, px: theme.mixins.paddings.page.paddingX })}
      />
    </Stack>
  );
};
