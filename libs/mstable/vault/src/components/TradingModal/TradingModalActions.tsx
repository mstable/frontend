import {
  AddToWalletButton,
  TwitterShareLink,
  ViewEtherscanLink,
} from '@frontend/shared-ui';
import { Stack } from '@mui/material';

import type { TradingToken } from '@dhedge/core-ui-kit/types';
import type { FC } from 'react';

interface TradingModalActionsProps {
  explorerLink: string;
  showShareButton: boolean;
  showAddToken: boolean;
  token: TradingToken;
}

export const TradingModalActions: FC<TradingModalActionsProps> = ({
  explorerLink,
  showShareButton,
  showAddToken,
  token,
}) => {
  return (
    <Stack
      direction="row"
      mt={-1}
      spacing={2}
      justifyContent="center"
      sx={{ width: '100%', flexWrap: 'wrap', gap: 1 }}
    >
      <ViewEtherscanLink href={explorerLink} />
      {showShareButton && (
        <TwitterShareLink
          tweetText={`I just invested in ${token.symbol} on @mstable_`}
          tweetUrl={window.location.href}
        />
      )}
      {showAddToken && <AddToWalletButton token={token} size="small" />}
    </Stack>
  );
};
