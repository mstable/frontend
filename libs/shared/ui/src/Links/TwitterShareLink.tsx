import { Twitter } from '@frontend/shared-icons';
import { Link, Stack } from '@mui/material';
import { useIntl } from 'react-intl';

import type { LinkProps } from '@mui/material';
import type { FC } from 'react';

const TWITTER_SHARE_BASE_URL = 'https://twitter.com/intent/tweet';
const TWITTER_HASHTAGS = ['mStable', 'dHedge', 'torosfinance'];

type TwitterButtonProps = {
  tweetText: string;
  tweetUrl: string;
  tweetHashtags?: string[];
  className?: string;
} & Omit<LinkProps, 'href'>;

const createTweetUrl = (text: string, url: string, hashtags?: string[]) =>
  `${TWITTER_SHARE_BASE_URL}?text=${encodeURIComponent(
    text,
  )}&url=${url}&hashtags=${[...TWITTER_HASHTAGS, ...(hashtags ?? [])].join(
    ',',
  )}`;

export const TwitterShareLink: FC<TwitterButtonProps> = ({
  tweetText,
  tweetUrl,
  tweetHashtags,
  ...rest
}) => {
  const intl = useIntl();
  return (
    <Link
      {...rest}
      href={createTweetUrl(tweetText, tweetUrl, tweetHashtags)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Stack direction="row" alignItems="center">
        {intl.formatMessage({
          defaultMessage: 'Share on',
          id: 'smAgyB',
        })}{' '}
        <Twitter sx={{ ml: 0.5 }} />
      </Stack>
    </Link>
  );
};
