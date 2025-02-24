import { useEffect, useState } from 'react';

import { BigDecimal } from '@frontend/shared-utils';
import { ethers } from 'ethers';
import { useBlockNumber, useProvider } from 'wagmi';

export const useBaseFeeAndMaxFeePerGas = ({ chainId }: { chainId: number }) => {
  const { data: blockNumber } = useBlockNumber({ chainId });
  const provider = useProvider({ chainId });

  const [baseFee, setBaseFee] = useState(BigDecimal.ZERO.exact);
  const [maxFeePerGas, setMaxFeePerGas] = useState(BigDecimal.ZERO.exact);

  useEffect(() => {
    const fetchBaseFeeAndMaxFeePerGas = async () => {
      if (!blockNumber || !provider) {
        return;
      }

      const block = await provider.getBlock(blockNumber);
      // increase base fee by 20%
      const baseFee = block.baseFeePerGas.mul(120).div(100);

      const priorityFeePerGas = ethers.utils.parseUnits('2', 'gwei');

      const maxFeePerGas = baseFee.add(priorityFeePerGas);

      setBaseFee(baseFee);
      setMaxFeePerGas(maxFeePerGas);
    };

    fetchBaseFeeAndMaxFeePerGas();
  }, [blockNumber, provider]);

  return { baseFee, maxFeePerGas };
};
