import { Box, Modal as MuiModal } from '@mui/material';

import type { BoxProps, ModalProps as MuiModalProps } from '@mui/material';
import type { Dispatch, ReactNode } from 'react';

export type ModalProps = {
  children: ReactNode | ((onClose: () => void) => ReactNode);
  onClose?: Dispatch<void>;
  disableClickAway?: boolean;
  containerProps?: BoxProps;
} & Pick<
  MuiModalProps,
  | 'open'
  | 'closeAfterTransition'
  | 'disableAutoFocus'
  | 'disableEnforceFocus'
  | 'disableEscapeKeyDown'
  | 'disablePortal'
  | 'disableRestoreFocus'
  | 'disableScrollLock'
  | 'hideBackdrop'
  | 'keepMounted'
  | 'sx'
>;

export const Modal = ({
  children,
  onClose,
  disableClickAway,
  containerProps,
  ...rest
}: ModalProps) => {
  const handleClose = () => {
    if (disableClickAway) return;
    if (onClose) onClose();
  };

  return (
    <MuiModal
      {...rest}
      onClose={handleClose}
      disableEscapeKeyDown={disableClickAway}
    >
      <Box
        {...containerProps}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: 400,
          bgcolor: 'background.paper',
          ...containerProps?.sx,
        }}
      >
        {typeof children === 'function' ? children(onClose) : children}
      </Box>
    </MuiModal>
  );
};
