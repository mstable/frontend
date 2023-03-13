import { isNilOrEmpty } from '@frontend/shared-utils';
import { Box, Collapse, Stack, Typography } from '@mui/material';

import { ExpandIcon } from '../Icons';

import type { StackProps, SvgIconProps, TypographyProps } from '@mui/material';
import type { BoxProps } from '@mui/system';
import type { MouseEvent, ReactNode } from 'react';

export type CollapsibleSectionProps = {
  title: string;
  subtitle?: string;
  open: boolean;
  onToggle?: () => void;
  children:
    | ReactNode
    | ((open: boolean, onToggle: (event?: MouseEvent) => void) => ReactNode);
  defaultOpen?: boolean;
  iconPosition?: 'start' | 'end' | 'none';
  components?: {
    titleContainer?: StackProps;
    title?: TypographyProps;
    subtitle?: TypographyProps;
    icon?: SvgIconProps;
    childrenContainer?: BoxProps;
  };
} & Omit<StackProps, 'title'>;

export const CollapsibleSection = ({
  title,
  subtitle,
  children,
  iconPosition = 'start',
  open,
  onToggle,
  components,
  ...rest
}: CollapsibleSectionProps) => {
  const handleToggle =
    (handler?: (event?: MouseEvent) => void) => (event: MouseEvent) => {
      if (handler) {
        handler(event);
      }
      if (onToggle) {
        onToggle();
      }
    };

  return (
    <Stack direction="column" {...rest}>
      <Stack
        direction="row"
        py={1}
        display="flex"
        flexDirection="row"
        alignItems="center"
        {...components?.titleContainer}
        role="button"
        tabIndex={0}
        onClick={handleToggle(components?.titleContainer?.onClick)}
        sx={{
          ...(onToggle && {
            ':hover': {
              cursor: 'pointer',
              color: 'primary.main',
            },
          }),
          ...components?.titleContainer?.sx,
        }}
      >
        {iconPosition === 'start' && (
          <ExpandIcon
            expanded={open}
            sx={{
              marginRight: 1,
              ...components?.icon?.sx,
            }}
          />
        )}
        <Stack direction="column" flexGrow={1}>
          <Typography
            className="title"
            {...components?.title}
            sx={{
              typography: 'h5',
              marginBottom: isNilOrEmpty(subtitle) ? 0 : 0.5,
              ...components?.title?.sx,
            }}
          >
            {title}
          </Typography>
          {!isNilOrEmpty(subtitle) && (
            <Typography
              color="text.secondary"
              {...components?.subtitle}
              sx={{ typography: 'subtitle1', ...components?.subtitle?.sx }}
            >
              {subtitle}
            </Typography>
          )}
        </Stack>
        {iconPosition === 'end' && (
          <ExpandIcon
            expanded={open}
            sx={{
              marginLeft: 1,
              ...components?.icon?.sx,
            }}
          />
        )}
      </Stack>
      <Collapse in={open}>
        {typeof children === 'function' ? (
          children(open, handleToggle())
        ) : (
          <Box
            {...components?.childrenContainer}
            sx={{ padding: 1, ...components?.childrenContainer?.sx }}
          >
            {children}
          </Box>
        )}
      </Collapse>
    </Stack>
  );
};
