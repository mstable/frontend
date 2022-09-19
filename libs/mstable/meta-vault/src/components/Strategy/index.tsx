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

  return (
    <Card
      elevation={0}
      sx={{ backgroundColor: 'transparent', border: 'none', boxShadow: 0 }}
    >
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Strategy & Risks' })}
        action={
          <Button color="secondary" onClick={handleVisualizeStrategyClick}>
            {intl.formatMessage({ defaultMessage: 'Visualize Strategy' })}
          </Button>
        }
      />
      <CardContent>
        <Typography mb={2}>
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
          <CollapsibleSection
            {...collapsibleProps}
            title={intl.formatMessage({ defaultMessage: 'Protocols' })}
            subtitle={intl.formatMessage({
              defaultMessage: 'Protocols that are used by this vault.',
            })}
          >
            <Protocols />
          </CollapsibleSection>
          <CollapsibleSection
            {...collapsibleProps}
            title={intl.formatMessage({
              defaultMessage: 'Vault Contracts',
            })}
            subtitle={intl.formatMessage({
              defaultMessage: 'Underlying Vaults that are used by this vault.',
            })}
          >
            <Vaults />
          </CollapsibleSection>
          <CollapsibleSection
            {...collapsibleProps}
            title={intl.formatMessage({ defaultMessage: 'Fees' })}
            subtitle={intl.formatMessage({
              defaultMessage: 'Fees that are charged by this vault.',
            })}
          >
            <Fees />
          </CollapsibleSection>
          <CollapsibleSection
            {...collapsibleProps}
            title={intl.formatMessage({ defaultMessage: 'Assets' })}
            subtitle={intl.formatMessage({
              defaultMessage: 'Assets that are used by this vault.',
            })}
          >
            <Assets />
          </CollapsibleSection>
        </Stack>
      </CardContent>
    </Card>
  );
};
