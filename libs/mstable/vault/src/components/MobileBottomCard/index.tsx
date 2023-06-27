import { useState } from 'react';

import { CollapsibleSection, Dialog } from '@frontend/shared-ui';
import { Box, Button, Card } from '@mui/material';
import { useIntl } from 'react-intl';

import { Position } from '../Position';
import { TradingPanel } from '../TradingPanel';

import type { FC } from 'react';

export const MobileBottomCard: FC = () => {
  const intl = useIntl();
  const [isMyPositionOpen, setIsMyPositionOpen] = useState(false);
  const [isTradingOpen, setIsTradingOpen] = useState(false);

  return (
    <>
      <Card sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
        <Box
          m={2}
          pb={1}
          borderBottom={(theme) => `1px solid ${theme.palette.divider}`}
        >
          <CollapsibleSection
            iconPosition="end"
            title={intl.formatMessage({
              defaultMessage: 'My Position',
              id: '0NMLMN',
            })}
            components={{
              title: { sx: { typography: 'body1' } },
            }}
            open={isMyPositionOpen}
            onToggle={() => setIsMyPositionOpen((o) => !o)}
          >
            <Position />
          </CollapsibleSection>
        </Box>
        <Box m={2} mt={3}>
          <Button fullWidth onClick={() => setIsTradingOpen(true)}>
            {intl.formatMessage({
              defaultMessage: 'Deposit/Withdraw',
              id: 'in6iXe',
            })}
          </Button>
        </Box>
      </Card>
      <Dialog
        open={isTradingOpen}
        onClose={() => setIsTradingOpen(false)}
        title={intl.formatMessage({
          defaultMessage: 'Deposit/Withdraw',
          id: 'in6iXe',
        })}
        content={
          <TradingPanel
            elevation={0}
            sx={{
              backgroundColor: 'transparent',
              mt: 2,
              border: 'none',
              boxShadow: 0,
            }}
          />
        }
      />
    </>
  );
};
