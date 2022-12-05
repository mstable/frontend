import { Button, Stack } from '@mui/material';
import { ArrowCounterClockwise, ArrowLeft, ArrowRight } from 'phosphor-react';
import { useIntl } from 'react-intl';

import { useSteps } from '../hooks';

import type { StackProps, SxProps } from '@mui/material';

const actionButtonSx: SxProps = {
  minWidth: 200,
};

type ControlsProps = { onClose?: () => void } & StackProps;

export const Controls = ({ onClose = () => null, ...rest }: ControlsProps) => {
  const intl = useIntl();
  const { step, handleNext, handlePrev, handleReset } = useSteps();

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={4}
      {...rest}
    >
      {
        [
          <>
            <Button color="secondary" onClick={onClose} sx={actionButtonSx}>
              {intl.formatMessage({ defaultMessage: 'Close' })}
            </Button>
            <Button color="primary" onClick={handleNext} sx={actionButtonSx}>
              {intl.formatMessage({ defaultMessage: 'Start Tour' })}
            </Button>
          </>,
          <>
            <Button
              color="secondary"
              onClick={handlePrev}
              sx={actionButtonSx}
              startIcon={<ArrowLeft size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Back' })}
            </Button>
            <Button
              color="primary"
              onClick={handleNext}
              sx={actionButtonSx}
              endIcon={<ArrowRight size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Next' })}
            </Button>
          </>,
          <>
            <Button
              color="secondary"
              onClick={handlePrev}
              sx={actionButtonSx}
              startIcon={<ArrowLeft size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Back' })}
            </Button>
            <Button
              color="primary"
              onClick={handleNext}
              sx={actionButtonSx}
              endIcon={<ArrowRight size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Next' })}
            </Button>
          </>,
          <>
            <Button
              color="secondary"
              onClick={handlePrev}
              sx={actionButtonSx}
              startIcon={<ArrowLeft size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Back' })}
            </Button>
            <Button
              color="primary"
              onClick={handleReset}
              sx={actionButtonSx}
              endIcon={<ArrowCounterClockwise size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Start Again' })}
            </Button>
          </>,
        ][step]
      }
    </Stack>
  );
};
