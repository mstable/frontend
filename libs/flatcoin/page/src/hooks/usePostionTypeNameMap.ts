import { useFlatcoin } from '../state';

import type { PositionType } from '../types';

export const usePositionTypeNameMap = (): Record<PositionType, string> => {
  const { tokens } = useFlatcoin();

  return {
    flatcoin: 'Flatcoin',
    leveraged: `Leveraged ${tokens.collateral.symbol}`,
  };
};
