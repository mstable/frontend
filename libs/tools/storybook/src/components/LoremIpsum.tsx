import { Typography } from '@mui/material';

import type { TypographyProps } from '@mui/material';

export const lorem = `Lorem ipsum dolor sit amet`;

export const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export const LoremIpsum = (props: TypographyProps) => (
  <Typography {...props}>{loremIpsum}</Typography>
);

export const Lorem = (props: TypographyProps) => (
  <Typography {...props}>{lorem}</Typography>
);
