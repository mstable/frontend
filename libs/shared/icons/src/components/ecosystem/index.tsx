import { SvgIcon } from '@mui/material';

import TorosWord from './toros-word.png';

import type { SvgIconProps } from '@mui/material';

export const Toros = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 159 49">
    <image href={TorosWord} height={49} width={159} />
  </SvgIcon>
);
