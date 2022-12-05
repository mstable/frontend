import { Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import { ArrowCounterClockwise, ArrowLeft, ArrowRight } from 'phosphor-react';
import { useIntl } from 'react-intl';

import { useSteps } from '../hooks';

import type { ButtonProps, StackProps } from '@mui/material';

type ControlsProps = { onClose?: () => void } & StackProps;

export const Controls = ({ onClose = () => null, ...rest }: ControlsProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { step, handleNext, handlePrev, handleReset } = useSteps();

  const actionButtonProps: ButtonProps = {
    fullWidth: isMobile,
    sx: {
      minWidth: isMobile ? 0 : 200,
    },
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={{ xs: 1, md: 4 }}
      {...rest}
    >
      {
        [
          <>
            <Button color="secondary" onClick={onClose} {...actionButtonProps}>
              {intl.formatMessage({ defaultMessage: 'Close' })}
            </Button>
            <Button color="primary" onClick={handleNext} {...actionButtonProps}>
              {intl.formatMessage({ defaultMessage: 'Start Tour' })}
            </Button>
          </>,
          <>
            <Button
              color="secondary"
              onClick={handlePrev}
              {...actionButtonProps}
              startIcon={<ArrowLeft size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Back' })}
            </Button>
            <Button
              color="primary"
              onClick={handleNext}
              {...actionButtonProps}
              endIcon={<ArrowRight size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Next' })}
            </Button>
          </>,
          <>
            <Button
              color="secondary"
              onClick={handlePrev}
              {...actionButtonProps}
              startIcon={<ArrowLeft size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Back' })}
            </Button>
            <Button
              color="primary"
              onClick={handleNext}
              {...actionButtonProps}
              endIcon={<ArrowRight size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Next' })}
            </Button>
          </>,
          <>
            <Button
              color="secondary"
              onClick={handlePrev}
              {...actionButtonProps}
              startIcon={<ArrowLeft size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Back' })}
            </Button>
            <Button
              color="primary"
              onClick={handleReset}
              {...actionButtonProps}
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
