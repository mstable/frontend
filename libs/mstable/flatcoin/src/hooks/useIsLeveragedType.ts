import { useFlatcoin } from '../state';

export const useIsLeveragedType = () => useFlatcoin().type === 'leveragedeth';
