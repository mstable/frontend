import { useSendTokenInput } from '@dhedge/core-ui-kit/hooks/state';
import { useExchangeRate as useTradingPanelExchangeRate } from '@dhedge/core-ui-kit/hooks/trading';
import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import { Divider, Skeleton, Typography } from '@mui/material';

const useExchangeRate = () => {
  const { account } = useAccount();
  const [{ value: tokenValue }] = useSendTokenInput();
  const { value: exchangeRateValue, isLoading } = useTradingPanelExchangeRate();

  return {
    account,
    tokenValue,
    exchangeRateValue,
    isLoading,
  };
};

export const ExchangeRate = () => {
  const { isLoading, exchangeRateValue, tokenValue, account } =
    useExchangeRate();
  return (
    <Divider role="presentation" light={!account}>
      {isLoading && tokenValue ? (
        <Skeleton width={150} height={26} />
      ) : !exchangeRateValue ? null : (
        <Typography variant="value6">{exchangeRateValue}</Typography>
      )}
    </Divider>
  );
};
