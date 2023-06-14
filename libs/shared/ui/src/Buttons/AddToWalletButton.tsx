import { buildIconLink } from '@frontend/shared-utils';
import { Button } from '@mui/material';

import type { TradingToken } from '@dhedge/core-ui-kit/types';
import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

type AddToWalletButtonProps = {
  token: Omit<TradingToken, 'value'>;
} & ButtonProps;

interface WalletTokenOptions {
  address: string;
  symbol: string;
  decimals: number;
  image?: string;
}

interface WatchAssetRequest {
  request: (args: {
    method: 'wallet_watchAsset';
    params: {
      type: 'ERC20';
      options: WalletTokenOptions;
    };
  }) => Promise<boolean>;
}

export const addTokenToWallet = async (
  tokenOptions: WalletTokenOptions,
): Promise<void> => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      await (window.ethereum as WatchAssetRequest).request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: tokenOptions,
        },
      });
    }
  } catch {}
};

export const AddToWalletButton: FC<AddToWalletButtonProps> = ({
  token,
  ...rest
}) => {
  const handleAddToken = () => {
    addTokenToWallet({
      address: token.address,
      symbol: token.symbol,
      decimals: token.decimals,
      image: buildIconLink(token.symbol),
    });
  };

  return (
    <Button color="secondary" onClick={handleAddToken} {...rest}>
      Add {token.symbol} to Wallet
    </Button>
  );
};
