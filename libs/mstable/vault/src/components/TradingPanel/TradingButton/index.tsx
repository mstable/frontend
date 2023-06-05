import {
  useIsDepositTradingPanelType,
  useTradingPanelPoolConfig,
  useTradingPanelSettings,
} from '@dhedge/core-ui-kit/hooks/state';
import { useIsInsufficientBalance } from '@dhedge/core-ui-kit/hooks/user';
import { useAccount, useNetwork } from '@dhedge/core-ui-kit/hooks/web3';
import { DEPOSIT_QUOTE_DIFF_ERROR_THRESHOLD } from '@frontend/shared-constants';
import { OpenAccountModalButton } from '@frontend/shared-providers';
import { Button } from '@mui/material';
import { useIntl } from 'react-intl';

import { DepositButton } from './DepositButton';
import { WithdrawButton } from './WithdrawButton';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

const buttonProps: ButtonProps = {
  size: 'large',
};

const useTradingButton = () => {
  const { account } = useAccount();
  const { chainId } = useNetwork();
  const isDeposit = useIsDepositTradingPanelType();
  const poolConfig = useTradingPanelPoolConfig();
  const [{ slippage, minSlippage }] = useTradingPanelSettings();
  const insufficientBalance = useIsInsufficientBalance();
  const slippageToBeUsed = slippage === 'auto' ? minSlippage ?? 0 : slippage;

  return {
    isDisconnected: !account,
    isWrongNetwork: chainId !== poolConfig.chainId,
    isDeposit,
    slippageToBeUsed,
    isHighSlippage:
      !insufficientBalance &&
      slippageToBeUsed > DEPOSIT_QUOTE_DIFF_ERROR_THRESHOLD,
  };
};

export const TradingButton: FC = () => {
  const intl = useIntl();
  const {
    isDisconnected,
    isWrongNetwork,
    isDeposit,
    isHighSlippage,
    slippageToBeUsed,
  } = useTradingButton();

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

  if (isHighSlippage) {
    return (
      <Button {...buttonProps} disabled>
        {intl.formatMessage(
          {
            defaultMessage: 'Blocked by high {slippage}% max slippage',
            id: 's4Vb9J',
          },
          { slippage: Math.abs(slippageToBeUsed) },
        )}
      </Button>
    );
  }

  return isDeposit ? <DepositButton /> : <WithdrawButton />;
};
