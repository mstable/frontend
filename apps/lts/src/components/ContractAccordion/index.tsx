import { useEffect, useState } from 'react';

import { CollapsibleSection } from '@frontend/shared-ui';
import { Stack } from '@mui/material';
import { remove } from 'ramda';
import { defineMessage, useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { ContractList } from './components/ContractList';

import type { ContractType } from '@frontend/lts-constants';
import type { CollapsibleSectionProps } from '@frontend/shared-ui';
import type { StackProps } from '@mui/material';

const categories: ContractType[] = [
  'save',
  'pool',
  'vault',
  'legacypool',
  'metavault',
];

const collapsibleProps: Partial<CollapsibleSectionProps> = {
  iconPosition: 'end',
  sx: (theme) => ({
    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }),
  components: {
    titleContainer: {
      paddingX: 2,
      paddingY: 4,
    },
    childrenContainer: {
      sx: {
        padding: 2,
      },
    },
  },
};

const getTitle = (cat: ContractType) =>
  ({
    save: defineMessage({ defaultMessage: 'Save', id: 'jvo0vs' }),
    pool: defineMessage({ defaultMessage: 'Feeder Pools', id: 'sk4xVe' }),
    vault: defineMessage({ defaultMessage: 'Vaults', id: 's2zphO' }),
    legacypool: defineMessage({ defaultMessage: 'Legacy Pools', id: 'cA+gxG' }),
    metavault: defineMessage({ defaultMessage: 'Meta Vaults', id: 'SRo6uF' }),
  }[cat]);

export const ContractAccordion = (props: StackProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [sel, setSel] = useState<ContractType[]>(isConnected ? categories : []);

  useEffect(() => {
    setSel(isConnected ? categories : []);
  }, [isConnected]);

  const handleToggle = (ct: ContractType) => () => {
    setSel((prev) => {
      if (!isConnected) return prev;
      const idx = prev.indexOf(ct);
      if (idx > -1) {
        return remove(idx, 1, prev);
      } else {
        return [...prev, ct];
      }
    });
  };

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
          {...collapsibleProps}
          key={cat}
          title={intl.formatMessage(getTitle(cat))}
          open={sel.includes(cat)}
          onToggle={handleToggle(cat)}
        >
          <ContractList contractType={cat} />
        </CollapsibleSection>
      ))}
    </Stack>
  );
};
