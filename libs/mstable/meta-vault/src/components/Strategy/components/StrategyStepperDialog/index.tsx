import { useEffect, useLayoutEffect } from 'react';

import { useTrack } from '@frontend/shared-analytics';
import { Dialog } from '@frontend/shared-ui';
import { Button, Stack } from '@mui/material';
import { ArrowLeft, ArrowRight } from 'phosphor-react';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useSteps } from './hooks';
import { Provider } from './state';
import { Deposit } from './steps/Deposit';
import { Home } from './steps/Home';
import { Metavault } from './steps/Metavault';
import { Withdraw } from './steps/Withdraw';

import type { DialogProps } from '@frontend/shared-ui';
import type { SxProps } from '@mui/material';

type StrategyStepperDialogProps = Pick<DialogProps, 'onClose'>;

const actionButtonSx: SxProps = {
  minWidth: 200,
};

const StrategyStepperDialogWrapped = (props: StrategyStepperDialogProps) => {
  const intl = useIntl();
  const track = useTrack();
  const { address } = useAccount();
  const { activeStep, handleNext, handlePrev, handleReset } = useSteps();

  useLayoutEffect(() => {
    handleReset();
  }, [handleReset]);

  useEffect(() => {
    track('view_strategy', { address: address ?? 'not_connected' });
  }, [address, track]);

  return (
    <Dialog
      {...props}
      open
      fullWidth
      maxWidth="lg"
      title={intl.formatMessage({ defaultMessage: 'Visualize strategy' })}
      content={
        <Stack pt={8}>
          {
            {
              home: <Home />,
              deposit: <Deposit />,
              metavault: <Metavault />,
              withdraw: <Withdraw />,
            }[activeStep]
          }
        </Stack>
      }
      actions={(handleClose) => (
        <Stack
          width={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          pt={4}
        >
          {
            {
              home: (
                <>
                  <Button
                    color="secondary"
                    onClick={handleClose}
                    sx={actionButtonSx}
                  >
                    {intl.formatMessage({ defaultMessage: 'Close' })}
                  </Button>
                  <Button
                    color="primary"
                    onClick={handleNext}
                    sx={actionButtonSx}
                  >
                    {intl.formatMessage({ defaultMessage: 'Start Tour' })}
                  </Button>
                </>
              ),
              deposit: (
                <>
                  <Button
                    color="secondary"
                    onClick={handleClose}
                    sx={actionButtonSx}
                  >
                    {intl.formatMessage({ defaultMessage: 'Close' })}
                  </Button>
                  <Button
                    color="primary"
                    onClick={handleNext}
                    sx={{ ...actionButtonSx, svg: { ml: 1 } }}
                  >
                    {intl.formatMessage({ defaultMessage: 'Next' })}
                    <ArrowRight />
                  </Button>
                </>
              ),
              metavault: (
                <>
                  <Button
                    color="secondary"
                    onClick={handlePrev}
                    sx={{ ...actionButtonSx, svg: { mr: 1 } }}
                  >
                    <ArrowLeft />
                    {intl.formatMessage({ defaultMessage: 'Back' })}
                  </Button>
                  <Button
                    color="primary"
                    onClick={handleNext}
                    sx={{ ...actionButtonSx, svg: { ml: 1 } }}
                  >
                    {intl.formatMessage({ defaultMessage: 'Next' })}
                    <ArrowRight />
                  </Button>
                </>
              ),
              withdraw: (
                <>
                  <Button
                    color="secondary"
                    onClick={handleClose}
                    sx={actionButtonSx}
                  >
                    {intl.formatMessage({ defaultMessage: 'Close' })}
                  </Button>
                  <Button
                    color="primary"
                    onClick={handleReset}
                    sx={{ ...actionButtonSx, svg: { ml: 1 } }}
                  >
                    {intl.formatMessage({ defaultMessage: 'Start Again' })}
                    <ArrowRight />
                  </Button>
                </>
              ),
            }[activeStep]
          }
        </Stack>
      )}
    />
  );
};

export const StrategyStepperDialog = (props: StrategyStepperDialogProps) => (
  <Provider>
    <StrategyStepperDialogWrapped {...props} />
  </Provider>
);
