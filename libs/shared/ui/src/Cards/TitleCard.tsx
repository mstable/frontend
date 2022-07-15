import { Box, Divider, Stack, Typography } from '@mui/material';

import type { BoxProps, TypographyProps } from '@mui/material';
import type { ReactNode } from 'react';

export type TitleCardProps = {
  title?: string;
  components?: {
    container?: BoxProps;
    title?: TypographyProps;
    footerContainer?: BoxProps;
  };
  children?: ReactNode;
  footer?: ReactNode;
};

export const TitleCard = ({
  title,
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
      {title && (
        <Typography variant="h4" mb={3} {...components?.title}>
          {title}
        </Typography>
      )}
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
