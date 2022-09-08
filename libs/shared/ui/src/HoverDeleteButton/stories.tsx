import { useState } from 'react';

import { Button, Stack, Typography } from '@mui/material';
import produce from 'immer';

import { HoverDeleteButton as Comp } from './index';

export default {
  title: 'Components/HoverDeleteButton',
  component: Comp,
};

export const HoverDeleteButton = () => {
  const [items, setItems] = useState([0, 1, 2, 3, 4]);

  const handleDelete = (idx: number) => () => {
    setItems(
      produce((draft) => {
        draft.splice(idx, 1);
      }),
    );
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      justifyContent="space-between"
      alignItems="flex-start"
      height={450}
    >
      <Stack direction="column" spacing={2} p={2}>
        {items.map((item, idx) => (
          <Comp
            key={`${item}-item`}
            onDelete={handleDelete(idx)}
            sx={{
              width: 250,
              px: 2,
              py: 1,
              ':hover': { backgroundColor: 'action.hover' },
            }}
          >
            <Typography>Hoverable content {item}</Typography>
          </Comp>
        ))}
      </Stack>
      <Button
        disabled={items.length === 5}
        onClick={() => {
          setItems([0, 1, 2, 3, 4]);
        }}
        sx={{ width: 100 }}
      >
        Reset
      </Button>
    </Stack>
  );
};
