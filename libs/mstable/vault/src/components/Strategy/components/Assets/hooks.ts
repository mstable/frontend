import { useMemo } from 'react';

import BigNumber from 'bignumber.js';

import { useVault } from '../../../../state';

const getFundAssetPercentage = (
  totalValue: string,
  assetAmount: string,
  assetRate: string,
  precision: number,
) => {
  const value = new BigNumber(assetAmount)
    .shiftedBy(-precision)
    .multipliedBy(assetRate)
    .dividedBy(totalValue)
    .toNumber();
  const percentage = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
  return {
    value,
    percentage,
  };
};

export const useAssetsComposition = () => {
  const { fund } = useVault();

  return useMemo(() => {
    // guarantees 100% total
    const totalValue = fund?.fundComposition.reduce(
      (acc, { amount, rate, precision }) =>
        new BigNumber(amount)
          .shiftedBy(-precision)
          .multipliedBy(rate)
          .plus(acc)
          .toString(),
      '0',
    );

    return fund?.fundComposition
      ?.map((asset) => ({
        ...asset,
        ...getFundAssetPercentage(
          totalValue ?? '0',
          asset.amount,
          asset.rate,
          asset.precision,
        ),
      }))
      .filter(
        ({ amount, value }) => new BigNumber(amount).gt(0) && value >= 0.01,
      )
      .slice()
      .sort((first, second) => second.value - first.value);
  }, [fund?.fundComposition]);
};
