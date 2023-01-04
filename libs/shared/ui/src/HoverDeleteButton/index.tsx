import Close from '@mui/icons-material/Close';
import { Box, Fade, IconButton, Stack } from '@mui/material';
import { useHover } from 'react-use';

import type {
  BoxProps,
  FadeProps,
  IconButtonProps,
  StackProps,
} from '@mui/material';
import type { MouseEventHandler } from 'react';

export type HoverDeleteButtonProps = {
  onDelete: MouseEventHandler<HTMLButtonElement>;
  contentProps?: BoxProps;
  fadeProps?: Omit<FadeProps, 'children'>;
  CloseButtonProps?: Omit<IconButtonProps, 'onClick'>;
} & StackProps;

export const HoverDeleteButton = ({
  children,
  onDelete: onDeleteClick,
  contentProps,
  fadeProps,
  CloseButtonProps,
  ...rest
}: HoverDeleteButtonProps) => {
  const [container] = useHover((hovered: boolean) => (
    <Stack direction="row" spacing={1} {...rest}>
      <Box flexGrow={1} display="flex" alignItems="center" {...contentProps}>
        {children}
      </Box>
      <Box display="flex" alignItems="center">
        <Fade {...fadeProps} in={hovered}>
          <IconButton {...CloseButtonProps} onClick={onDeleteClick}>
            <Close />
          </IconButton>
        </Fade>
      </Box>
    </Stack>
  ));

  return container;
};
