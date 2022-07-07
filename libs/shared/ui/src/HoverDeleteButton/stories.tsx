import { useState } from 'react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, Stack, Typography } from '@mui/material';
import produce from 'immer';

import { HoverDeleteButton as Comp } from './index';

export default {
  title: 'Components/HoverDeleteButton',
  component: Comp,
};

export const HoverDeleteButton = () => {
  const [items, setItems] = useState([0, 1, 2, 3, 4]);
  const [parent] = useAutoAnimate();

  const handleDelete = (idx: number) => () => {
    setItems(
      produce((draft) => {
        draft.splice(idx, 1);
      }),
    );
  };

  return (
    <Stack direction="column" spacing={2} p={2} width={300} ref={parent}>
      {items.map((item, idx) => (
        <Comp key={`${item}-item`} onDelete={handleDelete(idx)}>
          <Typography>Hoverable content {item}</Typography>
        </Comp>
      ))}
      <Button
        disabled={items.length === 5}
        onClick={() => {
          setItems([0, 1, 2, 3, 4]);
        }}
      >
        Reset
      </Button>
    </Stack>
  );
};
