import { ApproveButton } from '@frontend/shared-ui';
import { Button } from '@mui/material';

import { useFlatcoinTradingState } from '../state';

const useStableTradingButton = () => {
  const { sendToken } = useFlatcoinTradingState();
  // TODO: allowance and stable trading logic
  const onApprove = () => alert('approve');

  return { isApproved: false, sendToken, onApprove };
};

export const StableTradingButton = () => {
  const { isApproved, sendToken, onApprove } = useStableTradingButton();

  if (!isApproved) {
    return <ApproveButton symbol={sendToken.symbol} onApprove={onApprove} />;
  }
  return <Button onClick={() => console.log('Trade')}>Trade</Button>;
};
