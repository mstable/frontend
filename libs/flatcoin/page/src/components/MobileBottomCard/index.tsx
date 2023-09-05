import { useState } from 'react';

import { CollapsibleSection, Dialog } from '@frontend/shared-ui';
import { Box, Button, Card } from '@mui/material';
import { useIntl } from 'react-intl';

import { useFlatcoin } from '../../state';
import { LeveragePositionsTable } from '../Positions/Leverage/LeveragePositionsTable';
import { StablePosition } from '../Positions/Stable';
import { TradingPanel } from '../TradingPanel';

import type { FC } from 'react';

export const MobileBottomCard: FC = () => {
  const intl = useIntl();
  const { leveragedPositions } = useFlatcoin();
  const [isMyPositionOpen, setIsMyPositionOpen] = useState(false);
  const [isLeveragedPositionsOpen, setIsLeveragedPositionsOpen] =
    useState(false);
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
            <StablePosition />
          </CollapsibleSection>
        </Box>
        {!!leveragedPositions.length && (
          <Box
            m={2}
            pb={1}
            borderBottom={(theme) => `1px solid ${theme.palette.divider}`}
          >
            <CollapsibleSection
              iconPosition="end"
              title={intl.formatMessage({
                defaultMessage: 'Leveraged Positions',
                id: 'AlCWDq',
              })}
              components={{
                title: { sx: { typography: 'body1' } },
              }}
              open={isLeveragedPositionsOpen}
              onToggle={() => setIsLeveragedPositionsOpen((o) => !o)}
            >
              <LeveragePositionsTable />
            </CollapsibleSection>
          </Box>
        )}
        <Box m={2} mt={3}>
          <Button fullWidth onClick={() => setIsTradingOpen(true)}>
            {intl.formatMessage({
              defaultMessage: 'Trading',
              id: 'NpWjvV',
            })}
          </Button>
        </Box>
      </Card>
      <Dialog
        open={isTradingOpen}
        onClose={() => setIsTradingOpen(false)}
        title={intl.formatMessage({
          defaultMessage: 'Trading',
          id: 'NpWjvV',
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
