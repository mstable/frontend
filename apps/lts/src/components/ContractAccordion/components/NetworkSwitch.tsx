import { useEffect } from 'react';

import { useSettings, useUpdateSettings } from '@frontend/lts-settings';
import { ChainIcon } from '@frontend/shared-ui';
import { Button, Collapse, Divider, Stack } from '@mui/material';
import { constants } from 'ethers';
import produce from 'immer';
import { filter, groupBy, pipe, prop } from 'ramda';
import { useAccount } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';

import { useTrackedState } from '../state';

import type { StackProps } from '@mui/material';

import type { LTSContract } from '../types';

export const NetworkSwitch = (props: StackProps) => {
  const { isConnected } = useAccount();
  const { chain, showEmpty } = useSettings();
  const updateSettings = useUpdateSettings();
  const { contracts } = useTrackedState();

  const grouped = pipe(
    filter<LTSContract>((c) => showEmpty || c.balance.gt(constants.Zero)),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    groupBy<LTSContract, number>(prop('chain')),
  )(contracts);

  useEffect(() => {
    const newChain =
      isConnected && Object.keys(grouped)?.length === 1
        ? Number(Object.keys(grouped)[0])
        : chain;
    if (newChain !== chain) {
      updateSettings(
        produce((state) => {
          state.chain = newChain;
        }),
      );
    }
  }, [chain, grouped, isConnected, updateSettings]);

  const handleClick = (chainId: number) => () => {
    if (chain !== chainId) {
      updateSettings(
        produce((state) => {
          state.chain = chainId;
        }),
      );
    }
  };

  return (
    <Collapse in={isConnected && Object.keys(grouped).length > 1}>
      <Stack
        direction="row"
        border={(theme) => `1px solid ${theme.palette.divider}`}
        borderRadius={1}
        divider={<Divider orientation="vertical" />}
        {...props}
      >
        {[mainnet, polygon].map((c, i) => (
          <Button
            variant="text"
            key={c.id}
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
        ))}
      </Stack>
    </Collapse>
  );
};
