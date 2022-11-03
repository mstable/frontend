import React from 'react';

import { RouterLink } from '@frontend/shared-ui';
import { Card, Link } from '@mui/material';

interface Props {
  children: React.ReactNode;
  to: string;
}

export const HoverableCard = ({ children, to }: Props) => {
  return (
    <Link component={RouterLink} to={to}>
      <Card
        sx={{
          background: 'rgba(248, 250, 255, 0.4)',
          border: '1px solid #EAEBFF',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)',
          '&:hover': {
            background:
              'linear-gradient(180deg, rgba(39, 116, 200, 0.08) 0%, rgba(248, 250, 255, 0.4) 100%)',
            border: '1px solid rgba(39, 116, 200, 0.4)',
            boxShadow: '0px 0px 20px rgba(39, 116, 200, 0.2)',
          },
        }}
      >
        {children}
      </Card>
    </Link>
  );
};
