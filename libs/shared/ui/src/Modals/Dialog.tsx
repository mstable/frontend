import { isNilOrEmpty } from '@frontend/shared-utils';
import Close from '@mui/icons-material/Close';
import {
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import type { DialogProps as MuiDialogProps } from '@mui/material';
import type { ReactNode } from 'react';

export type DialogProps = {
  content: ReactNode | ((onClose: () => void) => ReactNode);
  onClose: () => void;
  title?: ReactNode | ((onClose: () => void) => ReactNode);
  actions?: ReactNode | ((onClose: () => void) => ReactNode);
  hideCloseButton?: boolean;
  disableClickAway?: boolean;
} & Pick<
  MuiDialogProps,
  | 'open'
  | 'aria-describedby'
  | 'aria-labelledby'
  | 'disableEscapeKeyDown'
  | 'fullScreen'
  | 'fullWidth'
  | 'maxWidth'
  | 'PaperProps'
  | 'scroll'
  | 'sx'
>;

export const Dialog = ({
  title,
  content,
  actions,
  onClose,
  hideCloseButton = false,
  disableClickAway = false,
  ...rest
}: DialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isNilOrEmpty(content)) return null;

  const handleClose = () => {
    if (disableClickAway) return;
    onClose();
  };

  return (
    <MuiDialog
      fullWidth
      fullScreen={isMobile}
      maxWidth="sm"
      {...rest}
      onClose={handleClose}
    >
      {!hideCloseButton && (
        <IconButton
          color="inherit"
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
            color: 'text.primary',
          }}
        >
          <Close />
        </IconButton>
      )}
      {typeof title === 'function' ? (
        title(onClose)
      ) : (
        <DialogTitle>{title}</DialogTitle>
      )}
      <DialogContent>
        {typeof content === 'function' ? (
          content(onClose)
        ) : typeof content === 'string' ? (
          <DialogContentText>{content}</DialogContentText>
        ) : (
          content
        )}
      </DialogContent>
      {!isNilOrEmpty(actions) && (
        <DialogActions>
          {typeof actions === 'function' ? actions(onClose) : actions}
        </DialogActions>
      )}
    </MuiDialog>
  );
};
