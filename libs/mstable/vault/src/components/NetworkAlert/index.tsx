import { useNetwork } from '@dhedge/core-ui-kit/hooks/web3';
import { Alert, Button } from '@mui/material';
import { useIntl } from 'react-intl';

import type { PoolConfig } from '@dhedge/core-ui-kit/types';

export const NetworkAlert = ({ chainId }: Pick<PoolConfig, 'chainId'>) => {
  const intl = useIntl();

  const { chain, chains, switchNetwork } = useNetwork();
  const { name } = chains.find(({ id }) => id === chainId) ?? { name: chainId };

  if (!chain.unsupported) {
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
      {intl.formatMessage({
        defaultMessage: 'Unsupported Network',
        id: 'PmkP1H',
      })}
    </Alert>
  );
};
