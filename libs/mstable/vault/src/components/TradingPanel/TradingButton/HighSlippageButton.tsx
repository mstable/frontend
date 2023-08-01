import { useState } from 'react';

import { ConfirmationDialog } from '@frontend/shared-ui';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';

import type { ButtonProps } from '@mui/material';
import type { FC } from 'react';

interface HighSlippageButtonProps extends ButtonProps {
  slippageToBeUsed: number;
  approveHighSlippage: (slippage: number) => void;
}

export const HighSlippageButton: FC<HighSlippageButtonProps> = ({
  slippageToBeUsed,
  approveHighSlippage,
  ...buttonProps
}) => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button {...buttonProps} onClick={() => setIsOpen(true)}>
        {intl.formatMessage(
          {
            defaultMessage: 'Approve {slippage}% max slippage',
            id: 'eTGEXC',
          },
          { slippage: Math.abs(slippageToBeUsed) },
        )}
      </Button>
      <ConfirmationDialog
        open={isOpen}
        onConfirm={() => approveHighSlippage(slippageToBeUsed)}
        onCancel={() => setIsOpen(false)}
        title={`Approve ${slippageToBeUsed}% max slippage`}
        content={
          <>
            <Typography variant="body1">
              By proceeding with this trade, you acknowledge and accept the
              possibility of experiencing high slippage, resulting in a
              potential difference between the expected and executed price.
            </Typography>
            <List sx={{ listStyleType: 'disc' }}>
              <ListItemText
                secondary={intl.formatMessage({
                  defaultMessage:
                    'Please consider the following before confirming:',
                  id: 'r2pety',
                })}
              />
              <ListItem sx={{ py: 0 }}>
                <ListItemText
                  secondary={intl.formatMessage({
                    defaultMessage:
                      'Be aware that the final amount of assets you receive may be different from the initially quoted value.',
                    id: 'yL//gV',
                  })}
                />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText
                  secondary={intl.formatMessage({
                    defaultMessage:
                      'Ensure that you understand the risks associated with high slippage and are comfortable proceeding with the trade.',
                    id: '42xcXv',
                  })}
                />
              </ListItem>
            </List>
          </>
        }
      ></ConfirmationDialog>
    </>
  );
};
