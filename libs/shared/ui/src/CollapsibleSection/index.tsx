import { cloneElement, isValidElement, useState } from 'react';

import { Box, Collapse, Stack, Typography } from '@mui/material';
import { not } from 'ramda';

import { ExpandIcon } from '../ExpandIcon';

import type { StackProps, SvgIconProps, TypographyProps } from '@mui/material';
import type { BoxProps } from '@mui/system';
import type { MouseEvent, ReactNode } from 'react';

export type CollapsibleSectionProps = {
  title:
    | ReactNode
    | ((open: boolean, onToggle: (event?: MouseEvent) => void) => ReactNode);
  content:
    | ReactNode
    | ((open: boolean, onToggle: (event?: MouseEvent) => void) => ReactNode);
  defaultOpen?: boolean;
  titleProps?: BoxProps;
  titleLabelProps?: TypographyProps;
  contentProps?: BoxProps;
  iconProps?: SvgIconProps;
  iconPosition?: 'start' | 'end' | 'none';
} & Omit<StackProps, 'title'>;

export const CollapsibleSection = ({
  title,
  content,
  titleProps,
  titleLabelProps,
  contentProps,
  iconProps,
  iconPosition = 'start',
  defaultOpen = false,
  ...rest
}: CollapsibleSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  const handleToggle =
    (handler?: (event?: MouseEvent) => void) => (event: MouseEvent) => {
      if (handler) {
        handler(event);
      }
      setOpen(not);
    };

  return (
    <Stack direction="column" {...rest}>
      {typeof title === 'function' ? (
        title(open, handleToggle())
      ) : ['string', 'number'].includes(typeof title) ? (
        <Box
          {...titleProps}
          role="button"
          tabIndex={0}
          onClick={handleToggle(titleProps?.onClick)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            py: 1,
            cursor: 'pointer',
            ':hover': {
              backgroundColor: 'action.hover',
            },
            ...titleProps?.sx,
          }}
        >
          {iconPosition === 'start' && (
            <ExpandIcon
              expanded={open}
              sx={{
                marginRight: 1,
                ...iconProps?.sx,
              }}
            />
          )}
          <Typography variant="h5" {...titleLabelProps} flexGrow={1}>
            {title}
          </Typography>
          {iconPosition === 'end' && (
            <ExpandIcon
              expanded={open}
              sx={{
                marginLeft: 1,
                ...iconProps?.sx,
              }}
            />
          )}
        </Box>
      ) : isValidElement(title) ? (
        cloneElement(title, {
          ...titleProps,
          onClick: handleToggle(title?.props?.onClick),
        })
      ) : (
        <Box
          {...titleProps}
          role="button"
          tabIndex={0}
          onClick={handleToggle(titleProps?.onClick)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            cursor: 'pointer',
            ':hover': {
              backgroundColor: 'action.hover',
            },
            ...titleProps?.sx,
          }}
        >
          {iconPosition === 'start' && (
            <ExpandIcon
              expanded={open}
              sx={{
                marginRight: 1,
                ...iconProps?.sx,
              }}
            />
          )}
          <Box {...titleLabelProps} flexGrow={1} />
          {iconPosition === 'end' && (
            <ExpandIcon
              expanded={open}
              sx={{
                marginLeft: 1,
                ...iconProps?.sx,
              }}
            />
          )}
        </Box>
      )}
      <Collapse in={open}>
        {typeof content === 'function' ? (
          content(open, handleToggle())
        ) : (
          <Box {...contentProps} sx={{ padding: 1, ...contentProps?.sx }}>
            {content}
          </Box>
        )}
      </Collapse>
    </Stack>
  );
};
