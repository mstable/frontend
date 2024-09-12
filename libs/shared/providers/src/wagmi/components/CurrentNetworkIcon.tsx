import { Arbitrum, Ethereum, Optimism, Polygon } from '@frontend/shared-icons';
import WarningAmberRounded from '@mui/icons-material/WarningAmberRounded';
import { Box } from '@mui/material';
import { Plugs } from 'phosphor-react';
import { useNetwork } from 'wagmi';
import {
  arbitrum,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
} from 'wagmi/chains';

import type { SvgIconProps } from '@mui/material';

export const CurrentNetworkIcon = (props: SvgIconProps) => {
  const { chain } = useNetwork();

  return chain?.id ? (
    chain?.unsupported ? (
      <WarningAmberRounded color="warning" {...props} />
    ) : ([polygon.id, polygonMumbai.id] as number[]).includes(chain?.id) ? (
      <Polygon {...props} sx={{ width: 24, height: 24, ...props?.sx }} />
    ) : ([optimism.id, optimismGoerli.id] as number[]).includes(chain?.id) ? (
      <Optimism {...props} sx={{ width: 24, height: 24, ...props?.sx }} />
    ) : chain.id === arbitrum.id ? (
      <Arbitrum {...props} sx={{ width: 24, height: 24, ...props?.sx }} />
    ) : (
      <Ethereum {...props} sx={{ width: 24, height: 24, ...props?.sx }} />
    )
  ) : (
    <Box sx={{ width: 24, height: 24, ...props?.sx }}>
      <Plugs size={24} />
    </Box>
  );
};
