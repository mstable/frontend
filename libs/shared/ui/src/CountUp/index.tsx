import { isNilOrEmpty } from '@frontend/shared-utils';
import { Typography } from '@mui/material';
import CountUpLib from 'react-countup';

import type { TypographyProps } from '@mui/material';
import type { CountUpProps as CountUpLibProps } from 'react-countup';

export type CountUpProps = CountUpLibProps & Omit<TypographyProps, 'children'>;

export const CountUp = ({
  className,
  decimal,
  decimals = 2,
  delay,
  duration = 1.5,
  end,
  prefix,
  redraw,
  preserveValue,
  separator = ',',
  start,
  suffix,
  useEasing,
  easingFn,
  formattingFn,
  enableScrollSpy,
  scrollSpyDelay,
  scrollSpyOnce,
  onEnd,
  onStart,
  onPauseResume,
  onReset,
  onUpdate,
  ...rest
}: CountUpProps) => {
  return (
    <Typography {...rest}>
      {prefix ? `${prefix} ` : ''}
      <CountUpLib
        {...(!isNilOrEmpty(className) && { className })}
        {...(!isNilOrEmpty(decimal) && { decimal })}
        {...(!isNilOrEmpty(decimals) && { decimals })}
        {...(!isNilOrEmpty(delay) && { delay })}
        {...(!isNilOrEmpty(duration) && { duration })}
        {...(!isNilOrEmpty(end) && { end })}
        {...(!isNilOrEmpty(redraw) && { redraw })}
        {...(!isNilOrEmpty(preserveValue) && { preserveValue })}
        {...(!isNilOrEmpty(separator) && { separator })}
        {...(!isNilOrEmpty(start) && { start })}
        {...(!isNilOrEmpty(useEasing) && { useEasing })}
        {...(!isNilOrEmpty(easingFn) && { easingFn })}
        {...(!isNilOrEmpty(formattingFn) && { formattingFn })}
        {...(!isNilOrEmpty(enableScrollSpy) && { enableScrollSpy })}
        {...(!isNilOrEmpty(scrollSpyDelay) && { scrollSpyDelay })}
        {...(!isNilOrEmpty(scrollSpyOnce) && { scrollSpyOnce })}
        {...(!isNilOrEmpty(onEnd) && { onEnd })}
        {...(!isNilOrEmpty(onStart) && { onStart })}
        {...(!isNilOrEmpty(onPauseResume) && { onPauseResume })}
        {...(!isNilOrEmpty(onReset) && { onReset })}
        {...(!isNilOrEmpty(onUpdate) && { onUpdate })}
      />
      {suffix ? ` ${suffix}` : ''}
    </Typography>
  );
};
