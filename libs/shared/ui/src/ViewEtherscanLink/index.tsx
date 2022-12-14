import { Link } from '@mui/material';
import { useIntl } from 'react-intl';
import {} from 'wagmi';
import { mainnet } from 'wagmi/chains';

import type { LinkProps } from '@mui/material';

export type ViewEtherscanLinkProps = {
  hash?: string;
  blockExplorer?: {
    name: string;
    url: string;
  };
} & Omit<LinkProps, 'href'>;

export const ViewEtherscanLink = ({
  hash,
  blockExplorer,
  ...rest
}: ViewEtherscanLinkProps) => {
  const intl = useIntl();

  return (
    <Link
      {...rest}
      href={`${blockExplorer?.url ?? mainnet.blockExplorers.default.url}/tx/${
        hash ?? ''
      }`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {intl.formatMessage(
        {
          defaultMessage: 'View on {name}',
          id: 'W87PYU',
        },
        { name: blockExplorer?.name ?? 'Etherscan' },
      )}
    </Link>
  );
};
