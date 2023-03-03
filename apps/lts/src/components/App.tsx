import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { ContractAccordion } from './ContractAccordion';
import { Footer } from './Footer';
import { NetworkSwitch } from './NetworkSwitch';
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
        spacing={4}
        sx={(theme) => ({
          width: 1,
          height: 1,
          minHeight: '80vh',
          py: { xs: 2, md: 5 },
          px: theme.mixins.paddings.page.paddingX,
        })}
      >
        <Stack justifyContent="center" alignItems="center">
          <NetworkSwitch />
        </Stack>
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="h1">
            {intl.formatMessage({
              defaultMessage: 'Long Term Support',
              id: 'n9ca9R',
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
