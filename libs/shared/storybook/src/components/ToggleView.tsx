import { useRef, useState } from 'react';

import { Button } from '@mui/material';
import { not } from 'ramda';

import type { MutableRefObject, ReactNode } from 'react';

export type ToggleViewProps = {
  componentFn: (
    anchorEl: MutableRefObject<HTMLButtonElement>,
    open: boolean,
    handleToggle: () => void,
  ) => ReactNode;
  label?: string;
};

export const ToggleView = ({ componentFn, label }: ToggleViewProps) => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);

  const handleToggle = () => {
    setOpen(not);
  };

  return (
    <>
      <Button ref={anchorEl} onClick={handleToggle}>
        {label ?? open ? 'Close' : 'Open'}
      </Button>
      {componentFn(anchorEl, open, handleToggle)}
    </>
  );
};
