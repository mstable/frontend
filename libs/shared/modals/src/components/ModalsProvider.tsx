import { ConfirmationDialog, Dialog, Modal } from '@frontend/shared-ui';

import {
  DefaultsProvider,
  FlagsProvider,
  useClearFlag,
  useFlags,
  useState,
} from '../state';

import type { Children, WithChildren } from '@frontend/shared-utils';

import type {
  ConfirmationDialogOptions,
  DialogOptions,
  ModalOptions,
} from '../types';

export type ModalsProviderProps = WithChildren<{
  modal?: Omit<ModalOptions, 'content'>;
  dialog?: Omit<DialogOptions, 'content'>;
  confirmationDialog?: Omit<ConfirmationDialogOptions, 'onConfirm'>;
}>;

const ModalsWrapped = ({ children }: Children) => {
  const { modal, dialog, confirmation_dialog } = useFlags();
  const clearFlag = useClearFlag();
  const {
    modal: modalOptions,
    dialog: dialogOptions,
    confirmationDialog: confirmationDialogOptions,
  } = useState();

  const handleModalClose = () => {
    if (modalOptions?.onClose) {
      modalOptions?.onClose();
    }
    clearFlag('modal');
  };

  const handleDialogClose = () => {
    if (dialogOptions?.onClose) {
      dialogOptions?.onClose();
    }
    clearFlag('dialog');
  };

  const handleConfirm = () => {
    confirmationDialogOptions.onConfirm();
    clearFlag('confirmation_dialog');
  };

  const handleCancel = () => {
    if (confirmationDialogOptions?.onCancel) {
      confirmationDialogOptions?.onCancel();
    }
    clearFlag('confirmation_dialog');
  };

  return (
    <>
      {children}
      <ConfirmationDialog
        {...confirmationDialogOptions}
        open={confirmation_dialog}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <Dialog {...dialogOptions} open={dialog} onClose={handleDialogClose} />
      <Modal {...modalOptions} open={modal} onClose={handleModalClose} />
    </>
  );
};

export const ModalsProvider = ({
  modal,
  dialog,
  confirmationDialog,
  ...rest
}: ModalsProviderProps) => (
  <FlagsProvider>
    <DefaultsProvider initialState={{ modal, dialog, confirmationDialog }}>
      <ModalsWrapped {...rest} />
    </DefaultsProvider>
  </FlagsProvider>
);
