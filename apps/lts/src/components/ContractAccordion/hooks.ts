/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSettings } from '@frontend/lts-settings';
import { isNilOrEmpty } from '@frontend/shared-utils';
import {
  fetchSigner,
  fetchToken,
  getContract,
  readContract,
  readContracts,
} from '@wagmi/core';
import { constants } from 'ethers';
import { BigNumber } from 'ethers';
import { pathOr } from 'ramda';
import { useAccount, useQuery } from 'wagmi';

import type { HexAddress } from '@frontend/shared-utils';

import type { LTSContract } from './types';

const stablePreview = async ({ queryKey }) => {
  const [_, contract, walletAddress] = queryKey;
  const bAssets = await readContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'getBassets',
    args: [],
  });

  if (isNilOrEmpty(bAssets?.[0])) {
    return [];
  }

  const tokenProms = (bAssets[0] as any[]).map((b) =>
    fetchToken({ address: pathOr(null, [0], b) }),
  );
  const tokens = await Promise.all(tokenProms);
  const signer = await fetchSigner();
  const con = getContract({
    address: contract.address,
    abi: contract.abi,
    signerOrProvider: signer,
  });
  const sim = await con.callStatic.redeemMasset(
    contract.balance,
    (bAssets[0] as any[]).map(() => constants.Zero),
    walletAddress,
  );

  return sim.map((value, i) => ({ value, token: tokens[i] }));
};

const poolPreview = async ({ queryKey }) => {
  const [_, contract, walletAddress] = queryKey;
  const bAssets = await readContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'getBassets',
    args: [],
  });

  if (isNilOrEmpty(bAssets?.[0])) {
    return [];
  }

  const tokenProms = (bAssets[0] as any[]).map((b) =>
    fetchToken({ address: pathOr(null, [0], b) }),
  );
  const tokens = await Promise.all(tokenProms);
  const signer = await fetchSigner();
  const con = getContract({
    address: contract.address,
    abi: contract.abi,
    signerOrProvider: signer,
  });
  const sim = await con.callStatic.redeemProportionately(
    contract.balance,
    (bAssets[0] as any[]).map(() => constants.Zero),
    walletAddress,
  );

  return sim.map((value, i) => ({ value, token: tokens[i] }));
};

const savePreview = async ({ queryKey }) => {
  const [_, contract] = queryKey;
  const infos = await readContracts({
    contracts: [
      {
        address: contract.address,
        abi: contract.abi,
        functionName: 'previewRedeem',
        args: [contract.balance],
      },
      {
        address: contract.address,
        abi: contract.abi,
        functionName: 'asset',
        args: [],
      },
    ],
  });
  const token = await fetchToken({
    address: pathOr(null, [1], infos),
  });

  return [
    {
      value: (infos?.[0] as unknown as BigNumber) ?? constants.Zero,
      token,
    },
  ];
};

const vaultPreview = async ({ queryKey }) => {
  const [_, contract] = queryKey;
  const stakingTokenAddress = await readContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'stakingToken',
    args: [],
  });
  const token = await fetchToken({
    address: stakingTokenAddress as unknown as HexAddress,
  });

  return [
    {
      value: contract.balance,
      token,
    },
  ];
};

const legacyPoolPreview = async ({ queryKey }) => {
  return [];
};

const metavaultPreview = async ({ queryKey }) => {
  const [_, contract] = queryKey;
  const assetAddress = await readContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'asset',
    args: [],
  });
  const token = await fetchToken({
    address: assetAddress as unknown as HexAddress,
  });
  const assetBal = await readContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'convertToAssets',
    args: [contract.balance],
  });

  return [
    {
      value: (assetBal as unknown as BigNumber) ?? constants.Zero,
      token,
    },
  ];
};

export const useContractPreview = (contract: LTSContract) => {
  const { address: walletAddress } = useAccount();

  const name = {
    save: 'savePreview',
    stable: 'stablePreview',
    pool: 'poolPreview',
    vault: 'vaultPreview',
    legacypool: 'legacyPoolPreview',
    metavault: 'metavaultPreview',
  }[contract.type];

  const fn = {
    save: savePreview,
    stable: stablePreview,
    pool: poolPreview,
    vault: vaultPreview,
    legacypool: legacyPoolPreview,
    metavault: metavaultPreview,
  }[contract.type];

  return useQuery([name, contract, walletAddress], fn, {
    enabled: contract.balance.gt(constants.Zero),
  });
};

export const useContractPrepareConfig = (contract: LTSContract) => {
  const { address: walletAddress } = useAccount();
  const { data: preview } = useContractPreview(contract);
  const { slippage } = useSettings();

  let mins;

  switch (contract.type) {
    case 'stable':
      if (!isNilOrEmpty(preview)) {
        mins = preview.map((p) => {
          const m = p.value as BigNumber;

          return BigNumber.isBigNumber(m) && slippage > 0
            ? m.sub(m.div(BigNumber.from(1 / slippage)))
            : constants.Zero;
        });
      }

      return {
        address: contract.address,
        abi: contract.abi,
        functionName: 'redeemMasset',
        args: [contract.balance, mins, walletAddress],
        enabled: preview?.length > 0 && contract.balance.gt(constants.Zero),
      };
    case 'save':
      return {
        address: contract.address,
        abi: contract.abi,
        functionName: 'redeem',
        args: [contract.balance],
        enabled: contract.balance.gt(constants.Zero),
      };
    case 'pool':
      if (!isNilOrEmpty(preview)) {
        mins = preview.map((p) => {
          const m = p.value as BigNumber;

          return BigNumber.isBigNumber(m) && slippage > 0
            ? m.sub(m.div(BigNumber.from(1 / slippage)))
            : constants.Zero;
        });
      }

      return {
        address: contract.address,
        abi: contract.abi,
        functionName: 'redeemProportionately',
        args: [contract.balance, mins, walletAddress],
        enabled: preview?.length > 0 && contract.balance.gt(constants.Zero),
      };
    case 'vault':
      return {
        address: contract.address,
        abi: contract.abi,
        functionName: 'exit',
        enabled: contract.balance.gt(constants.Zero),
      };
    case 'legacypool':
      return {
        address: contract.address,
        abi: contract.abi,
        functionName: 'exit',
        enabled: contract.balance.gt(constants.Zero),
      };
    case 'metavault':
      return {
        address: contract.address,
        abi: contract.abi,
        functionName: 'redeem',
        args: [contract.balance, walletAddress, walletAddress],
        enabled: contract.balance.gt(constants.Zero),
      };
  }
};
