import {
  DHEDGE,
  DISCORD,
  EMAIL,
  GITHUB,
  MEDIUM,
  TWITTER,
} from '@frontend/shared-constants';
import { Discord, Email, Github, Twitter } from '@frontend/shared-icons';
import { useLogAnalyticsEvent } from '@frontend/shared-providers';
import { IconButton, Link, Stack, Typography } from '@mui/material';
import { MediumLogo } from 'phosphor-react';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const Footer = (props: StackProps) => {
  const intl = useIntl();
  const logEvent = useLogAnalyticsEvent();

  const socialIcons = [
    {
      title: intl.formatMessage({ defaultMessage: 'Github', id: 'Vn76qV' }),
      icon: <Github />,
      href: GITHUB,
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Discord', id: 'FvmV6q' }),
      icon: <Discord />,
      href: DISCORD,
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Twitter', id: '8ywLSf' }),
      icon: <Twitter />,
      href: TWITTER,
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Medium', id: 'ovJ26C' }),
      icon: <MediumLogo size={24} weight="fill" />,
      href: MEDIUM,
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Email', id: 'sy+pv5' }),
      icon: <Email />,
      href: EMAIL,
    },
  ];

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      spacing={1.5}
      {...props}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        spacing={1.5}
      >
        <Typography>
          {intl.formatMessage({
            defaultMessage: '<strong>Yield app</strong> by mStable',
            id: 'EhET/Q',
          })}
        </Typography>
        <Link href={DHEDGE} underline="none" target="_blank" rel="noopener">
          <Typography>
            {intl.formatMessage({
              defaultMessage: 'Powered by <strong>dHEDGE</strong>',
              id: 'Ez6tQm',
            })}
          </Typography>
        </Link>
      </Stack>
      <Stack
        direction="row"
        flexGrow={1}
        justifyContent="flex-end"
        alignItems="center"
        spacing={0.5}
      >
        {socialIcons.map((social) => (
          <IconButton
            color="secondary"
            key={social.title}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              logEvent('footer_link_clicked', { link: social.title });
            }}
          >
            {social.icon}
          </IconButton>
        ))}
      </Stack>
    </Stack>
  );
};
