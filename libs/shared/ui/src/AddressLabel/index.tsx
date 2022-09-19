import { useEffect, useState } from 'react';

import { Check, ContentCopy, Error, OpenInNew } from '@mui/icons-material';
import { Divider, IconButton, Stack } from '@mui/material';

import { MiddleTruncated } from '../Typography';

const ETHERSCAN_URL = 'https://etherscan.io/address/';

export type AddressLabelProps = {
  address: string;
  hideCopyToClipboard?: boolean;
  hideEtherscan?: boolean;
  small?: boolean;
};

export const AddressLabel = ({
  address,
  hideCopyToClipboard = false,
  hideEtherscan = false,
  small = false,
}: AddressLabelProps) => {
  const [copied, setCopied] = useState('idle');

  useEffect(() => {
    if (copied !== 'idle') {
      setTimeout(() => {
        setCopied('idle');
      }, 500);
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
    <Stack
      direction="row"
      flexWrap="nowrap"
      alignItems="center"
      divider={<Divider orientation="vertical" flexItem />}
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
        flexGrow={1}
        pr={1}
      >
        {address}
      </MiddleTruncated>
      {!hideEtherscan && (
        <IconButton
          href={`${ETHERSCAN_URL}${address}`}
          target="_blank"
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
          color="inherit"
        >
          {copied === 'idle' ? (
            <ContentCopy sx={{ fontSize: small ? 14 : 16 }} />
          ) : copied === 'copied' ? (
            <Check color="success" sx={{ fontSize: small ? 14 : 16 }} />
          ) : (
            <Error color="error" sx={{ fontSize: small ? 14 : 16 }} />
          )}
        </IconButton>
      )}
    </Stack>
  );
};
