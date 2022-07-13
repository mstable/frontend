import { useCallback } from 'react';

import { useClearFlag, useSetFlag, useUpdateWithDefaults } from './state';

import type {
  ConfirmationDialogOptions,
  DialogOptions,
  ModalOptions,
} from './types';

export const useShowModal = () => {
  const updateWithDefaults = useUpdateWithDefaults();
  const setFlag = useSetFlag();

  return useCallback(
    (options: ModalOptions) => {
      updateWithDefaults({ modal: options });
      setFlag('modal');
    },
    [setFlag, updateWithDefaults],
  );
};

export const useHideModal = () => {
  const clearFlag = useClearFlag();

  return useCallback(() => {
    clearFlag('modal');
  }, [clearFlag]);
};

export const useShowDialog = () => {
  const updateWithDefaults = useUpdateWithDefaults();
  const setFlag = useSetFlag();

  return useCallback(
    (options: DialogOptions) => {
      updateWithDefaults({ dialog: options });
      setFlag('dialog');
    },
    [setFlag, updateWithDefaults],
  );
};

export const useHideDialog = () => {
  const clearFlag = useClearFlag();

  return useCallback(() => {
    clearFlag('dialog');
  }, [clearFlag]);
};

export const useShowConfirmationDialog = () => {
  const updateWithDefaults = useUpdateWithDefaults();
  const setFlag = useSetFlag();

  return useCallback(
    (options: ConfirmationDialogOptions) => {
      updateWithDefaults({ confirmationDialog: options });
      setFlag('confirmation_dialog');
    },
    [setFlag, updateWithDefaults],
  );
};

export const useHideConfirmationDialog = () => {
  const clearFlag = useClearFlag();

  return useCallback(() => {
    clearFlag('confirmation_dialog');
  }, [clearFlag]);
};
