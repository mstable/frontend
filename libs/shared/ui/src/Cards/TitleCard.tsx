import { Box, Divider, Paper, Stack, Typography } from '@mui/material';

import type {
  BoxProps,
  PaperProps,
  StackProps,
  TypographyProps,
} from '@mui/material';
import type { ReactNode } from 'react';

export type TitleCardProps = {
  title: string;
  titleAction?: ReactNode;
  components?: {
    container?: PaperProps;
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
  <Paper
    elevation={1}
    {...components?.container}
    sx={{
      py: 2,
      borderRadius: '12px',
      border: (theme) => `1px solid ${theme.palette.divider}`,
      ...components?.container?.sx,
    }}
  >
    <Stack direction="column">
      <Stack px={3} direction="column" flexGrow={1}>
        <Stack
          direction="row"
          alignItems="center"
          mb={3}
          {...components?.titleContainer}
        >
          <Typography variant="h4" flexGrow={1} {...components?.title}>
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
  </Paper>
);
