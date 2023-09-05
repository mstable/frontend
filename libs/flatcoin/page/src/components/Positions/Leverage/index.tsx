import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useFlatcoin } from '../../../state';
import { LeveragePositionsTable } from './LeveragePositionsTable';

import type { StackProps } from '@mui/material';
import type { FC } from 'react';

export const LeveragePositions: FC<StackProps> = (props) => {
  const intl = useIntl();
  const { leveragedPositions } = useFlatcoin();

  if (!leveragedPositions.length) return null;

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      width={1}
      height={1}
      {...props}
    >
      <Typography variant="h3" pb={2}>
        {intl.formatMessage({
          defaultMessage: 'Leveraged Positions',
          id: 'AlCWDq',
        })}
      </Typography>
      <LeveragePositionsTable />
    </Stack>
  );
};
