import { utils } from 'ethers';

import type { BigNumber } from 'ethers';
import type { Address } from 'wagmi';

const { defaultAbiCoder } = utils;

const REDEEM_FROM_L1_LENGTH = 164;
export const REDEEM_V2_GAS_LIMIT = 1000000;

// https://github.com/OffchainLabs/nitro-contracts/blob/fbbcef09c95f69decabaced3da683f987902f3e2/src/bridge/IInboxBase.sol#L57
export const calculateMaxSubmissionCost = (baseFee: BigNumber) =>
  baseFee.mul(1400 + 6 * REDEEM_FROM_L1_LENGTH);

/*
struct ArbAdditionalData {
   uint256 maxSubmissionCost;
   address excessFeeRefundAddress;
   address callValueRefundAddress;
   uint256 gasLimit;
   uint256 maxFeePerGas;
 }
 */
export const encodeArbAdditionalData = ({
  walletAddress,
  l1BaseFee,
  l2MaxFeePerGas,
}: {
  walletAddress: Address;
  l1BaseFee: BigNumber;
  l2MaxFeePerGas: BigNumber;
}) => {
  const maxSubmissionCost = calculateMaxSubmissionCost(l1BaseFee);

  return defaultAbiCoder.encode(
    // https://github.com/dhedge/buyback-contract/blob/version-2/src/abstracts/L1ComptrollerV2Base.sol#L98C22-L98C36
    ['tuple(uint256, address, address, uint256, uint256)'],
    [
      [
        maxSubmissionCost,
        walletAddress,
        walletAddress,
        REDEEM_V2_GAS_LIMIT,
        l2MaxFeePerGas,
      ],
    ],
  );
};
