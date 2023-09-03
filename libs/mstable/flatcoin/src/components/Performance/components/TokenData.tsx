import { Box, Skeleton, Typography } from '@mui/material';

import { useFlatcoinType } from '../../../hooks';
import { useFlatcoin } from '../../../state';

import type { BoxProps } from '@mui/material';

import type { FlatcoinState, PositionType } from '../../../types';

const POSITION_TYPE_TOKEN_MAP: Record<
  PositionType,
  keyof FlatcoinState['tokens']
> = {
  flatcoin: 'flatcoin',
  leveraged: 'collateral',
};

export const TokenData = (props: BoxProps) => {
  const [type] = useFlatcoinType();
  const { tokens } = useFlatcoin();
  const { price } = tokens[POSITION_TYPE_TOKEN_MAP[type]];

  return (
    <Box {...props}>
      {price.exact.isZero() ? (
        <Skeleton height={35} width={152} />
      ) : (
        <Typography variant="value1">{price.usd}</Typography>
      )}
    </Box>
  );
};
