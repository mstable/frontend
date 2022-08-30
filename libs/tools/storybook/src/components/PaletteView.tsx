import { Box, Stack, Typography } from '@mui/material';

import type { BoxProps, StackProps, Theme } from '@mui/material';

const isColor = (value: unknown) =>
  typeof value === 'string' && value.match(/^(#|rgba?)/);

const isContrastText = (key: string) => key === 'contrastText';

type ColorChipProps = {
  col: string;
  bkg?: string;
} & BoxProps;

const ColorChip = ({ col, bkg, ...rest }: ColorChipProps) => (
  <Box
    {...rest}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: bkg ?? col,
      height: 60,
      width: 60,
      borderRadius: '50%',
      boxShadow: 1,
      ...rest?.sx,
    }}
  >
    {bkg && (
      <Typography sx={{ color: col, fontSize: 32, fontWeight: 'bold' }}>
        T
      </Typography>
    )}
  </Box>
);

type ColorCardProps = { col: string; bkg?: string; name: string } & StackProps;

const ColorCard = ({ col, bkg, name, ...rest }: ColorCardProps) => (
  <Stack
    {...rest}
    direction="column"
    spacing={1}
    sx={{
      padding: 1,
      border: 1,
      borderRadius: 1,
      width: 160,
      alignItems: 'center',
      ...rest?.sx,
    }}
  >
    <ColorChip col={col} bkg={bkg} />
    <Stack direction="column" spacing={1} width={1} overflow="hidden">
      <Typography noWrap variant="label2">
        {name}
      </Typography>
      <Typography noWrap variant="value5">
        {col}
      </Typography>
    </Stack>
  </Stack>
);

type ColorRowProps = {
  cols: Record<string, string>;
  name: string;
} & StackProps;

const ColorRow = ({ cols, name, ...rest }: ColorRowProps) => (
  <Stack {...rest} direction="row" spacing={2} sx={{ ...rest?.sx }}>
    <Typography width={160} variant="h4">
      {name}
    </Typography>
    {Object.entries(cols)
      .filter(([key, val]) => isColor(val))
      .map(([key, val]) => (
        <ColorCard
          key={`${name}-${key}`}
          col={val}
          name={key}
          bkg={isContrastText(key) ? cols['main'] : undefined}
        />
      ))}
  </Stack>
);

export type PaletteViewProps = { theme: Theme } & StackProps;

export const PaletteView = ({ theme, ...rest }: PaletteViewProps) => (
  <Stack
    {...rest}
    direction="column"
    spacing={2}
    sx={{ ...rest?.sx, alignItems: 'flex-start' }}
  >
    {Object.entries(theme.palette)
      .filter(([, val]) => isColor(val) || typeof val === 'object')
      .map(([key, val]) =>
        typeof val === 'string' ? (
          <ColorCard key={key} col={val} name={key} />
        ) : (
          <ColorRow key={key} cols={val} name={key} />
        ),
      )}
  </Stack>
);
