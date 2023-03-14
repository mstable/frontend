import { useEffect } from 'react';

import { useSettings, useUpdateSettings } from '@frontend/lts-settings';
import { useSetPricesChain } from '@frontend/shared-providers';
import { ChainIcon } from '@frontend/shared-ui';
import { Badge, Button, Collapse, Divider, Stack } from '@mui/material';
import { constants } from 'ethers';
import produce from 'immer';
import { usePrevious } from 'react-use';
import { useAccount } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';

import { useTrackedState } from '../state';

import type { StackProps } from '@mui/material';

export const NetworkSwitch = (props: StackProps) => {
  const { isConnected, address } = useAccount();
  const prev = usePrevious(address);
  const { chain } = useSettings();
  const updateSettings = useUpdateSettings();
  const setPricesChain = useSetPricesChain();
  const contracts = useTrackedState();

  useEffect(() => {
    if (!isConnected || prev !== address) {
      updateSettings(
        produce((state) => {
          state.chain = mainnet.id;
        }),
      );
    }
  }, [address, isConnected, prev, updateSettings]);

  const handleClick = (chainId: number) => () => {
    if (chain !== chainId) {
      setPricesChain(chainId);
      updateSettings(
        produce((state) => {
          state.chain = chainId;
        }),
      );
    }
  };

  const polygonCount = contracts.filter(
    (c) => c.chain === polygon.id && c.balance.gt(constants.Zero),
  ).length;

  return (
    <Collapse in={isConnected && polygonCount > 0}>
      <Stack
        direction="row"
        border={(theme) => `1px solid ${theme.palette.divider}`}
        borderRadius={1}
        divider={<Divider orientation="vertical" />}
        {...props}
      >
        {[mainnet, polygon].map((c, i) => (
          <Badge
            key={c.id}
            badgeContent={polygonCount}
            invisible={c.id === mainnet.id}
            color="info"
          >
            <Button
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
                chain === c.id && {
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
            >
              <ChainIcon id={c.id} />
            </Button>
          </Badge>
        ))}
      </Stack>
    </Collapse>
  );
};
