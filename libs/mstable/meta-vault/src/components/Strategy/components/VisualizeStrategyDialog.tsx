import { Box, useTheme } from '@mui/material';

import diagramDark from './diagram-dark.png';
import diagramLight from './diagram-light.png';

import type { DialogOptions } from '@frontend/shared-modals';

const Content = () => {
  const {
    palette: { mode },
  } = useTheme();

  return (
    <Box
      p={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        img: {
          maxWidth: 800,
          height: 'auto',
          objectFit: 'contain',
        },
      }}
    >
      <img src={mode === 'dark' ? diagramDark : diagramLight} alt="Strategy" />
    </Box>
  );
};

export const VisualizeStrategyDialog: DialogOptions = {
  maxWidth: 'md',
  content: Content,
};
