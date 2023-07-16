import { useState } from 'react';

import { CollapsibleSection } from '@frontend/shared-ui';
import {
  Card,
  CardContent,
  CardHeader,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';

import { useVault } from '../../state';
import { Assets } from './components/Assets';
import { Fees } from './components/Fees';
import { Strategies } from './components/Strategies';

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
  const { meta } = useVault();
  const [openingSectionIndex, setOpenningSectionIndex] = useState(-1);

  const collapseSections = [
    {
      title: intl.formatMessage({
        defaultMessage: 'Strategy',
        id: 'zGHadw',
      }),
      subtitle: intl.formatMessage({
        defaultMessage: 'Vault strategy pipeline.',
        id: 'fhnmhR',
      }),
      component: <Strategies />,
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
        />
        <CardContent sx={{ paddingLeft: 0 }}>
          <Typography mb={2} color="text.secondary">
            {meta.description}{' '}
            {meta?.descriptionLink && (
              <Link
                href={meta.descriptionLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more.
              </Link>
            )}
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
    </>
  );
};
