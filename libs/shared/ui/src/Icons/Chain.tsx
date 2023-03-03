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
import { arbitrum, mainnet, polygon } from 'wagmi/chains';

import type { SupportedChain } from '@frontend/shared-constants';
import type { SvgIconProps } from '@mui/material';

export type ChainIconProps = {
  id?: number;
  name?: SupportedChain | string;
} & Omit<SvgIconProps, 'id'>;

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

export const supportedChainId: Record<
  number,
  (props: SvgIconProps) => JSX.Element
> = {
  [arbitrum.id]: Arbitrum,
  [mainnet.id]: Ethereum,
  [polygon.id]: Polygon,
};

export const ChainIcon = ({ id, name, ...rest }: ChainIconProps) => {
  const Icon = id ? supportedChainId[id] : supportedChains[name?.toLowerCase()];

  return Icon ? (
    <Icon {...rest} />
  ) : (
    <SvgIcon
      viewBox="-32 -32 250 250"
      {...rest}
      sx={{
        color: 'icons.color',
        borderRadius: '50%',
        backgroundColor: 'icons.background',
        ...rest?.sx,
      }}
    >
      <Link width={180} height={180} />
    </SvgIcon>
  );
};
