import type { BigDecimal } from './BigDecimal';

export const getColorFromValue = ({
  value,
  defaultColor = 'text.secondary',
}: {
  value: BigDecimal;
  defaultColor?: string;
}) => {
  if (value.exact.isZero()) {
    return defaultColor;
  }
  return value.exact.gt(0) ? 'success.main' : 'error.main';
};
