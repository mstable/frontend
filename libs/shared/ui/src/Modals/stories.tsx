import { ToggleView } from '@frontend/shared-storybook';
import { Button, Typography } from '@mui/material';

import {
  ConfirmationDialog as CComp,
  Dialog as DComp,
  Modal as MComp,
} from './index';

export default {
  title: 'Components/Modals',
  subcomponents: { Modal: MComp, Dialog: DComp, ConfirmationModal: CComp },
};

export const Modal = ToggleView.bind({});
Modal.args = {
  componentFn: (anchorEl, open, toggle) => (
    <MComp open={open} onClose={toggle}>
      <Typography sx={{ padding: 4 }}>Modal content</Typography>
    </MComp>
  ),
};

export const Dialog = ToggleView.bind({});
Dialog.args = {
  componentFn: (anchorEl, open, toggle) => (
    <DComp
      open={open}
      onClose={toggle}
      title="Dialog title"
      content="Dialog content"
      actions={
        <>
          <Button onClick={toggle}>Cancel</Button>
          <Button onClick={toggle}>Ok</Button>
        </>
      }
    />
  ),
};

export const ConfirmationDialog = ToggleView.bind({});
ConfirmationDialog.args = {
  componentFn: (anchorEl, open, toggle) => (
    <CComp open={open} onConfirm={toggle} onCancel={toggle} />
  ),
};
