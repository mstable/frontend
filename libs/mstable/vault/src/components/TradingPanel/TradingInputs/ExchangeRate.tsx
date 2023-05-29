import { useExchangeRate } from '@dhedge/core-ui-kit/hooks/trading';
import { useAccount } from '@dhedge/core-ui-kit/hooks/web3';
import { Divider, Skeleton, Typography } from '@mui/material';

export const ExchangeRate = () => {
  const { account } = useAccount();
  const { value, isLoading } = useExchangeRate();

  return (
    <Divider role="presentation" light={!account}>
      {isLoading ? (
        <Skeleton width={150} height={26} />
      ) : !value ? null : (
        <Typography variant="value6">{value}</Typography>
      )}
    </Divider>
  );
};
