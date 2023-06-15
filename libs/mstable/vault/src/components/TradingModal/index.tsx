import { Dialog, Spinner } from '@frontend/shared-ui';
import CheckIcon from '@mui/icons-material/Check';
import { Stack } from '@mui/material';

import { useTradingModal } from './hooks';
import { TradingModalActions } from './TradingModalActions';
import { TradingModalSummary } from './TradingModalSummary';

export const TradingModal = () => {
  const {
    onModalClose,
    isOpen,
    showShareButton,
    showAddToken,
    isSuccessTx,
    explorerLink,
    receiveToken,
    modalTitle,
  } = useTradingModal();

  return (
    <Dialog
      open={isOpen}
      onClose={onModalClose}
      title={modalTitle}
      content={
        <Stack mt={2} alignItems="center" spacing={3}>
          {isSuccessTx ? (
            <CheckIcon color="success" sx={{ fontSize: 75 }} />
          ) : (
            <Spinner circularProgressProps={{ size: 75 }} />
          )}
          <TradingModalSummary />
        </Stack>
      }
      actions={
        explorerLink && receiveToken ? (
          <TradingModalActions
            token={receiveToken}
            showShareButton={showShareButton}
            showAddToken={showAddToken}
            explorerLink={explorerLink}
          />
        ) : undefined
      }
      maxWidth="xs"
    />
  );
};
