import { Box, Divider, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const GasImpact = ({
  profitOrLoss,
  gasFee,
  daysTillProfitable,
}: {
  profitOrLoss: number;
  gasFee: number;
  daysTillProfitable: number;
}) => {
  const intl = useIntl();
  const gasImpact = gasFee / profitOrLoss || 0;
  return (
    <Box display="flex" mt={2}>
      <Divider orientation="vertical" />
      <Box ml={2} flex={1}>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography
            color={(theme) =>
              gasImpact ? theme.palette.text.secondary : theme.palette.grey[300]
            }
            variant="label2"
          >
            {intl.formatMessage({ defaultMessage: 'Gas Impact', id: 'eO0C1d' })}
          </Typography>
          <Typography
            color={(theme) =>
              gasImpact ? theme.palette.text.primary : theme.palette.grey[300]
            }
            variant="value5"
          >
            {intl.formatNumber(gasImpact, { style: 'percent' })}
          </Typography>
        </Box>
        <Box
          my={1.5}
          height={4}
          bgcolor={(theme) =>
            gasImpact
              ? theme.palette.primary.main
              : theme.palette.background.highlight
          }
          borderRadius={2}
          overflow="hidden"
        >
          <Box
            height={4}
            bgcolor={(theme) => theme.palette.error.main}
            width={intl.formatNumber(Math.min(1, gasImpact), {
              style: 'percent',
            })}
          />
        </Box>
        <Box display="flex" alignItems="center" mb={3}>
          <Box
            bgcolor={(theme) => theme.palette.primary.main}
            width={8}
            height={8}
            borderRadius={4}
            mr={0.5}
          />
          <Typography
            color={(theme) =>
              gasImpact ? theme.palette.text.primary : theme.palette.grey[300]
            }
            variant="hint"
          >
            {intl.formatMessage({ defaultMessage: 'Return', id: '0WJNP/' })}
          </Typography>
          <Box
            bgcolor={(theme) => theme.palette.error.main}
            width={8}
            height={8}
            borderRadius={4}
            ml={2}
            mr={0.5}
          />
          <Typography
            color={(theme) =>
              gasImpact ? theme.palette.text.primary : theme.palette.grey[300]
            }
            variant="hint"
          >
            {intl.formatMessage({ defaultMessage: 'Gas Impact', id: 'eO0C1d' })}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography
            color={(theme) =>
              gasImpact ? theme.palette.text.secondary : theme.palette.grey[300]
            }
            variant="label2"
          >
            {intl.formatMessage({
              defaultMessage: 'Profitable position after',
              id: '93OUn6',
            })}
          </Typography>
          <Typography
            color={(theme) =>
              gasImpact ? theme.palette.text.primary : theme.palette.grey[300]
            }
            variant="value5"
          >
            {intl.formatMessage(
              { defaultMessage: '{days} Days', id: 'MgN8gK' },
              { days: Math.ceil(daysTillProfitable || 0) },
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
