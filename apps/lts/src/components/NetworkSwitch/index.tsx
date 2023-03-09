import { ChainIcon } from '@frontend/shared-ui';
import { Button, Collapse, Divider, Stack } from '@mui/material';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';

import type { StackProps } from '@mui/material';

export const NetworkSwitch = (props: StackProps) => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { isLoading, switchNetwork } = useSwitchNetwork();

  const handleClick = (chainId: number) => () => {
    if (chain && chain.id !== chainId) {
      switchNetwork(chainId);
    }
  };

  return (
    <Collapse in={isConnected}>
      <Stack
        direction="row"
        border={(theme) => `1px solid ${theme.palette.divider}`}
        borderRadius={1}
        divider={<Divider orientation="vertical" />}
        {...props}
      >
        {[mainnet, polygon].map((c, i) => (
          <Button
            key={c.id}
            variant="text"
            onClick={handleClick(c.id)}
            sx={[
              {
                width: 56,
                height: 56,

                svg: {
                  width: 24,
                  height: 24,
                },
              },
              chain?.id === c.id && {
                backgroundColor: (theme) => theme.palette.action.selected,
              },
              i === 0 && {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
              i === 1 && {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              },
            ]}
            disabled={isLoading || !chain}
          >
            <ChainIcon id={c.id} />
          </Button>
        ))}
      </Stack>
    </Collapse>
  );
};
