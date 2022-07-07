import { forwardRef } from 'react';

import { isNilOrEmpty } from '@frontend/shared-utils';
import { Stack, Typography } from '@mui/material';

import type { StackProps, TypographyProps } from '@mui/material';

export type MiddleTruncatedProps = {
  children: string;
  typographyProps?: Omit<TypographyProps, 'noWrap' | 'textOverflow'>;
  end?: number;
} & Omit<StackProps, 'direction' | 'overflow' | 'whiteSpace'>;

export const MiddleTruncated = forwardRef(
  (
    { children, typographyProps, end = 4, ...rest }: MiddleTruncatedProps,
    ref,
  ) => {
    if (isNilOrEmpty(children)) return null;

    if (children.length <= end) {
      return (
        <Typography noWrap {...typographyProps}>
          {children}
        </Typography>
      );
    }

    const partStart = children.substring(0, children.length - end);
    const partEnd = children.slice(children.length - end);
    const breakspace =
      children[children.length - end - 1] === ' ' &&
      children[children.length - end] !== ' ';

    return (
      <Stack
        {...rest}
        sx={{ overflow: 'hidden', whiteSpace: 'nowrap', ...rest?.sx }}
        direction="row"
        ref={ref}
      >
        <Typography {...typographyProps} noWrap>
          {partStart}
        </Typography>
        {breakspace && <Typography {...typographyProps}>&nbsp;</Typography>}
        <Typography {...typographyProps}>{partEnd}</Typography>
      </Stack>
    );
  },
);
MiddleTruncated.displayName = 'MiddleTruncated';
