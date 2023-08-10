import { useState } from 'react';

import {
  usePoolFees,
  usePoolManagerLogicData,
} from '@dhedge/core-ui-kit/hooks/pool';
import {
  useIsDepositTradingPanelType,
  useTradingPanelLockTime,
  useTradingPanelSettings,
} from '@dhedge/core-ui-kit/hooks/state';
import {
  useMaxSlippagePlaceholder,
  useMinReceiveText,
} from '@dhedge/core-ui-kit/hooks/trading';
import { formatToUsd } from '@dhedge/core-ui-kit/utils';
import { RECOMMENDED_MIN_SLIPPAGE } from '@frontend/shared-constants';
import { CollapsibleSection, TradingOverviewItem } from '@frontend/shared-ui';
import { CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useVault } from '../../../state';

import type { StackProps } from '@mui/material';
import type { FC } from 'react';

const useTradingTransactionOverview = () => {
  const {
    meta: { minWithdrawalUsd },
    config: { address, chainId },
  } = useVault();
  const [{ slippage, minSlippage, isMaxSlippageLoading }] =
    useTradingPanelSettings();
  const { entryFee, hasPoolEntryFee } = usePoolFees({ address, chainId });
  const { minDepositUSD } = usePoolManagerLogicData(address, chainId);
  const lockTime = useTradingPanelLockTime();
  const isDeposit = useIsDepositTradingPanelType();
  const minReceivedText = useMinReceiveText();
  const maxSlippagePlaceholder = useMaxSlippagePlaceholder();
  const showMinRecommendedSlippage = !isDeposit && slippage !== 'auto';

  return {
    maxSlippagePlaceholder: `${maxSlippagePlaceholder}%`,
    minReceivedText,
    isMaxSlippageLoading,
    showMinRecommendedSlippage,
    minSlippage,
    isDeposit,
    hasPoolEntryFee,
    entryFee,
    hasMinDeposit: !!minDepositUSD && isDeposit,
    minDeposit: formatToUsd({ value: minDepositUSD, minimumFractionDigits: 0 }),
    lockTime,
    minWithdrawalUsd,
  };
};

export const TradingTransactionOverview: FC<StackProps> = (props) => {
  const intl = useIntl();
  const [isDisclosureOpen, setIsDisclosureOpen] = useState(false);
  const {
    maxSlippagePlaceholder,
    minReceivedText,
    isMaxSlippageLoading,
    showMinRecommendedSlippage,
    minSlippage,
    isDeposit,
    hasPoolEntryFee,
    entryFee,
    hasMinDeposit,
    minDeposit,
    lockTime,
    minWithdrawalUsd,
  } = useTradingTransactionOverview();

  return (
    <Stack {...props} direction="column" spacing={1}>
      <TradingOverviewItem
        label={intl.formatMessage({
          defaultMessage: 'Max slippage',
          id: 'k3YWIR',
        })}
        tooltipText={intl.formatMessage(
          {
            defaultMessage:
              'We recommend {slippage}%, but usually it will be < {slippage}%.',
            id: 'OkOAzx',
          },
          { slippage: RECOMMENDED_MIN_SLIPPAGE },
        )}
        value={
          <Stack direction="row" alignItems="center">
            {isMaxSlippageLoading && (
              <CircularProgress size={14} sx={{ marginRight: 1 }} />
            )}
            {maxSlippagePlaceholder}
          </Stack>
        }
      />
      <TradingOverviewItem
        label={intl.formatMessage({
          defaultMessage: 'Minimum received',
          id: '5gorcB',
        })}
        tooltipText={intl.formatMessage({
          defaultMessage: 'You will receive no less than this amount.',
          id: 'X/I7ge',
        })}
        value={minReceivedText}
      />
      {showMinRecommendedSlippage && (
        <TradingOverviewItem
          label={intl.formatMessage({
            defaultMessage: 'Recommended min slippage',
            id: 'S0seuN',
          })}
          tooltipText={intl.formatMessage({
            defaultMessage:
              'Flexible min slippage value that is likely enough to process the transaction.',
            id: '1vtEYS',
          })}
          value={typeof minSlippage === 'number' ? `${minSlippage}%` : '-'}
        />
      )}
      {isDeposit && (
        <CollapsibleSection
          title={intl.formatMessage({
            defaultMessage: 'More info',
            id: 'HOsSgX',
          })}
          components={{
            title: { sx: { typography: 'label2' } },
            titleContainer: { sx: { padding: 0 } },
            childrenContainer: { sx: { padding: 0 } },
          }}
          iconPosition="end"
          open={isDisclosureOpen}
          onToggle={() => setIsDisclosureOpen((open) => !open)}
        >
          <Stack direction="column" spacing={1}>
            <Divider sx={{ marginTop: 1 }} />
            <TradingOverviewItem
              tooltipText={
                hasPoolEntryFee
                  ? intl.formatMessage({
                      defaultMessage:
                        'Entry fees are collected during deposit. The entry fee is distributed to all token holders to pay for rebalancing costs after new deposits.',
                      id: 'uBC8fe',
                    })
                  : null
              }
              label={intl.formatMessage({
                defaultMessage: 'Entry fee',
                id: 'i0ofjL',
              })}
              value={entryFee}
            />
            {hasMinDeposit && (
              <TradingOverviewItem
                label={intl.formatMessage({
                  defaultMessage: 'Minimum deposit',
                  id: 't3IytM',
                })}
                tooltipText={intl.formatMessage({
                  defaultMessage: 'Minimum deposit in USD.',
                  id: 'b1gVRq',
                })}
                value={minDeposit}
              />
            )}
            <Typography variant="label2" color="text.secondary">
              Purchased tokens will have a {lockTime} lock.
            </Typography>
          </Stack>
        </CollapsibleSection>
      )}
      {!isDeposit && minWithdrawalUsd && (
        <Typography variant="hint" color="warning.dark">
          {intl.formatMessage(
            {
              defaultMessage:
                'Due to high slippage on lower withdrawal amounts, please consider withdrawing a minimum of ${minWithdrawalUsd} or manually increasing the maximum slippage.',
              id: 'QrqA2G',
            },
            { minWithdrawalUsd },
          )}
        </Typography>
      )}
    </Stack>
  );
};
