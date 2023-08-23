import { useFlatcoinType } from './useFlatcoinType';

export const useIsLeveragedType = () => useFlatcoinType()[0] === 'leveragedeth';
