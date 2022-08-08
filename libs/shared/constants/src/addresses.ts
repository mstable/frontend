import { chainId } from 'wagmi';

export const addresses: Record<
  number,
  Record<'ERC20' | 'ERC4626', Record<string, string>>
> = {
  [chainId.goerli]: {
    ERC20: {
      USDC: '0x2f3a40a3db8a7e3d09b0adfefbce4f6f81927557',
      USDT: '0x509ee0d083ddf8ac028f2a56731412edd63223b9',
      DAI: '0x11fe4b6ae13d2a6055c8d9cf65c55bac32b5d844',
      TAG: '0x5a036afae87e6aebf4ebc01bbefb3f009eb01772',
    },
    ERC4626: {
      TVG: '0x0145a7fb49402b29be7c52d38aeacb5e1acae11b',
    },
  },
};
