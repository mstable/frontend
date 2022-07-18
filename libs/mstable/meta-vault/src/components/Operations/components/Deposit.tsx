import { TokenInput } from '@frontend/shared-ui';
import { Stack } from '@mui/material';
import { useIntl } from 'react-intl';

export const Deposit = () => {
  const intl = useIntl();

  return (
    <Stack border={1} borderRadius={1} p={2} direction="column">
      <TokenInput
        label={intl.formatMessage({ defaultMessage: 'Tokens' })}
        symbol="USDC"
        balance={100}
      />
    </Stack>
  );
};
