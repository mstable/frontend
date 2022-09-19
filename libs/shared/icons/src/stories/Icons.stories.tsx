import { IconsView } from '@frontend/tools-storybook';

import * as chainIcons from '../components/chains';
import * as mstableIcons from '../components/mstable';
import * as protocolIcons from '../components/protocols';
import * as socialIcons from '../components/social';
import * as tokenIcons from '../components/tokens';
import * as walletIcons from '../components/wallets';

export default {
  title: 'Icons',
};

export const ChainIcons = IconsView.bind({});
ChainIcons.args = { icons: chainIcons };

export const MStableIcons = IconsView.bind({});
MStableIcons.args = { icons: mstableIcons };

export const ProtocolIcons = IconsView.bind({});
ProtocolIcons.args = { icons: protocolIcons };

export const SocialIcons = IconsView.bind({});
SocialIcons.args = { icons: socialIcons };

export const TokenIcons = IconsView.bind({});
TokenIcons.args = { icons: tokenIcons };

export const WalletIcons = IconsView.bind({});
WalletIcons.args = { icons: walletIcons };
