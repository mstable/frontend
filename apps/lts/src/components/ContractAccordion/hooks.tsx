/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSettings } from '@frontend/lts-settings';
import { usePrices, usePushNotification } from '@frontend/shared-providers';
import { ViewEtherscanLink } from '@frontend/shared-ui';
import { BigDecimal, isNilOrEmpty } from '@frontend/shared-utils';
import {
  fetchSigner,
  fetchToken,
  getContract,
  mainnet,
  readContract,
  readContracts,
} from '@wagmi/core';
import { constants } from 'ethers';
import { BigNumber } from 'ethers';
import { pathOr, propEq } from 'ramda';
import { useIntl } from 'react-intl';
import {
  useAccount,
  useContractWrite,
  useFeeData,
  useNetwork,
  usePrepareContractWrite,
  useQuery,
  useWaitForTransaction,
} from 'wagmi';

import type { HexAddress } from '@frontend/shared-utils';

import type { LTSContract } from './types';

const stablePreview = async ({ queryKey }) => {
  const [_, contract, walletAddress] = queryKey;
  const bAssets = await readContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'getBassets',
    chainId: contract.chain,
    args: [],
  });

  if (isNilOrEmpty(bAssets?.[0])) {
    return [];
  }

  const tokenProms = (bAssets[0] as any[]).map((b) =>
    fetchToken({ address: pathOr(null, [0], b), chainId: contract.chain }),
  );
  const tokens = await Promise.all(tokenProms);
  const signer = await fetchSigner({ chainId: contract.chain });
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
    chainId: contract.chain,
    args: [],
  });

  if (isNilOrEmpty(bAssets?.[0])) {
    return [];
  }

  const tokenProms = (bAssets[0] as any[]).map((b) =>
    fetchToken({ address: pathOr(null, [0], b), chainId: contract.chain }),
  );
  const tokens = await Promise.all(tokenProms);
  const signer = await fetchSigner({ chainId: contract.chain });
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
        chainId: contract.chain,
        args: [contract.balance],
      },
      {
        address: contract.address,
        abi: contract.abi,
        functionName: 'asset',
        chainId: contract.chain,
        args: [],
      },
    ],
  });
  const token = await fetchToken({
    address: pathOr(null, [1], infos),
    chainId: contract.chain,
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
    chainId: contract.chain,
    args: [],
  });
  const token = await fetchToken({
    address: stakingTokenAddress as unknown as HexAddress,
    chainId: contract.chain,
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
    chainId: contract.chain,
    args: [],
  });
  const token = await fetchToken({
    address: assetAddress as unknown as HexAddress,
    chainId: contract.chain,
  });
  const assetBal = await readContract({
    address: contract.address,
    abi: contract.abi,
    functionName: 'convertToAssets',
    chainId: contract.chain,
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

  let mins: any[];
  const config = {
    address: contract.address,
    abi: contract.abi,
    chainId: contract.chain,
    enabled: contract.balance.gt(constants.Zero),
  };

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
        ...config,
        functionName: 'redeemMasset',
        args: [contract.balance, mins, walletAddress],
        enabled: preview?.length > 0 && config.enabled,
      };
    case 'save':
      return {
        ...config,
        functionName: 'redeem',
        args: [contract.balance],
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
        ...config,
        functionName: 'redeemProportionately',
        args: [contract.balance, mins, walletAddress],
        enabled: preview?.length > 0 && config.enabled,
      };
    case 'vault':
      return {
        ...config,
        functionName: 'exit',
      };
    case 'legacypool':
      return {
        ...config,
        functionName: 'exit',
      };
    case 'metavault':
      return {
        ...config,
        functionName: 'redeem',
        args: [contract.balance, walletAddress, walletAddress],
      };
  }
};

export const useContractSubmit = (contract: LTSContract) => {
  const intl = useIntl();
  const { chains } = useNetwork();
  const contractChain = chains.find(propEq('id', contract.chain)) ?? mainnet;
  const blockExplorer = contractChain.blockExplorers.default;
  const pushNotification = usePushNotification();
  const { price } = usePrices();
  const { data: feeData } = useFeeData({
    formatUnits: 'gwei',
    chainId: contract.chain,
  });
  const config = useContractPrepareConfig(contract);
  const { config: submitConfig, isLoading: isPrepareLoading } =
    usePrepareContractWrite(config);
  const {
    data: submitData,
    write: submit,
    reset,
    isLoading: isWriteLoading,
    isSuccess: isWriteSuccess,
  } = useContractWrite({
    ...submitConfig,
    onSuccess: (data) => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Withdrawing',
          id: 'bAqUW1',
        }),
        content: (
          <ViewEtherscanLink hash={data?.hash} blockExplorer={blockExplorer} />
        ),
        severity: 'info',
      });
    },
    onError: () => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction Cancelled',
          id: '20X0BC',
        }),
        severity: 'info',
      });
    },
  });
  const { isSuccess: isSubmitSuccess } = useWaitForTransaction({
    hash: submitData?.hash,
    onSuccess: ({ transactionHash }) => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction Confirmed',
          id: 'rgdwQX',
        }),
        content: (
          <ViewEtherscanLink
            hash={transactionHash}
            blockExplorer={blockExplorer}
          />
        ),
        severity: 'success',
      });
    },
    onError: () => {
      pushNotification({
        title: intl.formatMessage({
          defaultMessage: 'Transaction Error',
          id: 'p8bsw4',
        }),
        content: (
          <ViewEtherscanLink
            hash={submitData?.hash}
            blockExplorer={blockExplorer}
          />
        ),
        severity: 'error',
      });
    },
  });

  const estimatedGas = pathOr(
    constants.Zero,
    ['request', 'gasLimit'],
    submitConfig,
  ).mul(
    (feeData?.gasPrice ?? constants.Zero).add(
      feeData?.maxPriorityFeePerGas ?? constants.Zero,
    ),
  );
  const nativeTokenGasPrice = new BigDecimal(
    estimatedGas,
    contractChain.nativeCurrency.decimals,
  );
  const fiatGasPrice = BigDecimal.fromSimple(
    price * nativeTokenGasPrice?.simple,
  );

  return {
    submit,
    reset,
    isPrepareLoading,
    isWriteLoading,
    isWriteSuccess,
    isSubmitSuccess,
    estimatedGas,
    nativeTokenGasPrice,
    fiatGasPrice,
    feeData,
  };
};
