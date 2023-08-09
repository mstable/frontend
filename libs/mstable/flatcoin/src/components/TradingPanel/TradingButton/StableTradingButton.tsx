import { Button } from '@mui/material';

import { useFlatcoinTradingState } from '../state';
import { ApprovalButton } from './ApprovalButton';

const useStableTradingButton = () => {
  const { needsApproval } = useFlatcoinTradingState();

  return { needsApproval };
};

export const StableTradingButton = () => {
  const { needsApproval } = useStableTradingButton();

  if (needsApproval) {
    return <ApprovalButton />;
  }
  return <Button onClick={() => console.log('Trade')}>Trade</Button>;
};
