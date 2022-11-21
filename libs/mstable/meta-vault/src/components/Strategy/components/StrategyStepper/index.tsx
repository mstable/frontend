import { CurveProtocol, MVault, USDC, User } from '@frontend/shared-icons';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';

import { ArrowRight, IconContainer } from './components/Containers';

export const StrategyStepper = () => {
  const intl = useIntl();

  return (
    <Dialog open fullWidth maxWidth="lg">
      <DialogTitle>
        {intl.formatMessage({ defaultMessage: 'Visualize strategy' })}
      </DialogTitle>
      <DialogContent>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <User sx={{ fontSize: 56 }} />
          <ArrowRight width={1} />
          <IconContainer>
            <USDC />
            <Typography>USDC</Typography>
          </IconContainer>
          <ArrowRight width={1} />
          <IconContainer minWidth={300} justifyContent="center">
            <MVault />
            <Typography>Meta Vault</Typography>
          </IconContainer>
          <ArrowRight width={1} />
          <IconContainer>
            <USDC />
            <Typography>USDC</Typography>
          </IconContainer>
          <ArrowRight width={1} />
          <User sx={{ fontSize: 56 }} />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={0.5}
        ></Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={0.5}
        >
          <IconContainer>
            <CurveProtocol />
            <Typography>mUSD/3CRV</Typography>
          </IconContainer>
          <IconContainer>
            <CurveProtocol />
            <Typography>BUSD/3CRV</Typography>
          </IconContainer>
          <IconContainer>
            <CurveProtocol />
            <Typography>FRAX/3CRV</Typography>
          </IconContainer>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
