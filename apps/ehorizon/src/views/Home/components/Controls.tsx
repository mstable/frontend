import { Button, Stack } from '@mui/material';

import { useAddDataSet, useRefresh, useRemoveDataSet } from '../hooks';
import { useDataSets } from '../state';

import type { StackProps } from '@mui/material';

export const Controls = (props: StackProps) => {
  const ds = useDataSets();
  const addDataSet = useAddDataSet();
  const removeDataSet = useRemoveDataSet();
  const refresh = useRefresh();

  return (
    <Stack spacing={2} direction="row" p={2} {...props}>
      <Button disabled={ds.length === 10} onClick={addDataSet}>
        Add Data Set
      </Button>
      <Button disabled={ds.length === 0} onClick={removeDataSet}>
        Remove Data Set
      </Button>
      <Button disabled={ds.length === 0} onClick={refresh}>
        Refresh
      </Button>
    </Stack>
  );
};
