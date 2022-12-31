import { TokenIcon } from '@frontend/shared-ui';
import { alpha, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { mergeDeepRight } from 'ramda';
import { useIntl } from 'react-intl';

import type { StackProps, TableRowProps } from '@mui/material';

export type ComingSoonCardProps = {
  token: string;
} & StackProps;

const comingSoon = {
  mveth: {
    color: 'rgb(98, 132, 234)',
  },
  mvfrax: {
    color: 'rgb(0, 0, 0)',
  },
};

export const ComingSoonCard = ({ token, ...rest }: ComingSoonCardProps) => {
  const intl = useIntl();

  return (
    <Stack
      {...rest}
      justifyContent="center"
      alignItems="center"
      minHeight={{ xs: 400, sm: 500, md: 440 }}
      sx={(theme) =>
        mergeDeepRight(rest?.sx, {
          width: 1,
          height: 1,

          borderRadius: 2,
          background: `linear-gradient(180deg, ${alpha(
            comingSoon[token].color,
            0.2,
          )} 0%, ${alpha(theme.palette.background.default, 0.4)} 100%)`,
          border: `1px solid ${theme.palette.background.highlight}`,
          boxShadow: 1,
        })
      }
    >
      <TokenIcon symbol={token} sx={{ height: 53, width: 53 }} />
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Coming Soon', id: 'LiHQih' })}
      </Typography>
    </Stack>
  );
};

export type ComingSoonRowProps = { token: string } & TableRowProps;

export const ComingSoonRow = ({ token, ...rest }: ComingSoonRowProps) => {
  const intl = useIntl();

  return (
    <TableRow
      {...rest}
      sx={{ backgroundColor: 'background.hihglight', ...rest?.sx }}
    >
      <TableCell>
        <TokenIcon symbol={token} sx={{ height: 32, width: 32 }} />
      </TableCell>
      <TableCell colSpan={6}>
        <Typography variant="value4">
          {intl.formatMessage({ defaultMessage: 'Coming Soon', id: 'LiHQih' })}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
