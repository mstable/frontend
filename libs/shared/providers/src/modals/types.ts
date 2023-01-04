import type {
  ConfirmationDialogProps,
  DialogProps,
  ModalProps,
} from '@frontend/shared-ui';
import type { OptionalBy } from '@frontend/shared-utils';

export type ModalOptions = OptionalBy<Omit<ModalProps, 'open'>, 'onClose'>;
export type DialogOptions = OptionalBy<Omit<DialogProps, 'open'>, 'onClose'>;
export type ConfirmationDialogOptions = Omit<ConfirmationDialogProps, 'open'>;
