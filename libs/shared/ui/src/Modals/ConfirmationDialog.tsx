/* eslint-disable formatjs/no-id */
import { isNilOrEmpty } from '@frontend/shared-utils';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useIntl } from 'react-intl';

import type { ButtonProps } from '@mui/material';
import type { DialogProps as MuiDialogProps } from '@mui/material';
import type { Dispatch, ReactNode } from 'react';

export type CustomButtonProps = Pick<
  ButtonProps,
  'variant' | 'size' | 'color' | 'sx'
>;

export type ConfirmationDialogProps = {
  onConfirm: Dispatch<void>;
  title?: string;
  content?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onCancel?: Dispatch<void>;
  confirmProps?: CustomButtonProps;
  cancelProps?: CustomButtonProps;
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

export const ConfirmationDialog = ({
  title,
  content,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  confirmProps = {},
  cancelProps = {},
  ...rest
}: ConfirmationDialogProps) => {
  const intl = useIntl();

  const msg =
    content ??
    intl.formatMessage({
      id: 'defaultConfirmation',
      defaultMessage: 'Please confirm to proceed',
    });

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog fullWidth maxWidth="sm" {...rest} onClose={handleCancel}>
      <DialogTitle
        sx={{
          position: 'relative',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        {typeof msg === 'string' ? (
          <DialogContentText>{msg}</DialogContentText>
        ) : (
          msg
        )}
      </DialogContent>
      <DialogActions>
        <Button {...cancelProps} onClick={handleCancel}>
          {isNilOrEmpty(cancelLabel)
            ? intl.formatMessage({
                id: 'defaultCancel',
                defaultMessage: 'Cancel',
              })
            : cancelLabel}
        </Button>
        <Button color="primary" {...confirmProps} onClick={handleConfirm}>
          {isNilOrEmpty(confirmLabel)
            ? intl.formatMessage({
                id: 'defaultConfirm',
                defaultMessage: 'Confirm',
              })
            : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
