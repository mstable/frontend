import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import { OpenAccountModalButton } from '@frontend/shared-providers';
import { Button } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNetwork } from 'wagmi';

import { useIsLeveragedType } from '../../../hooks/useIsLeveragedType';
import { isFlatcoinSupportedChain } from '../../../utils';
import { useFlatcoinTradingState } from '../state';
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
  const { isInsufficientBalance } = useFlatcoinTradingState();

  return {
    isDisconnected: !account,
    isWrongNetwork: !!account && !isFlatcoinSupportedChain(chain.id),
    isLeveraged,
    isInsufficientBalance,
  };
};

export const TradingButton = () => {
  const intl = useIntl();
  const { isDisconnected, isWrongNetwork, isLeveraged, isInsufficientBalance } =
    useTradingButton();

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

  if (isInsufficientBalance) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage({
          defaultMessage: 'Insufficient balance',
          id: 'kaPKOB',
        })}
      </Button>
    );
  }

  return isLeveraged ? <LeveragedTradingButton /> : <StableTradingButton />;
};
