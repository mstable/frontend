import axios from 'redaxios';
import {
  SimulateTransactionParams,
  SimulateTransactionResponse,
} from '@dhedge/core-ui-kit/types';
import { torosDappLink } from '@frontend/shared-constants';

export const simulateTransaction = (body: SimulateTransactionParams) =>
  axios.post<{ data: SimulateTransactionResponse; message: string }>(
    `${torosDappLink}/api/simulate-transaction`,
    body,
  );
