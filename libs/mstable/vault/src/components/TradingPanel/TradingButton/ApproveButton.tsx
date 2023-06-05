import { Button } from '@mui/material';
import { useIntl } from 'react-intl';

import type { FC } from 'react';

interface ApproveButtonProps {
  symbol: string;
  onApprove: () => void;
}

export const ApproveButton: FC<ApproveButtonProps> = ({
  symbol,
  onApprove,
}) => {
  const intl = useIntl();
  return (
    <Button onClick={onApprove}>
      {intl.formatMessage(
        { defaultMessage: 'Approve {symbol}', id: 'XnpuKy' },
        { symbol },
      )}
    </Button>
  );
};
