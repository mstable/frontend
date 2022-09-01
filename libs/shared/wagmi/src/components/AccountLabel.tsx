import { MiddleTruncated } from '@frontend/shared-ui';
import {
  Avatar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';

import type { AvatarProps, StackProps, TypographyProps } from '@mui/material';

export type AccountLabelProps = {
  responsive?: boolean;
  namePlaceholder?: string;
  components?: {
    container?: StackProps;
    avatar?: AvatarProps;
    name?: TypographyProps;
  };
};

export const AccountLabel = ({
  responsive = true,
  namePlaceholder,
  components,
}: AccountLabelProps) => {
  const theme = useTheme();
  const wide = useMediaQuery(theme.breakpoints.up('sm'));
  const { address } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  const { data: ensName } = useEnsName({ address: address });

  if (!address) {
    return null;
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      width={1}
      maxWidth={1}
      {...components?.container}
    >
      {ensAvatar ? (
        <Avatar
          {...components?.avatar}
          src={ensAvatar}
          alt="ENS Avatar"
          sx={{ width: 24, height: 24, ...components?.avatar?.sx }}
        />
      ) : (
        <Avatar
          {...components?.avatar}
          alt="ENS Avatar"
          sx={{ width: 24, height: 24, ...components?.avatar?.sx }}
        >
          <Jazzicon
            diameter={components?.avatar?.sx['width'] ?? 24}
            seed={jsNumberForAddress(address)}
          />
        </Avatar>
      )}
      {(wide || !responsive) &&
        (ensName ? (
          <Typography {...components?.name} noWrap>
            {ensName}
          </Typography>
        ) : namePlaceholder ? (
          <Typography {...components?.name} noWrap>
            {namePlaceholder}
          </Typography>
        ) : (
          <MiddleTruncated
            typographyProps={{
              ...components?.name,
              sx: {
                fontFamily: ['PT Mono', 'monospace'].join(','),
                ...components?.name?.sx,
              },
            }}
          >
            {address}
          </MiddleTruncated>
        ))}
    </Stack>
  );
};
