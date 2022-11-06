import {
  Arbitrum,
  Ethereum,
  Nightfall,
  Optimism,
  Polygon,
  Zk,
} from '@frontend/shared-icons';
import { SvgIcon } from '@mui/material';
import { Link } from 'phosphor-react';

import type { SupportedChain } from '@frontend/shared-constants';
import type { SvgIconProps } from '@mui/material';

export type ChainIconProps = {
  name: SupportedChain | string;
} & SvgIconProps;

export const supportedChains: Record<
  SupportedChain,
  (props: SvgIconProps) => JSX.Element
> = {
  arbitrum: Arbitrum,
  ethereum: Ethereum,
  nightfall: Nightfall,
  optimism: Optimism,
  polygon: Polygon,
  zk: Zk,
};

export const ChainIcon = ({ name, ...rest }: ChainIconProps) => {
  const Icon = supportedChains[name?.toLowerCase()];

  return Icon ? (
    <Icon {...rest} />
  ) : (
    <SvgIcon
      viewBox="24 24 208 208"
      {...rest}
      sx={{ fontSize: 24, ...rest?.sx }}
    >
      <Link width={256} height={256} />
    </SvgIcon>
  );
};
