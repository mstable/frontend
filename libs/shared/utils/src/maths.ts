import { BigNumber } from 'bignumber.js';

export const countDecimals = (value: number) => {
  if (Math.floor(value) === value) return 0;

  return value.toString().split('.')[1].length || 0;
};

export const countFirstDecimal = (value: number) => {
  if (Math.floor(value) === value) return 0;

  const dec = value.toString().split('.')[1];
  let digits = 0;
  for (const v of dec) {
    digits += 1;
    if (v !== '0') {
      break;
    }
  }

  return digits;
};

export const isNumeric = (value: string): boolean =>
  !isNaN(parseFloat(value)) && !isNaN(value as never);

export const getSlippageAdjustedValue = (
  value: string | number,
  slippage: string,
): BigNumber => {
  const slippageMultiplier = new BigNumber(100).minus(slippage).dividedBy(100);
  return new BigNumber(value).times(slippageMultiplier);
};
