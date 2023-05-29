import { useCryptoIcon } from '@frontend/shared-hooks';
import { Avatar, Stack } from '@mui/material';

import type { AvatarProps } from '@mui/material';
import type { FC } from 'react';

type TokenIconProps = {
  symbols: string[];
} & AvatarProps;

export const TokenIconRevamp: FC<TokenIconProps> = ({ symbols, ...rest }) => {
  const icons = useCryptoIcon(symbols);

  if (!icons?.length || !icons[0]) return null;

  if (icons.length === 1) {
    return (
      <Avatar
        {...rest}
        sx={{ fontSize: 24, ...rest?.sx }}
        src={icons[0]}
        alt={symbols[0]}
      ></Avatar>
    );
  }

  return (
    <Stack direction="row">
      {icons.map((icon, index) => (
        <Avatar
          key={index}
          src={icon}
          alt={symbols[index]}
          {...rest}
          sx={{
            fontSize: 24,
            marginLeft: index === 0 ? '0' : '-0.5rem',
            ...rest?.sx,
          }}
        />
      ))}
    </Stack>
  );
};
