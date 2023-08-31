import { useCallback, useState } from 'react';

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
import { useLogAnalyticsEvent } from '@frontend/shared-providers';
import { CollapsibleSection, InfoTooltip } from '@frontend/shared-ui';
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';

import { useVault } from '../../../state';

import type { StackProps } from '@mui/material';
import type { FC, ReactNode } from 'react';

interface OverviewItemProps {
  tooltipText?: string;
  label: string;
  value?: ReactNode;
}

const OverviewItem: FC<OverviewItemProps> = ({ label, value, tooltipText }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Box display="flex" alignItems="center">
      <Typography variant="label2">{label}</Typography>
      {tooltipText && (
        <InfoTooltip
          sx={{ ml: 0.5 }}
          display="flex"
          weight="bold"
          label={tooltipText}
          size={16}
        />
      )}
    </Box>
    <Typography variant="value5">{value}</Typography>
  </Stack>
);

const useTradingTransactionOverview = () => {
  const logEvent = useLogAnalyticsEvent();
  const [isDisclosureOpen, setIsDisclosureOpen] = useState(false);
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

  const toggleDisclosureSection = useCallback(() => {
    if (!isDisclosureOpen) {
      logEvent('trading_overview_more_info_expanded');
    }
    setIsDisclosureOpen((open) => !open);
  }, [logEvent, isDisclosureOpen]);

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
    isDisclosureOpen,
    toggleDisclosureSection,
  };
};

export const TradingTransactionOverview: FC<StackProps> = (props) => {
  const intl = useIntl();
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
    toggleDisclosureSection,
    isDisclosureOpen,
  } = useTradingTransactionOverview();

  return (
    <Stack {...props} direction="column" spacing={1}>
      <OverviewItem
        label={intl.formatMessage({
          defaultMessage: 'Max slippage',
          id: 'k3YWIR',
        })}
        tooltipText={intl.formatMessage({
          defaultMessage: 'We recommend 1%, but usually it will be < 1%.',
          id: 'C9fFq/',
        })}
        value={
          <Stack direction="row" alignItems="center">
            {isMaxSlippageLoading && (
              <CircularProgress size={14} sx={{ marginRight: 1 }} />
            )}
            {maxSlippagePlaceholder}
          </Stack>
        }
      />
      <OverviewItem
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
        <OverviewItem
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
        ></OverviewItem>
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
          onToggle={toggleDisclosureSection}
        >
          <Stack direction="column" spacing={1}>
            <Divider sx={{ marginTop: 1 }} />
            <OverviewItem
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
              <OverviewItem
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
                'Due to possible high slippage on lower withdrawal amounts, please consider withdrawing a minimum of ${minWithdrawalUsd} or manually increasing the maximum slippage.',
              id: 'Tp2Mnw',
            },
            { minWithdrawalUsd },
          )}
        </Typography>
      )}
    </Stack>
  );
};
