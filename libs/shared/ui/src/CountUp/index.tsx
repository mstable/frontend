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
        {...(className && { className })}
        {...(decimal && { decimal })}
        {...(decimals && { decimals })}
        {...(delay && { delay })}
        {...(duration && { duration })}
        {...(end && { end })}
        {...(redraw && { redraw })}
        {...(preserveValue && { preserveValue })}
        {...(separator && { separator })}
        {...(start && { start })}
        {...(useEasing && { useEasing })}
        {...(easingFn && { easingFn })}
        {...(formattingFn && { formattingFn })}
        {...(enableScrollSpy && { enableScrollSpy })}
        {...(scrollSpyDelay && { scrollSpyDelay })}
        {...(scrollSpyOnce && { scrollSpyOnce })}
        {...(onEnd && { onEnd })}
        {...(onStart && { onStart })}
        {...(onPauseResume && { onPauseResume })}
        {...(onReset && { onReset })}
        {...(onUpdate && { onUpdate })}
      />
      {suffix ? ` ${suffix}` : ''}
    </Typography>
  );
};
