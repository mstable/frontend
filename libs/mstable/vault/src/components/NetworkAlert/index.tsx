import { useAccount, useNetwork } from '@dhedge/core-ui-kit/hooks/web3';
import { Alert, Button } from '@mui/material';
import { useIntl } from 'react-intl';

import type { PoolConfig } from '@dhedge/core-ui-kit/types';

export const NetworkAlert = ({
  chainId,
  symbol,
}: Pick<PoolConfig, 'chainId' | 'symbol'>) => {
  const intl = useIntl();
  const { account } = useAccount();
  const { chainId: walletChainId, chains, switchNetwork } = useNetwork();
  const { name } = chains.find(({ id }) => id === chainId) ?? { name: chainId };

  if (!account || walletChainId === chainId) {
    return null;
  }

  return (
    <Alert
      severity="warning"
      sx={{
        width: '100%',
        mb: 2,
        '.MuiAlert-icon': {
          svg: {
            height: 34,
          },
        },
      }}
      action={
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => switchNetwork(chainId)}
        >
          {intl.formatMessage(
            { defaultMessage: 'Switch to {defaultChain}', id: '1XVJUl' },
            { defaultChain: name },
          )}
        </Button>
      }
    >
      {intl.formatMessage(
        {
          defaultMessage:
            'Please switch your wallet network to {name} to interact with {symbol} vault.',
          id: 'obSWjR',
        },
        {
          name,
          symbol,
        },
      )}
    </Alert>
  );
};
