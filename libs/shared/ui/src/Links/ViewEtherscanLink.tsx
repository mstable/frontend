import { Link } from '@mui/material';
import { useIntl } from 'react-intl';
import { mainnet } from 'wagmi/chains';

import type { LinkProps } from '@mui/material';

export type ViewEtherscanLinkProps = {
  href?: string;
  hash?: string;
  blockExplorer?: {
    name: string;
    url: string;
  };
} & Omit<LinkProps, 'href'>;

export const ViewEtherscanLink = ({
  hash,
  blockExplorer,
  href,
  ...rest
}: ViewEtherscanLinkProps) => {
  const intl = useIntl();

  return (
    <Link
      {...rest}
      href={
        href ??
        `${blockExplorer?.url ?? mainnet.blockExplorers.default.url}/tx/${
          hash ?? ''
        }`
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      {intl.formatMessage(
        {
          defaultMessage: 'View on {name}',
          id: 'W87PYU',
        },
        { name: blockExplorer?.name ?? 'Explorer' },
      )}
    </Link>
  );
};
