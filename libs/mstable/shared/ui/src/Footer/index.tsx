import { Discord, Email, Github, Twitter } from '@frontend/shared-icons';
import { IconButton, Stack, Typography } from '@mui/material';
import { MediumLogo } from 'phosphor-react';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const Footer = (props: StackProps) => {
  const intl = useIntl();

  const socialIcons = [
    {
      title: intl.formatMessage({ defaultMessage: 'Github' }),
      icon: <Github />,
      href: 'https://github.com/mstable',
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Discord' }),
      icon: <Discord />,
      href: 'https://discord.gg/pgCVG7e',
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Twitter' }),
      icon: <Twitter />,
      href: 'https://twitter.com/mstable_',
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Medium' }),
      icon: <MediumLogo size={24} weight="fill" />,
      href: 'https://medium.com/mstable',
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Email' }),
      icon: <Email />,
      href: 'mailto:info@mstable.org',
    },
  ];

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      spacing={1.5}
      {...props}
    >
      <Typography>
        {intl.formatMessage({
          defaultMessage: '<strong>Meta Vaults</strong> by mStable',
        })}
      </Typography>
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
          >
            {social.icon}
          </IconButton>
        ))}
      </Stack>
    </Stack>
  );
};
