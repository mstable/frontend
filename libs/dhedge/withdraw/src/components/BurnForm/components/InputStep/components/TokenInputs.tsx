import { TokenInput } from '@frontend/shared-ui';
import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import { ArrowFatDown } from 'phosphor-react';
import { useAccount } from 'wagmi';

import { useSetL1TokenAmount } from '../../../hooks';
import { useTrackedState } from '../../../state';

import type { BoxProps } from '@mui/material';

export const TokenInputs = (props: BoxProps) => {
  const { isConnected } = useAccount();
  const { l1token, l2token, isLoading, isError } = useTrackedState();
  const setL1Amount = useSetL1TokenAmount();

  const handleSetMax = () => {
    setL1Amount(l1token.balance);
  };

  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        ...props?.sx,
      }}
    >
      <TokenInput
        amount={l1token.amount}
        max={l1token.balance}
        error={isError}
        onChange={setL1Amount}
        token={l1token.contract}
        hideBottomRow
        disabled={!isConnected || l1token.balance.exact.isZero()}
        components={{
          container: {
            width: 1,
            padding: (theme) => theme.spacing(0.5, 2, 0.5, 2),
          },
        }}
      />
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          width: 1,
          padding: (theme) => theme.spacing(0.5, 2, 2, 2),
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="label2" color="text.secondary">
          {isLoading ? (
            <Skeleton width={60} />
          ) : (
            Intl.NumberFormat('en-US', {
              currency: 'USD',
              style: 'currency',
              maximumSignificantDigits: 2,
            }).format(l1token.price)
          )}
        </Typography>
        {isConnected &&
          (isLoading ? (
            <Skeleton width={100} height={18} />
          ) : (
            <Button
              variant="text"
              size="small"
              onClick={handleSetMax}
              sx={{
                color: 'text.secondary',
                typography: 'label2',
                p: 0,
                minHeight: 18,
              }}
            >
              Balance {l1token.balance.simpleRounded}
            </Button>
          ))}
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        p={1.5}
        border={(theme) => `1px solid ${theme.palette.divider}`}
        borderRadius={1}
        bgcolor="divider"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          svg: { color: 'text.primary' },
        }}
      >
        <ArrowFatDown size={20} />
      </Stack>
      <TokenInput
        amount={l2token.amount}
        token={l2token.contract}
        hideBottomRow
        components={{
          container: {
            width: 1,
            padding: (theme) => theme.spacing(0.5, 2, 0.5, 2),
          },
          input: {
            InputProps: {
              tabIndex: -1,
              disabled: true,
            },
          },
        }}
      />
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          width: 1,
          padding: (theme) => theme.spacing(0.5, 2, 2, 2),
        }}
      >
        <Typography variant="label2" color="text.secondary">
          {isLoading ? (
            <Skeleton width={60} />
          ) : (
            Intl.NumberFormat('en-US', {
              currency: 'USD',
              style: 'currency',
            }).format(l2token.price)
          )}
        </Typography>
        {isConnected && (
          <Typography variant="label2" color="text.secondary">
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <>Balance {l2token.balance.simpleRounded}</>
            )}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
