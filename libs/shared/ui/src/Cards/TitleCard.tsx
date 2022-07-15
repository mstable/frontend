import { Box, Divider, Stack, Typography } from '@mui/material';

import type { BoxProps, StackProps, TypographyProps } from '@mui/material';
import type { ReactNode } from 'react';

export type TitleCardProps = {
  title: string;
  titleAction?: ReactNode;
  components?: {
    container?: BoxProps;
    title?: TypographyProps;
    titleContainer?: StackProps;
    footerContainer?: BoxProps;
  };
  children?: ReactNode;
  footer?: ReactNode;
};

export const TitleCard = ({
  title,
  titleAction,
  components,
  children,
  footer,
}: TitleCardProps) => (
  <Stack
    direction="column"
    py={2}
    borderRadius="12px"
    border={(theme) => `1px solid ${theme.palette.divider}`}
    width={1}
    height={1}
    bgcolor="background.paper"
    {...components?.container}
  >
    <Stack direction="column" px={3} flexGrow={1}>
      <Stack
        direction="row"
        alignItems="center"
        {...components?.titleContainer}
      >
        <Typography variant="h4" mb={3} flexGrow={1} {...components?.title}>
          {title}
        </Typography>
        {titleAction}
      </Stack>
      {children}
    </Stack>
    {footer && (
      <>
        <Divider sx={{ pt: 2 }} />
        <Box px={3} pt={2} {...components?.footerContainer}>
          {footer}
        </Box>
      </>
    )}
  </Stack>
);
