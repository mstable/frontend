import { SunsetBanner } from '@frontend/shared-ui';
import { Stack } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';

import { ContractAccordion } from '../components/ContractAccordion';
import { Hero } from '../components/Hero';
import { Welcome } from '../components/Welcome';

export const Withdraw = () => {
  const { isConnected } = useAccount();

  return (
    <>
      <Hero my={4} />
      <SunsetBanner my={4} />
      <Stack>
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
              my={4}
            />
          )}
        </AnimatePresence>
      </Stack>
    </>
  );
};
