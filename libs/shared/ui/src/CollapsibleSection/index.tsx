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
  children:
    | ReactNode
    | ((open: boolean, onToggle: (event?: MouseEvent) => void) => ReactNode);
  defaultOpen?: boolean;
  iconPosition?: 'start' | 'end' | 'none';
  components?: {
    container?: StackProps;
    titleContainer?: BoxProps;
    titleLabel?: TypographyProps;
    childrenContainer?: BoxProps;
    icon?: SvgIconProps;
  };
};

export const CollapsibleSection = ({
  title,
  children,
  iconPosition = 'start',
  defaultOpen = false,
  components,
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
    <Stack direction="column" {...components?.container}>
      {typeof title === 'function' ? (
        title(open, handleToggle())
      ) : ['string', 'number'].includes(typeof title) ? (
        <Box
          {...components?.titleContainer}
          role="button"
          tabIndex={0}
          onClick={handleToggle(components?.titleContainer?.onClick)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            py: 1,
            cursor: 'pointer',
            ':hover': {
              backgroundColor: 'action.hover',
            },
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
          <Typography variant="h5" {...components?.titleLabel} flexGrow={1}>
            {title}
          </Typography>
          {iconPosition === 'end' && (
            <ExpandIcon
              expanded={open}
              sx={{
                marginLeft: 1,
                ...components?.icon?.sx,
              }}
            />
          )}
        </Box>
      ) : isValidElement(title) ? (
        cloneElement(title, {
          ...components?.titleContainer,
          onClick: handleToggle(title?.props?.onClick),
        })
      ) : (
        <Box
          {...components?.titleContainer}
          role="button"
          tabIndex={0}
          onClick={handleToggle(components?.titleContainer?.onClick)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            cursor: 'pointer',
            ':hover': {
              backgroundColor: 'action.hover',
            },
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
          <Box {...components?.titleLabel} flexGrow={1} />
          {iconPosition === 'end' && (
            <ExpandIcon
              expanded={open}
              sx={{
                marginLeft: 1,
                ...components?.icon?.sx,
              }}
            />
          )}
        </Box>
      )}
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
