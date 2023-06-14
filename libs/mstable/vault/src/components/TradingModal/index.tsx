import { Dialog, Spinner } from '@frontend/shared-ui';
import CheckIcon from '@mui/icons-material/Check';
import { Stack, Typography } from '@mui/material';

import { useTradingModal } from './hooks';
import { TradingModalActions } from './TradingModalActions';

export const TradingModal = () => {
  const {
    onModalClose,
    titleMap,
    isOpen,
    showShareButton,
    showAddToken,
    isSuccessTx,
    summary,
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
          )}{' '}
          {summary && <Typography variant="body1">{summary}</Typography>}
        </Stack>
      }
      actions={
        explorerLink ? (
          <TradingModalActions
            token={receiveToken}
            showShareButton={showShareButton}
            showAddToken={showAddToken}
            explorerLink={explorerLink}
          ></TradingModalActions>
        ) : undefined
      }
      maxWidth="xs"
    />
  );
};
