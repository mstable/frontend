import { useState } from 'react';

import { DiagramStrategy } from '@frontend/mstable-shared-ui';
import { CollapsibleSection, Dialog } from '@frontend/shared-ui';
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
import { Allocations } from './components/Allocations';
import { Assets } from './components/Assets';
import { Contracts } from './components/Contracts';
import { Fees } from './components/Fees';
import { Protocols } from './components/Protocols';

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
  const [openingSectionIndex, setOpenningSectionIndex] = useState(-1);
  const [showStrategy, setShowStrategy] = useState(false);

  const collapseSections = [
    {
      title: intl.formatMessage({
        defaultMessage: 'Allocations',
        id: 'YYu/aL',
      }),
      subtitle: intl.formatMessage({
        defaultMessage: 'Allocations of deposited funds in underlying vaults',
        id: 'bfACwi',
      }),
      component: <Allocations />,
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Protocols', id: 'zFNxtv' }),
      subtitle: intl.formatMessage({
        defaultMessage: 'Protocols that are used by this vault.',
        id: '7jeKkk',
      }),
      component: <Protocols />,
    },
    {
      title: intl.formatMessage({
        defaultMessage: 'Contracts',
        id: 'ZwpbZp',
      }),
      subtitle: intl.formatMessage({
        defaultMessage:
          'Vault contract and underlying vaults that are utilized.',
        id: '3Dvp3q',
      }),
      component: <Contracts />,
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Fees', id: 'qZbedW' }),
      subtitle: intl.formatMessage({
        defaultMessage: 'Fees that are charged by this vault.',
        id: 'Pk6qK4',
      }),
      component: <Fees />,
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Assets', id: 'd1uESJ' }),
      subtitle: intl.formatMessage({
        defaultMessage: 'Assets that are used by this vault.',
        id: 'LDz7xI',
      }),
      component: <Assets />,
    },
  ];

  return (
    <>
      <Card
        elevation={0}
        sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 0 }}
      >
        <CardHeader
          title={intl.formatMessage({
            defaultMessage: 'Strategy & Risks',
            id: '9RAHhM',
          })}
          sx={{ paddingLeft: 0 }}
          action={
            <Button
              color="secondary"
              onClick={() => {
                setShowStrategy(true);
              }}
            >
              {intl.formatMessage({
                defaultMessage: 'Visualize Strategy',
                id: '3QSP9N',
              })}
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
      {showStrategy && (
        <Dialog
          open
          fullWidth
          maxWidth="lg"
          onClose={() => {
            setShowStrategy(false);
          }}
          title={intl.formatMessage({
            defaultMessage: 'Visualize strategy',
            id: 'u7a5FI',
          })}
          content={
            <DiagramStrategy
              onClose={() => {
                setShowStrategy(false);
              }}
            />
          }
        />
      )}
    </>
  );
};
