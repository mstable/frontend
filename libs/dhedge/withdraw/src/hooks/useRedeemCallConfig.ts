import { useMemo } from 'react';

import {
  calculateMaxSubmissionCost,
  encodeArbAdditionalData,
  REDEEM_V2_GAS_LIMIT,
} from '@frontend/shared-utils';
import { useAccount } from 'wagmi';

import { useTrackedState } from '../components/BurnForm/state';
import { l1ComptrollerContract } from '../constants';
import { useBaseFeeAndMaxFeePerGas } from './useBaseFeeAndMaxFeePerGas';
import { useNeedsApproval } from './useNeedsApproval';

export const useRedeemCallConfig = () => {
  const { address: walletAddress } = useAccount();
  const { l1token, l2token, isError } = useTrackedState();
  const needsApproval = useNeedsApproval();
  const { baseFee: l1BaseFee } = useBaseFeeAndMaxFeePerGas({
    chainId: l1token.contract.chainId,
  });
  const { maxFeePerGas: l2MaxFeePerGas } = useBaseFeeAndMaxFeePerGas({
    chainId: l2token.contract.chainId,
  });

  return useMemo(() => {
    const maxSubmissionCost = calculateMaxSubmissionCost(l1BaseFee);
    const encodedArbAdditionalData = encodeArbAdditionalData({
      walletAddress,
      l2MaxFeePerGas,
      l1BaseFee,
    });
    const ethValue = maxSubmissionCost.add(
      l2MaxFeePerGas.mul(REDEEM_V2_GAS_LIMIT),
    );
    return {
      config: {
        functionName: 'redeem',
        args: [
          l1token.contract.address,
          l2token.contract.address,
          l1token.amount.exact,
          walletAddress,
          encodedArbAdditionalData,
          { value: ethValue },
        ],
        enabled: !isError && !l1token.amount.exact.isZero() && !needsApproval,
        address: l1ComptrollerContract.address,
        abi: l1ComptrollerContract.abi,
        chainId: l1ComptrollerContract.chainId,
      },
      zeroGasFeeParams: l1BaseFee.isZero() || l2MaxFeePerGas.isZero(),
    };
  }, [
    isError,
    l1BaseFee,
    l1token.amount.exact,
    l1token.contract.address,
    l2MaxFeePerGas,
    l2token.contract.address,
    needsApproval,
    walletAddress,
  ]);
};
