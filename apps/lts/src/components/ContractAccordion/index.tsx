import { useEffect } from 'react';

import { CollapsibleSection } from '@frontend/shared-ui';
import { Stack } from '@mui/material';
import { defineMessage, useIntl } from 'react-intl';
import { usePrevious } from 'react-use';
import { useAccount } from 'wagmi';

import { ContractList } from './components/ContractList';
import {
  FlagsProvider,
  useFlags,
  useSetAllFlags,
  useToggleFlag,
} from './state';

import type { ContractType } from '@frontend/lts-constants';
import type { StackProps } from '@mui/material';

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
  const flags = useFlags();
  const { isConnected, address } = useAccount();
  const prevAddress = usePrevious(address);
  const toggleFlag = useToggleFlag();
  const setAllFlags = useSetAllFlags();

  useEffect(() => {
    if (!isConnected || prevAddress !== address) {
      setAllFlags(false);
    }
  }, [address, isConnected, prevAddress, setAllFlags]);

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
          open={flags[cat]}
          onToggle={() => {
            toggleFlag(cat);
          }}
          iconPosition="end"
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
          <ContractList contractType={cat} />
        </CollapsibleSection>
      ))}
    </Stack>
  );
};

export const ContractAccordion = (props: StackProps) => (
  <FlagsProvider>
    <ContractAccordionWrapped {...props} />
  </FlagsProvider>
);
