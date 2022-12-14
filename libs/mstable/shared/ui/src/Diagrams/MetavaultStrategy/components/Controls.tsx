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
      spacing={{ xs: 2, md: 4 }}
      {...rest}
    >
      {
        [
          <>
            <Button color="secondary" onClick={onClose} {...actionButtonProps}>
              {intl.formatMessage({ defaultMessage: 'Close', id: 'rbrahO' })}
            </Button>
            <Button color="primary" onClick={handleNext} {...actionButtonProps}>
              {intl.formatMessage({
                defaultMessage: 'Start Tour',
                id: 'aad9T5',
              })}
            </Button>
          </>,
          <>
            <Button
              color="secondary"
              onClick={handlePrev}
              {...actionButtonProps}
              startIcon={<ArrowLeft size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Back', id: 'cyR7Kh' })}
            </Button>
            <Button
              color="primary"
              onClick={handleNext}
              {...actionButtonProps}
              endIcon={<ArrowRight size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Next', id: '9+Ddtu' })}
            </Button>
          </>,
          <>
            <Button
              color="secondary"
              onClick={handlePrev}
              {...actionButtonProps}
              startIcon={<ArrowLeft size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Back', id: 'cyR7Kh' })}
            </Button>
            <Button
              color="primary"
              onClick={handleNext}
              {...actionButtonProps}
              endIcon={<ArrowRight size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Next', id: '9+Ddtu' })}
            </Button>
          </>,
          <>
            <Button
              color="secondary"
              onClick={handlePrev}
              {...actionButtonProps}
              startIcon={<ArrowLeft size={16} />}
            >
              {intl.formatMessage({ defaultMessage: 'Back', id: 'cyR7Kh' })}
            </Button>
            <Button
              color="primary"
              onClick={handleReset}
              {...actionButtonProps}
              endIcon={<ArrowCounterClockwise size={16} />}
            >
              {intl.formatMessage({
                defaultMessage: 'Start Again',
                id: '4tvRCp',
              })}
            </Button>
          </>,
        ][step]
      }
    </Stack>
  );
};
