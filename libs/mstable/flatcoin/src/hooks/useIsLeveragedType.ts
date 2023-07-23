import { useFlatcoinPageState } from '../state';

export const useIsLeveragedType = () =>
  useFlatcoinPageState().type === 'leveraged';
