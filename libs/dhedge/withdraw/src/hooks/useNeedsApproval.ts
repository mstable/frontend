import { useTrackedState } from '../components/BurnForm/state';

export const useNeedsApproval = () => {
  const { l1token, allowance } = useTrackedState();

  return l1token.amount.exact.gt(allowance.exact);
};
