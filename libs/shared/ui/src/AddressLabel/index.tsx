import { useEffect, useState } from 'react';

import { Check, ContentCopy, Error, OpenInNew } from '@mui/icons-material';
import { IconButton, Link, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { etherscanBlockExplorers } from 'wagmi';

import { MiddleTruncated } from '../Typography';

import type { StackProps } from '@mui/material';

export type AddressType = 'address' | 'transaction';

export type AddressLabelProps = {
  address: string;
  type?: AddressType;
  hideCopyToClipboard?: boolean;
  hideEtherscan?: boolean;
  small?: boolean;
  link?: boolean;
  blockExplorerUrl?: string;
} & StackProps;

const urlMapping: Record<AddressType, string> = {
  address: 'address',
  transaction: 'tx',
};

export const AddressLabel = ({
  address,
  type = 'address',
  hideCopyToClipboard = false,
  hideEtherscan = false,
  small = false,
  link = false,
  blockExplorerUrl = etherscanBlockExplorers.mainnet.url,
  ...rest
}: AddressLabelProps) => {
  const intl = useIntl();
  const [copied, setCopied] = useState('idle');

  useEffect(() => {
    if (copied !== 'idle') {
      setTimeout(() => {
        setCopied('idle');
      }, 1000);
    }
  }, [copied]);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied('copied');
    } catch {
      setCopied('error');
    }
  };

  return (
    <Stack direction="row" alignItems="center" {...rest} flexWrap="nowrap">
      {link ? (
        <Link
          href={[blockExplorerUrl, urlMapping[type], address].join('/')}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            width: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            svg: {
              marginBottom: small ? 0 : '2px',
            },
          }}
        >
          <MiddleTruncated
            typographyProps={{
              fontWeight: 'medium',
              letterSpacing: 1.1,
              sx: {
                fontSize: small ? 14 : 16,
                userSelect: 'none',
                fontFamily: ['PT Mono', 'monospace'].join(','),
              },
            }}
            pr={1}
          >
            {address}
          </MiddleTruncated>
          <OpenInNew sx={{ fontSize: small ? 14 : 16 }} />
        </Link>
      ) : (
        <MiddleTruncated
          typographyProps={{
            fontWeight: 'medium',
            letterSpacing: 1.1,
            sx: {
              fontSize: small ? 14 : 16,
              userSelect: 'none',
              fontFamily: ['PT Mono', 'monospace'].join(','),
            },
          }}
          pr={1}
        >
          {address}
        </MiddleTruncated>
      )}

      {!hideEtherscan && !link && (
        <IconButton
          href={[blockExplorerUrl, urlMapping[type], address].join('/')}
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          size={small ? 'small' : 'medium'}
        >
          <OpenInNew sx={{ fontSize: small ? 14 : 16 }} />
        </IconButton>
      )}

      {!hideCopyToClipboard && (
        <IconButton
          onClick={handleCopyToClipboard}
          disabled={['copied', 'error'].includes(copied)}
          sx={{
            color: link ? 'info.dark' : 'inherit',
            ':hover': {
              color: link ? 'info.main' : 'inherit',
            },
          }}
        >
          {copied === 'idle' ? (
            <ContentCopy sx={{ fontSize: small ? 14 : 16 }} />
          ) : copied === 'copied' ? (
            <Typography
              variant="value6"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                color: 'text.secondary',
              }}
            >
              <Check
                color="success"
                sx={{ fontSize: small ? 14 : 16, mr: 0.5 }}
              />
              {intl.formatMessage({ defaultMessage: 'Copied', id: 'p556q3' })}
            </Typography>
          ) : (
            <Error color="error" sx={{ fontSize: small ? 14 : 16 }} />
          )}
        </IconButton>
      )}
    </Stack>
  );
};
