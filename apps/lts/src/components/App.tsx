import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { ContractAccordion } from './ContractAccordion';
import { Footer } from './Footer';
import { Topnav } from './Topnav';

export const App = () => {
  const intl = useIntl();

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
          minHeight: '80vh',
          pb: { xs: 2, md: 4 },
          px: theme.mixins.paddings.page.paddingX,
        })}
      >
        <Stack justifyContent="center" alignItems="center" minHeight="25vh">
          <Typography variant="h1">
            {intl.formatMessage({
              defaultMessage: 'mStable Withdraw',
              id: '/b/fRE',
            })}
          </Typography>
        </Stack>
        <ContractAccordion width={1} />
      </Stack>
      <Footer
        sx={(theme) => ({ py: 4, px: theme.mixins.paddings.page.paddingX })}
      />
    </Stack>
  );
};
