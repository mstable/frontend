import { BigNumber } from 'bignumber.js';

import { isNumeric } from './maths';

export const middleTruncate = (address: string, start = 6, end = 4): string =>
  `${address.slice(0, start)}…${address.slice(-end)}`;

export const removeInsignificantTrailingZeros = (value: string): string =>
  isNumeric(value) ? new BigNumber(value).toFixed() : '';

export const formatNumberToLimitedDecimals = (
  value: number | string,
  decimals = 6,
): string =>
  removeInsignificantTrailingZeros(new BigNumber(value).toFixed(decimals));
