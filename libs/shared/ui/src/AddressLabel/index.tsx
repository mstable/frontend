import { useEffect, useState } from 'react';

import { Check, ContentCopy, Error, OpenInNew } from '@mui/icons-material';
import { Button, Divider, Stack } from '@mui/material';

import { MiddleTruncated } from '../Typography';

const ETHERSCAN_URL = 'https://etherscan.io/address/';

export type AddressLabelProps = {
  address: string;
  hideCopyToClipboard?: boolean;
  hideEtherscan?: boolean;
};

export const AddressLabel = ({
  address,
  hideCopyToClipboard = false,
  hideEtherscan = false,
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
        <Button
          href={`${ETHERSCAN_URL}${address}`}
          target="_blank"
          variant="text"
          size="small"
        >
          <OpenInNew fontSize="small" />
        </Button>
      )}
      {!hideCopyToClipboard && (
        <Button
          onClick={handleCopyToClipboard}
          variant="text"
          size="small"
          disabled={['copied', 'error'].includes(copied)}
        >
          {copied === 'idle' ? (
            <ContentCopy fontSize="small" />
          ) : copied === 'copied' ? (
            <Check color="success" fontSize="small" />
          ) : (
            <Error color="error" fontSize="small" />
          )}
        </Button>
      )}
    </Stack>
  );
};
