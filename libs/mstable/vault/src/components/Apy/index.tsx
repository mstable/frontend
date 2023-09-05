import { removeInsignificantTrailingZeros } from '@frontend/shared-utils';
import { Typography } from '@mui/material';

import type { TypographyProps } from '@mui/material';

import type { Fund } from '../../types';

interface ApyProps extends TypographyProps {
  fundApy?: Fund['apy'];
  period?: keyof Fund['apy'];
}

const getApyValue = ({ fundApy, period }: ApyProps) => {
  const apyValues = period
    ? [fundApy?.[period] || fundApy?.weekly]
    : Object.values(fundApy);
  return fundApy
    ? `${removeInsignificantTrailingZeros(
        Math.max(0, ...apyValues).toFixed(2),
      )}%`
    : '-';
};

export const Apy = ({ fundApy, period, ...props }: ApyProps) => {
  return <Typography {...props}>{getApyValue({ fundApy, period })}</Typography>;
};
