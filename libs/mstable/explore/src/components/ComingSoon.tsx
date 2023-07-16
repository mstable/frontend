import { TokenIconRevamp } from '@frontend/shared-ui';
import { alpha, Stack, Typography } from '@mui/material';
import { mergeDeepRight } from 'ramda';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export type ComingSoonCardProps = {
  index: number;
} & StackProps;

export const ComingSoonCard = ({ index, ...rest }: ComingSoonCardProps) => {
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
            index % 2 === 0 ? 'rgb(98, 132, 234)' : 'rgb(0, 153, 204)',
            0.2,
          )} 0%, ${alpha(theme.palette.background.default, 0.4)} 100%)`,
          border: `1px solid ${theme.palette.background.highlight}`,
          boxShadow: 1,
        })
      }
    >
      <TokenIconRevamp
        symbols={['placeholder']}
        sx={{ height: 35, width: 35 }}
      />
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Coming Soon', id: 'LiHQih' })}
      </Typography>
    </Stack>
  );
};
