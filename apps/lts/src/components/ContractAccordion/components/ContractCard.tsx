import { AddressLabel, CountUp } from '@frontend/shared-ui';
import { BigDecimal } from '@frontend/shared-utils';
import { alpha, Button, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useNavigate } from '@tanstack/react-location';
import { constants } from 'ethers';
import { propEq } from 'ramda';
import { useIntl } from 'react-intl';
import { mainnet, useNetwork } from 'wagmi';

import type { Grid2Props, StackProps } from '@mui/material';

import type { LTSRoute } from '../../../routes';
import type { LTSContract } from '../types';

export type ContractCardProps = {
  contract: LTSContract;
} & Grid2Props;

const rowProps: StackProps = {
  width: 1,
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const ContractCard = ({ contract, ...rest }: ContractCardProps) => {
  const intl = useIntl();
  const navigate = useNavigate<LTSRoute>();
  const { chains } = useNetwork();
  const contractChain = chains.find(propEq('id', contract.chain)) ?? mainnet;
  const blockExplorer = contractChain.blockExplorers.default;

  return (
    <Grid2 {...rest}>
      <Stack
        direction="column"
        spacing={3}
        sx={{
          p: 2,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: (theme) =>
            alpha(theme.palette.background.highlight, 0.5),
          borderRadius: 1,
        }}
      >
        <Stack {...rowProps}>
          <Stack direction="row" spacing={2} alignItems="center" {...rest}>
            <contract.icon sx={{ width: 44, height: 44 }} />
            <Stack>
              <Typography fontWeight="bold">{contract.name}</Typography>
              <AddressLabel
                address={contract.address}
                small
                link
                maxWidth={120}
                blockExplorerUrl={blockExplorer.url}
              />
            </Stack>
          </Stack>
          <CountUp
            variant="value4"
            duration={1}
            end={
              new BigDecimal(contract.balance, contract.token?.decimals).simple
            }
            suffix={contract.token?.symbol}
            maxWidth={250}
            noWrap
          />
        </Stack>
        {contract.balance.gt(constants.Zero) && (
          <Button
            onClick={() => {
              navigate({ search: { address: `"${contract.address}"` } });
            }}
          >
            {intl.formatMessage({
              defaultMessage: 'Exit Position',
              id: 'hPs6J+',
            })}
          </Button>
        )}
      </Stack>
    </Grid2>
  );
};
