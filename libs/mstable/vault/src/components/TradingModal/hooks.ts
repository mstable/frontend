import { useMemo } from 'react';

import {
  useReceiveTokenInput,
  useTradingPanelModal,
} from '@dhedge/core-ui-kit/hooks/state';
import { useIntl } from 'react-intl';

export const useTradingModal = () => {
  const intl = useIntl();
  const [receiveToken] = useReceiveTokenInput();
  const [
    { isOpen, status: txStatus, summary, link: explorerLink, action },
    updateTradingModal,
  ] = useTradingPanelModal();
  const isSuccessTx = txStatus === 'Success';
  const showShareButton = action === 'deposit' && isSuccessTx;
  const showAddToken =
    showShareButton && receiveToken.symbol !== 'all' && isSuccessTx;

  const onModalClose = () => {
    updateTradingModal({
      isOpen: false,
      status: 'None',
      summary: '',
      link: '',
    });
  };

  const titleMap = useMemo(
    () => ({
      Wallet: intl.formatMessage({
        defaultMessage: 'Sending order to your wallet',
        id: '/r/mPc',
      }),
      None: intl.formatMessage({
        defaultMessage: 'Setting up transaction',
        id: 'lubHZr',
      }),
      Success: intl.formatMessage({ defaultMessage: 'Success', id: 'xrKHS6' }),
      Mining: intl.formatMessage({ defaultMessage: 'Mining', id: 'ObjU4O' }),
    }),
    [intl],
  );

  return {
    titleMap,
    onModalClose,
    isOpen,
    isSuccessTx,
    summary,
    explorerLink,
    showAddToken,
    showShareButton,
    receiveToken,
    modalTitle: titleMap[txStatus] ?? txStatus,
  };
};
