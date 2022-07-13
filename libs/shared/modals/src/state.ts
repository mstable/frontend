import {
  createDefaultsContainer,
  createFlagsContainer,
} from '@frontend/shared-utils';

import type {
  ConfirmationDialogOptions,
  DialogOptions,
  ModalOptions,
} from './types';

export type Flag = 'modal' | 'dialog' | 'confirmation_dialog';

type ModalsState = {
  modal: ModalOptions;
  dialog: DialogOptions;
  confirmationDialog: ConfirmationDialogOptions;
};

export const { FlagsProvider, useFlags, useSetFlag, useClearFlag } =
  createFlagsContainer<Flag>({
    modal: false,
    dialog: false,
    confirmation_dialog: false,
  });

export const { DefaultsProvider, useState, useUpdateWithDefaults } =
  createDefaultsContainer<ModalsState>({
    modal: {
      children: undefined,
      onClose: undefined,
      containerProps: undefined,
      disableClickAway: false,
    },
    dialog: {
      title: undefined,
      content: undefined,
      actions: undefined,
      onClose: () => null,
      hideCloseButton: false,
      disableClickAway: false,
    },
    confirmationDialog: {
      title: undefined,
      content: undefined,
      confirmLabel: undefined,
      cancelLabel: undefined,
      onConfirm: () => null,
      onCancel: undefined,
      confirmProps: undefined,
      cancelProps: undefined,
    },
  });
