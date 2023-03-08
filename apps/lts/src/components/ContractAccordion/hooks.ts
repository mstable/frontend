import { useSettings } from '@frontend/lts-settings';
import { BigDecimal } from '@frontend/shared-utils';
import {
  fetchBalance,
  fetchSigner,
  fetchToken,
  getContract,
  readContract,
  readContracts,
} from '@wagmi/core';
import { constants } from 'ethers';
import { BigNumber } from 'ethers';
import { pathOr } from 'ramda';
import { useAccount, useBalance, useQuery } from 'wagmi';

import type { Contract } from '@frontend/lts-constants';
import type { HexAddress } from '@frontend/shared-utils';

const legacyBalance = async ({ queryKey }) => {
  const [_, contract, walletAddress] = queryKey;
  const data = await readContracts({
    contracts: [
      {
        address: contract.address,
        abi: contract.abi,
        functionName: 'stakingToken',
        args: undefined,
      },
      {
        address: contract.address,
        abi: contract.abi,
        functionName: contract?.balanceFn ?? 'balanceOf',
        args: [walletAddress],
      },
    ],
  });
  const stakingToken = await fetchToken({
    address: data?.[0] as unknown as HexAddress,
  });

  return {
    value: (data?.[1] as unknown as BigNumber) ?? constants.Zero,
    decimals: stakingToken?.decimals,
    symbol: stakingToken?.symbol,
  };
};

export const useContractBalance = (contract: Contract) => {
  const { address: walletAddress } = useAccount();
  const bhook = useBalance({
    address: walletAddress,
    token: contract.address,
    enabled: ['vault', 'save', 'pool', 'metavault'].includes(contract.type),
  });
  const blp = useQuery(
    ['legacyBalance', contract, walletAddress],
    legacyBalance,
    {
      enabled: contract.type === 'legacypool',
    },
  );

  return contract.type === 'legacypool' ? blp : bhook;
};

const savePreview = async ({ queryKey }) => {
  const [_, contract, __, bal] = queryKey;
  const infos = await readContracts({
    contracts: [
      {
        address: contract.address,
        abi: contract.abi,
        functionName: 'previewRedeem',
        args: [new BigDecimal(bal?.value, bal?.decimals).exact],
      },
      {
        address: contract.address,
        abi: contract.abi,
        functionName: 'asset',
        args: undefined,
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

const poolPreview = async ({ queryKey }) => {
  const [_, contract, walletAddress, bal] = queryKey;
  const signer = await fetchSigner();
  const con = getContract({
    address: contract.address,
    abi: contract.abi,
    signerOrProvider: signer,
  });
  const bAssets = await readContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'getBassets',
    args: undefined,
  });
  const a = await fetchToken({
    address: pathOr(null, [0, 0, 0], bAssets),
  });
  const b = await fetchToken({
    address: pathOr(null, [0, 1, 0], bAssets),
  });
  let cs = [constants.Zero, constants.Zero];
  if (con?.callStatic && bal?.value) {
    cs = await con.callStatic.redeemProportionately(
      bal?.value,
      [constants.Zero, constants.Zero],
      walletAddress,
    );
  }

  return [
    {
      value: cs[0] as BigNumber,
      token: a,
    },
    {
      value: cs[1] as BigNumber,
      token: b,
    },
  ];
};

const vaultPreview = async ({ queryKey }) => {
  const [_, contract, __, bal] = queryKey;
  const stakingTokenAddress = await readContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'stakingToken',
    args: undefined,
  });
  const token = await fetchToken({
    address: stakingTokenAddress as unknown as HexAddress,
  });

  return [
    {
      value: bal?.value,
      token,
    },
  ];
};

const legacyPoolPreview = async ({ queryKey }) => {
  return [];
};

const metavaultPreview = async ({ queryKey }) => {
  const [_, contract, walletAddress] = queryKey;
  const assetAddress = await readContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'asset',
    args: undefined,
  });
  const token = await fetchToken({
    address: assetAddress as unknown as HexAddress,
  });
  const mvBal = await fetchBalance({
    address: walletAddress,
    token: contract.address,
  });
  const assetBal = await readContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'convertToAssets',
    args: [mvBal?.value ?? constants.Zero],
  });

  return [
    {
      value: (assetBal as unknown as BigNumber) ?? constants.Zero,
      token,
    },
  ];
};

export const useContractPreview = (contract: Contract) => {
  const { address: walletAddress } = useAccount();
  const { data: bal } = useContractBalance(contract);

  const name = {
    save: 'savePreview',
    pool: 'poolPreview',
    vault: 'vaultPreview',
    legacypool: 'legacyPoolPreview',
    metavault: 'metavaultPreview',
  }[contract.type];

  const fn = {
    save: savePreview,
    pool: poolPreview,
    vault: vaultPreview,
    legacypool: legacyPoolPreview,
    metavault: metavaultPreview,
  }[contract.type];

  return useQuery([name, contract, walletAddress, bal], fn, {
    enabled: bal?.value.gt(constants.Zero),
  });
};

export const useContractPrepareConfig = (contract: Contract) => {
  const { address: walletAddress } = useAccount();
  const { data: bal } = useContractBalance(contract);
  const { data: preview } = useContractPreview(contract);
  const { slippage } = useSettings();

  let mins = [constants.Zero, constants.Zero];

  switch (contract.type) {
    case 'save':
      return {
        address: contract.address,
        abi: contract.abi,
        functionName: 'redeem',
        args: [new BigDecimal(bal?.value, bal?.decimals).exact],
      };
    case 'pool':
      if (preview?.length > 0) {
        mins = preview.map((p) => {
          const m = p.value as BigNumber;

          return m.sub(m.div(BigNumber.from(1 / slippage)));
        });
      }

      return {
        address: contract.address,
        abi: contract.abi,
        functionName: 'redeemProportionately',
        args: [bal?.value, mins, walletAddress],
      };
    case 'vault':
      return {
        address: contract.address,
        abi: contract.abi,
        functionName: 'exit',
      };
    case 'legacypool':
      return {
        address: contract.address,
        abi: contract.abi,
        functionName: 'exit',
      };
    case 'metavault':
      return {
        address: contract.address,
        abi: contract.abi,
        functionName: 'redeem',
        args: [bal?.value, walletAddress, walletAddress],
      };
  }
};
