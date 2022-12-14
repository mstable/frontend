import { tokens } from '@mstable/metavaults-web';
import { goerli, mainnet } from 'wagmi/chains';

export type Vault = {
  address: string;
  name: string;
  decimals: number;
};

export type SupportedVault =
  | 'mvusdc3pcv'
  | 'mv3crvcvx'
  | 'vcx3crvmusd'
  | 'vcx3crvfrax'
  | 'vcx3crvbusd';

const main: Record<SupportedVault, Vault> = {
  mvusdc3pcv: tokens[mainnet.id]['mvusdc-3pcv'],
  mv3crvcvx: tokens[mainnet.id]['mv3crv-cvx'],
  vcx3crvmusd: tokens[mainnet.id]['vcx3crv-musd'],
  vcx3crvfrax: tokens[mainnet.id]['vcx3crv-frax'],
  vcx3crvbusd: tokens[mainnet.id]['vcx3crv-busd'],
};

const goer: Record<SupportedVault, Vault> = {
  mvusdc3pcv: tokens[mainnet.id]['mvusdc-3pcv'],
  mv3crvcvx: tokens[mainnet.id]['mv3crv-cvx'],
  vcx3crvmusd: tokens[mainnet.id]['vcx3crv-musd'],
  vcx3crvfrax: tokens[mainnet.id]['vcx3crv-frax'],
  vcx3crvbusd: tokens[mainnet.id]['vcx3crv-busd'],
};

export const vaults: Record<number, Record<SupportedVault, Vault>> = {
  [mainnet.id]: main,
  [goerli.id]: goer,
};
