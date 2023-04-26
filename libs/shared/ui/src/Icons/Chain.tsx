import { Arbitrum, Ethereum, Optimism, Polygon } from '@frontend/shared-icons';
import { SvgIcon } from '@mui/material';
import { Link } from 'phosphor-react';
import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';

import type { SvgIconProps } from '@mui/material';

export type ChainIconProps = {
  chainId?: number;
  name?: SupportedChain | string;
} & SvgIconProps;

export type SupportedChain = 'mainnet' | 'polygon' | 'optimism' | 'arbitrum';

export const supportedChainName: Record<
  SupportedChain,
  (props: SvgIconProps) => JSX.Element
> = {
  arbitrum: Arbitrum,
  mainnet: Ethereum,
  optimism: Optimism,
  polygon: Polygon,
};

export const supportedChainId: Record<
  number,
  (props: SvgIconProps) => JSX.Element
> = {
  [arbitrum.id]: Arbitrum,
  [mainnet.id]: Ethereum,
  [polygon.id]: Polygon,
  [optimism.id]: Optimism,
};

export const ChainIcon = ({ chainId, name, ...rest }: ChainIconProps) => {
  const Icon = chainId
    ? supportedChainId[chainId]
    : supportedChainName[name?.toLowerCase()];

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
