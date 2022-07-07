import { ToggleView } from '@frontend/shared-storybook';
import { MenuItem } from '@mui/material';

import { ClickAwayMenu as Comp } from './index';

export default {
  title: 'Components/Menus',
  component: Comp,
};

export const ClickAwayMenu = ToggleView.bind({});
ClickAwayMenu.args = {
  componentFn: (anchorEl, open, toggle) => (
    <Comp open={open} anchorEl={anchorEl} onClose={toggle}>
      <>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 1</MenuItem>
      </>
    </Comp>
  ),
};
