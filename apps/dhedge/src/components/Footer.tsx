import {
  DHEDGE_DISCORD,
  DHEDGE_GITHUB,
  DHEDGE_TWITTER,
} from '@frontend/shared-constants';
import { Discord, Github, Twitter } from '@frontend/shared-icons';
import { IconButton, Stack } from '@mui/material';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const Footer = (props: StackProps) => {
  const intl = useIntl();

  const socialIcons = [
    {
      title: intl.formatMessage({ defaultMessage: 'Github', id: 'Vn76qV' }),
      icon: <Github />,
      href: DHEDGE_GITHUB,
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Discord', id: 'FvmV6q' }),
      icon: <Discord />,
      href: DHEDGE_DISCORD,
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Twitter', id: '8ywLSf' }),
      icon: <Twitter />,
      href: DHEDGE_TWITTER,
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
          >
            {social.icon}
          </IconButton>
        ))}
      </Stack>
    </Stack>
  );
};
