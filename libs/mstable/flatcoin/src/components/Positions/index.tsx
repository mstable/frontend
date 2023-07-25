import type { StackProps } from '@mui/material';
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';
import { useFlatcoin } from '../../state';
import { PositionType } from 'libs/mstable/flatcoin/src/types';

export const Positions = (props: StackProps) => {
  const intl = useIntl();
  const { positions } = useFlatcoin();

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      width={1}
      height={1}
      {...props}
    >
      <Typography variant="h3" pb={2}>
        {intl.formatMessage({ defaultMessage: 'Positions', id: 'hVxfnN' })}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {intl.formatMessage({
                  defaultMessage: 'Type',
                  id: '+U6ozc',
                })}
              </TableCell>
              <TableCell>
                {intl.formatMessage({
                  defaultMessage: 'Value',
                  id: 'GufXy5',
                })}
              </TableCell>
              <TableCell>
                {intl.formatMessage({
                  defaultMessage: 'Date Opened',
                  id: 'zQ9i1N',
                })}
              </TableCell>
              <TableCell>
                {intl.formatMessage({
                  defaultMessage: 'Position',
                  id: 'U6qGuO',
                })}
              </TableCell>
              <TableCell>
                {intl.formatMessage({
                  defaultMessage: 'Profit/Loss',
                  id: 'rfzzi6',
                })}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {positions.map(
              ({
                type,
                value,
                date,
                leverageMultiplier,
                liquidation,
                profitLossTotal,
                profitLossFunding,
              }) => (
                <TableRow
                  key={`${type}${date}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {type}
                  </TableCell>
                  <TableCell>{value}</TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell>
                    <Stack direction="column" alignItems="flex-start">
                      <span>
                        {leverageMultiplier
                          ? `${leverageMultiplier}x ${intl.formatMessage({
                              defaultMessage: 'leverage',
                              id: 'pVeGn/',
                            })}`
                          : null}
                      </span>
                      <span>
                        {liquidation
                          ? `${liquidation} ${intl.formatMessage({
                              defaultMessage: 'liquidation',
                              id: 'KoFhQ1',
                            })}`
                          : null}
                      </span>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="column" alignItems="flex-start">
                      <span>
                        {profitLossTotal}{' '}
                        {intl.formatMessage({
                          defaultMessage: 'total',
                          id: 'aTf36y',
                        })}
                      </span>
                      <span>
                        {profitLossFunding}{' '}
                        {intl.formatMessage({
                          defaultMessage: 'funding',
                          id: 'bMsoah',
                        })}
                      </span>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Button sx={{ minWidth: 92 }}>
                      {intl
                        .formatMessage(
                          type === PositionType.Flatcoin
                            ? { defaultMessage: 'redeem', id: 'XSdWHA' }
                            : { defaultMessage: 'close', id: 'rbrahO' },
                        )
                        .toUpperCase()}
                    </Button>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
