import type { Theme } from '@mui/material';
import type { SystemStyleObject } from '@mui/system';

export interface FocusFrameOptions {
  borderWidth?: string;
  borderRadius?: string;
  borderColor?: string;
  offset?: number;
  borderStyle?: string;
}

export const focusFrame = ({
  borderWidth = '2px',
  borderRadius = 'inherit',
  offset = 1,
  borderColor,
  borderStyle = 'solid',
}: FocusFrameOptions): SystemStyleObject<Theme> => ({
  borderStyle,
  ...(borderColor && { borderColor }),
  borderWidth,
  borderRadius,
  content: '""',
  height: `calc(100% + ${2 * offset}px)`,
  width: `calc(100% + ${2 * offset}px)`,
  position: 'absolute',
  top: `${-offset}px`,
  left: `${-offset}px`,
  zIndex: 1,
});
