import { Button } from '@mui/material';
import { useIntl } from 'react-intl';
// import { useFlatcoinTradingState } from '../state';

// TODO: Leverage trading logic
// const useLeveragedTradingButton = () => {
//   const { sendToken, receiveToken, leverage } = useFlatcoinTradingState();
//
//   return {};
// };

export const LeveragedTradingButton = () => {
  const intl = useIntl();
  // const {} = useLeveragedTradingButton();

  return (
    <Button onClick={() => console.log('Trade')}>
      {intl.formatMessage({ defaultMessage: 'Open Position', id: 'Px2xWV' })}
    </Button>
  );
};
