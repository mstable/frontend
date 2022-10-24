import { tokens } from '@mstable/metavaults-web';
import { chainId } from 'wagmi';

export type Vault = {
  address: string;
  name: string;
  decimals: number;
};

export type SupportedVault = 'vcx3crvmusd' | 'vcx3crvfrax' | 'vcx3crvbusd';

const mainnet: Record<SupportedVault, Vault> = {
  vcx3crvmusd: tokens[chainId.mainnet]['vcx3crv-musd'],
  vcx3crvfrax: tokens[chainId.mainnet]['vcx3crv-frax'],
  vcx3crvbusd: tokens[chainId.mainnet]['vcx3crv-busd'],
};

const goerli: Record<SupportedVault, Vault> = {
  vcx3crvmusd: tokens[chainId.mainnet]['vcx3crv-musd'],
  vcx3crvfrax: tokens[chainId.mainnet]['vcx3crv-frax'],
  vcx3crvbusd: tokens[chainId.mainnet]['vcx3crv-busd'],
};

export const vaults: Record<number, Record<SupportedVault, Vault>> = {
  [chainId.mainnet]: mainnet,
  [chainId.goerli]: goerli,
};
