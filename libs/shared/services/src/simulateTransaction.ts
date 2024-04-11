import axios from 'redaxios';
import {
  SimulateTransactionParams,
  SimulateTransactionResponse,
} from '@dhedge/core-ui-kit/types';
import { TOROS_DAPP_LINK } from '@frontend/shared-constants';

export const simulateTransaction = (body: SimulateTransactionParams) =>
  axios.post<{ data: SimulateTransactionResponse; message: string }>(
    `${TOROS_DAPP_LINK}/api/simulate-transaction`,
    body,
  );
