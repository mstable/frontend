import { SvgIcon } from '@mui/material';

import { ReactComponent as ArbitrumSvg } from './Arbitrum.svg';
import { ReactComponent as EthIconSvg } from './Ethereum.svg';
import { ReactComponent as NightfallSvg } from './Nightfall.svg';
import { ReactComponent as OptimismSvg } from './Optimism.svg';
import { ReactComponent as PolygonSvg } from './Polygon.svg';
import { ReactComponent as ZkSvg } from './Zk.svg';

import type { SvgIconProps } from '@mui/material';

export const Arbitrum = (props: SvgIconProps) => (
  <SvgIcon {...props} component={ArbitrumSvg} viewBox="0 0 84 84" />
);
export const Ethereum = (props: SvgIconProps) => (
  <SvgIcon {...props} component={EthIconSvg} viewBox="0 0 32 32" />
);
export const Nightfall = (props: SvgIconProps) => (
  <SvgIcon
    {...props}
    component={NightfallSvg}
    viewBox="155.3 65.3 289.8 320.2"
  />
);
export const Optimism = (props: SvgIconProps) => (
  <SvgIcon {...props} component={OptimismSvg} viewBox="0 0 500 500" />
);
export const Polygon = (props: SvgIconProps) => (
  <SvgIcon {...props} component={PolygonSvg} viewBox="0 0 100 100" />
);
export const Zk = (props: SvgIconProps) => (
  <SvgIcon {...props} component={ZkSvg} viewBox="0 0 500 500" />
);
