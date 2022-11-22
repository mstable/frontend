import { useLayoutEffect } from 'react';

import { Dialog } from '@frontend/shared-ui';
import { Button, Stack } from '@mui/material';
import { ArrowLeft, ArrowRight } from 'phosphor-react';
import { useIntl } from 'react-intl';

import { StepNavigator } from './components/StepNavigator';
import { useSteps } from './hooks';
import { Provider } from './state';
import { Deposit } from './steps/Deposit';
import { Home } from './steps/Home';
import { Metavault } from './steps/Metavault';
import { Withdraw } from './steps/Withdraw';

import type { DialogProps } from '@frontend/shared-ui';
import type { ButtonProps } from '@mui/material';

type StrategyStepperDialogProps = Pick<DialogProps, 'open' | 'onClose'>;

const actionButtonProps: ButtonProps = {
  sx: {
    minWidth: 200,
  },
};

const StrategyStepperDialogWrapped = (props: StrategyStepperDialogProps) => {
  const intl = useIntl();
  const { activeStep, handleNext, handlePrev, handleReset } = useSteps();

  useLayoutEffect(() => {
    if (props.open) {
      handleReset();
    }
  }, [handleReset, props.open]);

  return (
    <Dialog
      {...props}
      fullWidth
      maxWidth="lg"
      title={intl.formatMessage({ defaultMessage: 'Visualize strategy' })}
      content={
        <StepNavigator pt={8} hideNavigation={activeStep === 'home'}>
          {
            {
              home: <Home />,
              deposit: <Deposit />,
              metavault: <Metavault />,
              withdraw: <Withdraw />,
            }[activeStep]
          }
        </StepNavigator>
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
                    {...actionButtonProps}
                    onClick={handleClose}
                  >
                    {intl.formatMessage({ defaultMessage: 'Close' })}
                  </Button>
                  <Button
                    color="primary"
                    {...actionButtonProps}
                    onClick={handleNext}
                  >
                    {intl.formatMessage({ defaultMessage: 'Start Tour' })}
                  </Button>
                </>
              ),
              deposit: (
                <>
                  <Button
                    color="secondary"
                    {...actionButtonProps}
                    onClick={handleClose}
                  >
                    {intl.formatMessage({ defaultMessage: 'Close' })}
                  </Button>
                  <Button
                    color="primary"
                    {...actionButtonProps}
                    onClick={handleNext}
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
                    {...actionButtonProps}
                    onClick={handlePrev}
                  >
                    <ArrowLeft />
                    {intl.formatMessage({ defaultMessage: 'Back' })}
                  </Button>
                  <Button
                    color="primary"
                    {...actionButtonProps}
                    onClick={handleNext}
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
                    {...actionButtonProps}
                    onClick={handleClose}
                  >
                    {intl.formatMessage({ defaultMessage: 'Close' })}
                  </Button>
                  <Button
                    color="primary"
                    {...actionButtonProps}
                    onClick={handleReset}
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
