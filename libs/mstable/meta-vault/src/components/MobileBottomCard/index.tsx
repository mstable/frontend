import { useState } from 'react';

import { CollapsibleSection } from '@frontend/shared-ui';
import { Box, Button, Card } from '@mui/material';
import { useIntl } from 'react-intl';

import { PositionContent } from '../Position';

export const MobileBottomCard = () => {
  const intl = useIntl();
  const [myPositionOpen, setMyPositionOpen] = useState(false);
  return (
    <Card sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
      <Box
        m={2}
        pb={1}
        borderBottom={(theme) => `1px solid ${theme.palette.divider}`}
      >
        <CollapsibleSection
          iconPosition="end"
          title={intl.formatMessage({ defaultMessage: 'My Position' })}
          open={myPositionOpen}
          onToggle={() => setMyPositionOpen((o) => !o)}
        >
          <PositionContent />
        </CollapsibleSection>
      </Box>
      <Box m={2} mt={3}>
        <Button fullWidth>
          {intl.formatMessage({ defaultMessage: 'Deposit/Withdraw' })}
        </Button>
      </Box>
    </Card>
  );
};
