type TransactionErrors = {
  [error: string]: {
    name: string;
    action?: string;
  };
};

const TRANSACTION_ERRORS: TransactionErrors = {
  'execution reverted: DO: slippage is higher': {
    name: 'Low slippage tolerance',
    action: 'You can increase slippage tolerance and try again.',
  },
  'execution reverted: DO: order has not expired': {
    name: 'Previous order has not expired yet',
    action: 'You can execute previous order or wait and try again.',
  },
};

const extractTransactionErrorReason = (errorMessage: string) => {
  const startIndex = errorMessage.indexOf('reason="') + 'reason="'.length;
  const endIndex = errorMessage.indexOf('"', startIndex);

  if (startIndex !== -1 && endIndex !== -1) {
    return errorMessage.substring(startIndex, endIndex);
  }
  return '';
};

export const getTransactionErrorHint = (
  error: string,
): TransactionErrors['error'] => {
  const errorMessage = extractTransactionErrorReason(error);
  return TRANSACTION_ERRORS[errorMessage] ?? { name: errorMessage };
};
