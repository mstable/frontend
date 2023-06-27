import { Typography } from '@mui/material';

import type { TypographyProps } from '@mui/material';

import type { Fund } from '../../types';

interface ApyProps extends TypographyProps {
  fundApy?: Fund['apy'];
  period?: keyof Fund['apy'];
}

const getApyValue = ({ fundApy, period = 'monthly' }: ApyProps) => {
  const apy = fundApy?.[period];
  return apy ? `${Math.max(0, apy).toFixed(apy > 0 ? 2 : 0)}%` : '-';
};

export const Apy = ({ fundApy, period, ...props }: ApyProps) => {
  return <Typography {...props}>{getApyValue({ fundApy, period })}</Typography>;
};
