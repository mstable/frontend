import { Grid, Stack, Typography } from '@mui/material';

import { ChainIcon as ChIcon, supportedChainName } from './Chain';
import { ExpandIcon as ExIcon } from './ExpandIcon';
import { MVIcon as MvIcon, supportedMVs } from './Metavault';
import { ProtocolIcon as PrIcon, supportedProtocols } from './Protocol';
import { SeverityIcon as SeIcon } from './SeverityIcon';
import { supportedTokens, TokenIcon as ToIcon } from './Token';

import type { Children } from '@frontend/shared-utils';
import type { AlertColor, GridProps, SvgIconProps } from '@mui/material';

export default {
  title: 'Components/Icons',
  subcomponents: {
    ChainIcon: ChIcon,
    ExpandIcon: ExIcon,
    MVIcon: MvIcon,
    ProtocolIcon: PrIcon,
    TokenIcon: ToIcon,
    SeverityIcon: SeIcon,
  },
};

const iconProps: SvgIconProps = {
  sx: {
    width: 60,
    height: 60,
  },
};

type IconCardProps = { label: string } & Children & GridProps;

const IconCard = ({ label, children, ...rest }: IconCardProps) => (
  <Grid item xs {...rest}>
    <Stack direction="column" alignItems="center" spacing={1}>
      {children}
      <Typography variant="label2" textAlign="center">
        {label}
      </Typography>
    </Stack>
  </Grid>
);

const IconGrid = ({ children }: Children) => (
  <Grid container spacing={2} padding={2}>
    {children}
  </Grid>
);

export const ChainIcon = () => (
  <IconGrid>
    {Object.keys(supportedChainName).map((key) => (
      <IconCard key={key} label={key}>
        <ChIcon name={key} {...iconProps} />
      </IconCard>
    ))}
    <IconCard label="default">
      <ChIcon name="" {...iconProps} />
    </IconCard>
  </IconGrid>
);

export const ExpandIcon = () => (
  <IconGrid>
    <ExIcon expanded {...iconProps} />
    <ExIcon {...iconProps} />
  </IconGrid>
);

export const MVIcon = () => (
  <IconGrid>
    {Object.keys(supportedMVs).map((key) => (
      <IconCard key={key} label={key}>
        <MvIcon address={key} {...iconProps} />
      </IconCard>
    ))}
    <IconCard label="default">
      <MvIcon address="default" {...iconProps} />
    </IconCard>
  </IconGrid>
);

export const ProtocolIcon = () => (
  <IconGrid>
    {Object.keys(supportedProtocols).map((key) => (
      <IconCard key={key} label={key}>
        <PrIcon name={key} {...iconProps} />
      </IconCard>
    ))}
    <IconCard label="default">
      <PrIcon name="default" {...iconProps} />
    </IconCard>
  </IconGrid>
);

export const SeverityIcon = () => (
  <IconGrid>
    {['error', 'info', 'success', 'warning'].map((key) => (
      <IconCard key={key} label={key}>
        <SeIcon severity={key as AlertColor} {...iconProps} />
      </IconCard>
    ))}
  </IconGrid>
);

export const TokenIcon = () => (
  <IconGrid>
    {Object.keys(supportedTokens).map((key) => (
      <IconCard key={key} label={key}>
        <ToIcon symbol={key} {...iconProps} />
      </IconCard>
    ))}
    <IconCard label="default">
      <ToIcon symbol="default" {...iconProps} />
    </IconCard>
  </IconGrid>
);
