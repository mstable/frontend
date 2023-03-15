import { forwardRef } from 'react';

import { Stack } from '@mui/material';
import { motion } from 'framer-motion';

import type { StackProps } from '@mui/material';
import type { HTMLMotionProps } from 'framer-motion';

export type MotionStackProps = Omit<
  StackProps,
  | 'component'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onAnimationStart'
  | 'ref'
> &
  Omit<
    HTMLMotionProps<'div'>,
    | 'color'
    | 'onDrag'
    | 'onDragEnd'
    | 'onDragStart'
    | 'onAnimationStart'
    | 'ref'
  >;

export const MotionStack = forwardRef<HTMLDivElement, MotionStackProps>(
  (props, ref) => {
    return <Stack {...props} ref={ref} component={motion.div} />;
  },
);
MotionStack.displayName = 'MotionStack';
