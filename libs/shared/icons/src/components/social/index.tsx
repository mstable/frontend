import { SvgIcon } from '@mui/material';

import { ReactComponent as DiscordSvg } from './discord.svg';
import { ReactComponent as EmailSvg } from './email.svg';
import { ReactComponent as GithubSvg } from './github.svg';
import { ReactComponent as MediumSvg } from './medium.svg';
import { ReactComponent as TwitterSvg } from './twitter.svg';

import type { SvgIconProps } from '@mui/material';

export const Discord = (props: SvgIconProps) => (
  <SvgIcon {...props} component={DiscordSvg} viewBox="0 0 71 55" />
);

export const Email = (props: SvgIconProps) => (
  <SvgIcon {...props} component={EmailSvg} viewBox="0 0 1000 1000" />
);

export const Github = (props: SvgIconProps) => (
  <SvgIcon {...props} component={GithubSvg} viewBox="0 0 24 24" />
);

export const Medium = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MediumSvg} viewBox="0 0 24 24" />
);

export const Twitter = (props: SvgIconProps) => (
  <SvgIcon {...props} component={TwitterSvg} inheritViewBox />
);
