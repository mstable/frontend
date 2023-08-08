import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import { OpenAccountModalButton } from '@frontend/shared-providers';
import { Button } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNetwork } from 'wagmi';

import { useIsLeveragedType } from '../../../hooks/useIsLeveragedType';
import { isFlatcoinSupportedChain } from '../../../utils';
import { LeveragedTradingButton } from './LeveragedTradingButton';
import { StableTradingButton } from './StableTradingButton';

import type { ButtonProps } from '@mui/material';

const buttonProps: ButtonProps = {
  size: 'large',
};

export const useTradingButton = () => {
  const { account } = useAccount();
  const isLeveraged = useIsLeveragedType();
  const { chain } = useNetwork();

  return {
    isDisconnected: !account,
    isWrongNetwork: !isFlatcoinSupportedChain(chain.id),
    isLeveraged,
  };
};

export const TradingButton = () => {
  const intl = useIntl();
  const { isDisconnected, isWrongNetwork, isLeveraged } = useTradingButton();

  if (isDisconnected) {
    return (
      <OpenAccountModalButton
        fullWidth
        connectLabel={intl.formatMessage({
          defaultMessage: 'Connect Wallet',
          id: 'cg1VJ2',
        })}
        {...buttonProps}
      />
    );
  }

  if (isWrongNetwork) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({
          defaultMessage: 'Wrong Network',
          id: 'wqlXwW',
        })}
      </Button>
    );
  }

  return isLeveraged ? <LeveragedTradingButton /> : <StableTradingButton />;
};
