import { useEffect, useState } from 'react';

import { CollapsibleSection, Dialog } from '@frontend/shared-ui';
import { Box, Button, Card, Portal, Stack } from '@mui/material';
import { useSearch } from '@tanstack/react-location';
import { Receipt } from 'phosphor-react';
import { useIntl } from 'react-intl';

import { Operations } from '../Operations';
import { PositionContent } from '../Position';
import { HistoryDialog } from '../Position/components/HistoryDialog';
import { YieldCalculatorDialog } from '../Position/components/YieldCalculatorDialog';

import type { MvGenerics } from '../../types';

export const MobileBottomCard = () => {
  const intl = useIntl();
  const { input } = useSearch<MvGenerics>();
  const [isMyPositionOpen, setIsMyPositionOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [isYieldCalculatorOpen, setIsYieldCalculatorOpen] = useState(false);
  const [isOperationOpen, setIsOperationOpen] = useState(false);

  useEffect(() => {
    if (input) {
      setIsOperationOpen(true);
    }
  }, [input]);

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
            title={intl.formatMessage({ defaultMessage: 'My Position' })}
            components={{
              title: { sx: { typography: 'body1' } },
            }}
            open={isMyPositionOpen}
            onToggle={() => setIsMyPositionOpen((o) => !o)}
          >
            <PositionContent />
            <Stack direction="row" spacing={2} mb={1}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                startIcon={<Receipt weight="fill" size={14} />}
                onClick={() => setIsHistoryDialogOpen(true)}
              >
                {intl.formatMessage({ defaultMessage: 'History' })}
              </Button>
              <Button
                fullWidth
                color="secondary"
                onClick={() => setIsYieldCalculatorOpen(true)}
              >
                {intl.formatMessage({ defaultMessage: 'Yield Calculator' })}
              </Button>
            </Stack>
          </CollapsibleSection>
        </Box>
        <Box m={2} mt={3}>
          <Button fullWidth onClick={() => setIsOperationOpen(true)}>
            {intl.formatMessage({ defaultMessage: 'Deposit/Withdraw' })}
          </Button>
        </Box>
      </Card>
      <YieldCalculatorDialog
        open={isYieldCalculatorOpen}
        onClose={() => setIsYieldCalculatorOpen(false)}
      />
      <HistoryDialog
        open={isHistoryDialogOpen}
        onClose={() => setIsHistoryDialogOpen(false)}
      />
      <Dialog
        open={isOperationOpen}
        onClose={() => setIsOperationOpen(false)}
        title={intl.formatMessage({ defaultMessage: 'Deposit/Withdraw' })}
        content={<Operations />}
      />
      <Portal>
        <Box height={150} />
      </Portal>
    </>
  );
};
