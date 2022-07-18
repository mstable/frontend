import { IconsView } from '@frontend/tools-storybook';

import * as chainIcons from '../components/chains';
import * as mstableIcons from '../components/mstable';
import * as socialIcons from '../components/social';
import * as tokenIcons from '../components/tokens';
import * as uiIcons from '../components/ui';
import * as walletIcons from '../components/wallets';

export default {
  title: 'Icons',
};

export const ChainIcons = IconsView.bind({});
ChainIcons.args = { icons: chainIcons };

export const MStableIcons = IconsView.bind({});
MStableIcons.args = { icons: mstableIcons };

export const SocialIcons = IconsView.bind({});
SocialIcons.args = { icons: socialIcons };

export const TokenIcons = IconsView.bind({});
TokenIcons.args = { icons: tokenIcons };

export const UiIcons = IconsView.bind({});
UiIcons.args = { icons: uiIcons };

export const WalletIcons = IconsView.bind({});
WalletIcons.args = { icons: walletIcons };
