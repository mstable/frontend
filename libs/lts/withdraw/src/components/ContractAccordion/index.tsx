import { useSettings } from '@frontend/lts-settings';
import { CollapsibleSection, MotionStack } from '@frontend/shared-ui';
import { isNilOrEmpty } from '@frontend/shared-utils';
import { Stack } from '@mui/material';
import { constants } from 'ethers';
import { filter, groupBy, pipe, prop } from 'ramda';
import { defineMessage, useIntl } from 'react-intl';
import { useAccount } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';

import { ContractList } from './components/ContractList';
import { NetworkSwitch } from './components/NetworkSwitch';
import { Provider, useTrackedState } from './state';

import type { ContractType } from '@frontend/lts-constants';
import type { MotionStackProps } from '@frontend/shared-ui';

import type { LTSContract } from './types';

const categories: Record<number, ContractType[]> = {
  [mainnet.id]: [
    'stable',
    'save',
    'pool',
    'vault',
    'legacypool',
    'governance',
    'metavault',
  ],
  [polygon.id]: ['stable', 'save', 'pool', 'vault'],
};

const getTitle = (cat: ContractType) =>
  ({
    stable: defineMessage({ defaultMessage: 'mAssets', id: '8q2nwN' }),
    save: defineMessage({ defaultMessage: 'Save', id: 'jvo0vs' }),
    pool: defineMessage({ defaultMessage: 'Feeder Pools', id: 'sk4xVe' }),
    vault: defineMessage({ defaultMessage: 'Vaults', id: 's2zphO' }),
    legacypool: defineMessage({ defaultMessage: 'Legacy Pools', id: 'cA+gxG' }),
    governance: defineMessage({
      defaultMessage: 'MTA Governance',
      id: 'yzP6XU',
    }),
    metavault: defineMessage({ defaultMessage: 'Meta Vaults', id: 'SRo6uF' }),
  }[cat]);

const ContractAccordionWrapped = (props: MotionStackProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const { showEmpty } = useSettings();
  const { contracts, chainId } = useTrackedState();

  const display = pipe(
    filter<LTSContract>(
      (c) =>
        (showEmpty || c.balance.gt(constants.Zero)) &&
        c.chainId === chainId &&
        isConnected,
    ),
    groupBy<LTSContract, ContractType>(prop('type')),
  )(contracts);

  return (
    <MotionStack {...props}>
      <Stack justifyContent="center" alignItems="center" py={4}>
        <NetworkSwitch />
      </Stack>
      <Stack
        direction="column"
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          ...props?.sx,
        }}
      >
        {categories[chainId]?.map((cat) => (
          <CollapsibleSection
            key={cat}
            title={intl.formatMessage(getTitle(cat))}
            subtitle={
              isConnected
                ? intl.formatMessage(
                    {
                      defaultMessage:
                        '{gtBal, plural, =0 {No Balance} =1 {# Item} other {# Items}}',
                      id: 'hk3oTU',
                    },
                    { gtBal: display[cat]?.length ?? 0 },
                  )
                : ''
            }
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
                ...(!display[cat] && {
                  color: 'text.secondary',
                }),
              },
              subtitle: {
                pt: 0.5,
                color: 'text.primary',
                ...(!display[cat] && {
                  color: 'text.secondary',
                }),
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
    </MotionStack>
  );
};

export const ContractAccordion = (props: MotionStackProps) => (
  <Provider>
    <ContractAccordionWrapped {...props} />
  </Provider>
);
