import { useLayoutEffect } from 'react';

import { useNetwork } from 'wagmi';

import { useHideDialog, useShowDialog } from '../modals';
import { UnsupportedNetworkDialog } from './components/UnsupportedNetworkDialog';

export const useUnsupportedNetworks = () => {
  const showDialog = useShowDialog();
  const hideDialog = useHideDialog();
  const { chain } = useNetwork();

  useLayoutEffect(() => {
    if (chain?.unsupported) {
      showDialog(UnsupportedNetworkDialog);
    } else {
      hideDialog();
    }
  }, [chain?.unsupported, hideDialog, showDialog]);
};
