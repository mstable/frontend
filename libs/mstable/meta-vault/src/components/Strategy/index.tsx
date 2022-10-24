import { useState } from 'react';

import { useShowDialog } from '@frontend/shared-modals';
import { CollapsibleSection } from '@frontend/shared-ui';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';

import { useMetavault } from '../../state';
import { Assets } from './components/Assets';
import { Fees } from './components/Fees';
import { Protocols } from './components/Protocols';
import { Vaults } from './components/Vaults';
import { VisualizeStrategyDialog } from './components/VisualizeStrategyDialog';

import type { CollapsibleSectionProps } from '@frontend/shared-ui';

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

export const Strategy = () => {
  const intl = useIntl();
  const { metavault } = useMetavault();
  const showDialog = useShowDialog();

  const handleVisualizeStrategyClick = () => {
    showDialog(VisualizeStrategyDialog);
  };

  const [openingSectionIndex, setOpenningSectionIndex] = useState(-1);

  const collapseSections = [
    {
      title: intl.formatMessage({ defaultMessage: 'Protocols' }),
      subtitle: intl.formatMessage({
        defaultMessage: 'Protocols that are used by this vault.',
      }),
      component: <Protocols />,
    },
    {
      title: intl.formatMessage({
        defaultMessage: 'Vault Contracts',
      }),
      subtitle: intl.formatMessage({
        defaultMessage: 'Underlying Vaults that are used by this vault.',
      }),
      component: <Vaults />,
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Fees' }),
      subtitle: intl.formatMessage({
        defaultMessage: 'Fees that are charged by this vault.',
      }),
      component: <Fees />,
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Assets' }),
      subtitle: intl.formatMessage({
        defaultMessage: 'Assets that are used by this vault.',
      }),
      component: <Assets />,
    },
  ];

  return (
    <Card
      elevation={0}
      sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 0 }}
    >
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Strategy & Risks' })}
        sx={{ paddingLeft: 0 }}
        action={
          <Button color="secondary" onClick={handleVisualizeStrategyClick}>
            {intl.formatMessage({ defaultMessage: 'Visualize Strategy' })}
          </Button>
        }
      />
      <CardContent sx={{ paddingLeft: 0 }}>
        <Typography mb={2} color="text.secondary">
          {metavault?.strategyDescription
            ? intl.formatMessage(metavault.strategyDescription)
            : ''}
        </Typography>
        <Stack
          direction="column"
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          {collapseSections.map((s, i) => (
            <CollapsibleSection
              {...collapsibleProps}
              key={s.title}
              open={openingSectionIndex === i}
              onToggle={() => {
                setOpenningSectionIndex((ci) => (ci === i ? -1 : i));
              }}
              title={s.title}
              subtitle={s.subtitle}
            >
              {s.component}
            </CollapsibleSection>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};
