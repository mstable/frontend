import { useMemo } from 'react';

import { useTradingPanelModal } from '@dhedge/core-ui-kit/hooks/state';
import { useIntl } from 'react-intl';

export const useTradingModal = () => {
  const intl = useIntl();
  const [
    { isOpen, status: txStatus, link: explorerLink, action, receiveToken },
    updateTradingModal,
  ] = useTradingPanelModal();
  const isSuccessTx = txStatus === 'Success';
  const showShareButton = action === 'deposit' && isSuccessTx;
  const showAddToken =
    showShareButton &&
    receiveToken &&
    receiveToken.symbol !== 'all' &&
    isSuccessTx;

  const onModalClose = () => {
    updateTradingModal({
      isOpen: false,
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
    onModalClose,
    isOpen,
    isSuccessTx,
    explorerLink,
    showAddToken,
    showShareButton,
    receiveToken,
    modalTitle: titleMap[txStatus] ?? txStatus,
  };
};
