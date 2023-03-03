import { useState } from 'react';

import { CollapsibleSection } from '@frontend/shared-ui';
import { Stack } from '@mui/material';

import { ContractList } from './components/ContractList';

import type { ContractType } from '@frontend/lts-constants';
import type { CollapsibleSectionProps } from '@frontend/shared-ui';
import type { StackProps } from '@mui/material';

const categories: ContractType[] = ['musd', 'feederpool', 'mbtc', 'metavault'];

const collapsibleProps: Partial<CollapsibleSectionProps> = {
  iconPosition: 'end',
  sx: (theme) => ({
    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }),
  components: {
    titleContainer: {
      padding: 2,
    },
    childrenContainer: {
      sx: {
        padding: 2,
      },
    },
  },
};

export const ContractAccordion = (props: StackProps) => {
  const [sel, setSel] = useState<ContractType | 'null'>('feederpool');

  const handleToggle = (ct: ContractType) => () => {
    setSel((prev) => (prev === ct ? null : ct));
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
          title={cat}
          open={cat === sel}
          onToggle={handleToggle(cat)}
        >
          <ContractList contractType={cat} />
        </CollapsibleSection>
      ))}
    </Stack>
  );
};
