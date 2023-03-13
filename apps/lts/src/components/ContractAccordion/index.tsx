import { useSettings } from '@frontend/lts-settings';
import { CollapsibleSection } from '@frontend/shared-ui';
import { isNilOrEmpty } from '@frontend/shared-utils';
import { Stack } from '@mui/material';
import { constants } from 'ethers';
import { filter, groupBy, pipe, prop } from 'ramda';
import { defineMessage, useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { ContractList } from './components/ContractList';
import { Provider, useTrackedState } from './state';

import type { ContractType } from '@frontend/lts-constants';
import type { StackProps } from '@mui/material';

import type { LTSContract } from './types';

const categories: ContractType[] = [
  'stable',
  'save',
  'pool',
  'vault',
  'legacypool',
  'metavault',
];

const getTitle = (cat: ContractType) =>
  ({
    stable: defineMessage({ defaultMessage: 'Stables', id: 'nt8uTP' }),
    save: defineMessage({ defaultMessage: 'Save', id: 'jvo0vs' }),
    pool: defineMessage({ defaultMessage: 'Feeder Pools', id: 'sk4xVe' }),
    vault: defineMessage({ defaultMessage: 'Vaults', id: 's2zphO' }),
    legacypool: defineMessage({ defaultMessage: 'Legacy Pools', id: 'cA+gxG' }),
    metavault: defineMessage({ defaultMessage: 'Meta Vaults', id: 'SRo6uF' }),
  }[cat]);

const ContractAccordionWrapped = (props: StackProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const { showEmpty, chain } = useSettings();
  const contracts = useTrackedState();

  const display = pipe(
    filter<LTSContract>(
      (c) =>
        (showEmpty || c.balance.gt(constants.Zero)) &&
        c.chain === chain &&
        isConnected,
    ),
    groupBy<LTSContract, ContractType>(prop('type')),
  )(contracts);

  return (
    <Stack
      direction="column"
      {...props}
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        ...props?.sx,
      }}
    >
      {categories.map((cat) => (
        <CollapsibleSection
          key={cat}
          title={intl.formatMessage(getTitle(cat))}
          open={!isNilOrEmpty(display[cat])}
          iconPosition="none"
          sx={(theme) => ({
            '&:not(:last-of-type)': {
              borderBottom: `1px solid ${theme.palette.divider}`,
            },
          })}
          components={{
            titleContainer: {
              paddingX: 2,
              paddingY: 3,
            },
            childrenContainer: {
              sx: {
                padding: 2,
              },
            },
          }}
        >
          <ContractList contracts={display[cat]} />
        </CollapsibleSection>
      ))}
    </Stack>
  );
};

export const ContractAccordion = (props: StackProps) => (
  <Provider>
    <ContractAccordionWrapped {...props} />
  </Provider>
);
