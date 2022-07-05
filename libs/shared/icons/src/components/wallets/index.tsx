import { SvgIcon } from '@mui/material';

import { ReactComponent as AuthereumSvg } from './authereum.svg';
import { ReactComponent as BraveSvg } from './brave.svg';
import { ReactComponent as CoinbaseSvg } from './coinbase.svg';
import { ReactComponent as FortmaticSvg } from './fortmatic.svg';
import { ReactComponent as GnosisSafeSvg } from './gnosis_safe.svg';
import { ReactComponent as LatticeSvg } from './lattice.svg';
import { ReactComponent as LedgerSvg } from './ledger.svg';
import { ReactComponent as MetamaskSvg } from './metamask.svg';
import { ReactComponent as OperaSvg } from './opera.svg';
import { ReactComponent as PortisSvg } from './portis.svg';
import { ReactComponent as TorusSvg } from './torus.svg';
import { ReactComponent as TrezorSvg } from './trezor.svg';
import { ReactComponent as WalletConnectSvg } from './wallet_connect.svg';

import type { SvgIconProps } from '@mui/material';

export const Authereum = (props: SvgIconProps) => (
  <SvgIcon {...props} component={AuthereumSvg} viewBox="0 0 596 596" />
);
export const Brave = (props: SvgIconProps) => (
  <SvgIcon {...props} component={BraveSvg} viewBox="0 0 256 301" />
);
export const Coinbase = (props: SvgIconProps) => (
  <SvgIcon {...props} component={CoinbaseSvg} viewBox="0 0 40 40" />
);
export const Fortmatic = (props: SvgIconProps) => (
  <SvgIcon {...props} component={FortmaticSvg} viewBox="0 0 40 40" />
);
export const GnosisSafe = (props: SvgIconProps) => (
  <SvgIcon {...props} component={GnosisSafeSvg} viewBox="0 0 280 280" />
);
export const Lattice = (props: SvgIconProps) => (
  <SvgIcon {...props} component={LatticeSvg} viewBox="0 0 40 40" />
);
export const Ledger = (props: SvgIconProps) => (
  <SvgIcon {...props} component={LedgerSvg} viewBox="0 0 450 450" />
);
export const Metamask = (props: SvgIconProps) => (
  <SvgIcon {...props} component={MetamaskSvg} viewBox="0 0 256 240" />
);
export const Opera = (props: SvgIconProps) => (
  <SvgIcon {...props} component={OperaSvg} viewBox="0 0 75.591 75.591" />
);
export const Portis = (props: SvgIconProps) => (
  <SvgIcon {...props} component={PortisSvg} viewBox="0 0 26 40" />
);
export const Torus = (props: SvgIconProps) => (
  <SvgIcon {...props} component={TorusSvg} viewBox="0 0 257 277" />
);
export const Trezor = (props: SvgIconProps) => (
  <SvgIcon {...props} component={TrezorSvg} viewBox="0 0 114 166" />
);
export const WalletConnect = (props: SvgIconProps) => (
  <SvgIcon {...props} component={WalletConnectSvg} viewBox="0 0 40 25" />
);
