import { Button } from '@mui/material';
import { useIntl } from 'react-intl';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

interface ApproveButtonProps extends ButtonProps {
  symbol: string;
  onApprove: () => void;
}

export const ApproveButton: FC<ApproveButtonProps> = ({
  symbol,
  onApprove,
  ...props
}) => {
  const intl = useIntl();
  return (
    <Button onClick={onApprove} {...props}>
      {intl.formatMessage(
        { defaultMessage: 'Approve {symbol}', id: 'XnpuKy' },
        { symbol },
      )}
    </Button>
  );
};
