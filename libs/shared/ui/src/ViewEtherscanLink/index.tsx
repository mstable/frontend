import { Link } from '@mui/material';
import { useIntl } from 'react-intl';
import { etherscanBlockExplorers } from 'wagmi';

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
      href={`${blockExplorer?.url ?? etherscanBlockExplorers.mainnet.url}/tx/${
        hash ?? ''
      }`}
      target="_blank"
      rel="noreferrer"
    >
      {intl.formatMessage(
        {
          defaultMessage: 'View on {name}',
        },
        { name: blockExplorer?.name ?? 'Etherscan' },
      )}
    </Link>
  );
};
