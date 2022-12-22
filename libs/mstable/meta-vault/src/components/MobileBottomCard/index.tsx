import { useEffect, useState } from 'react';

import { CollapsibleSection, Dialog } from '@frontend/shared-ui';
import { Box, Button, Card, Stack } from '@mui/material';
import { useSearch } from '@tanstack/react-location';
import { Receipt } from 'phosphor-react';
import { useIntl } from 'react-intl';

import { Operations } from '../Operations';
import { PositionContent } from '../Position';
import { HistoryDialog } from '../Position/components/HistoryDialog';

import type { MvGenerics } from '../../types';

export const MobileBottomCard = () => {
  const intl = useIntl();
  const { input } = useSearch<MvGenerics>();
  const [isMyPositionOpen, setIsMyPositionOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  // const [isYieldCalculatorOpen, setIsYieldCalculatorOpen] = useState(false);
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
            <PositionContent />
            <Stack direction="row" spacing={2} mt={3} mb={1}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                startIcon={<Receipt weight="fill" size={14} />}
                onClick={() => setIsHistoryDialogOpen(true)}
              >
                {intl.formatMessage({
                  defaultMessage: 'History',
                  id: 'djJp6c',
                })}
              </Button>
              {/* <Button
                fullWidth
                color="secondary"
                onClick={() => setIsYieldCalculatorOpen(true)}
              >
                {intl.formatMessage({ defaultMessage: 'Yield Calculator' })}
              </Button> */}
            </Stack>
          </CollapsibleSection>
        </Box>
        <Box m={2} mt={3}>
          <Button fullWidth onClick={() => setIsOperationOpen(true)}>
            {intl.formatMessage({
              defaultMessage: 'Deposit/Withdraw',
              id: 'in6iXe',
            })}
          </Button>
        </Box>
      </Card>
      {/* <YieldCalculatorDialog
        open={isYieldCalculatorOpen}
        onClose={() => setIsYieldCalculatorOpen(false)}
      /> */}
      {isHistoryDialogOpen && (
        <HistoryDialog onClose={() => setIsHistoryDialogOpen(false)} />
      )}
      <Dialog
        open={isOperationOpen}
        onClose={() => setIsOperationOpen(false)}
        title={intl.formatMessage({
          defaultMessage: 'Deposit/Withdraw',
          id: 'in6iXe',
        })}
        content={
          <Operations
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
