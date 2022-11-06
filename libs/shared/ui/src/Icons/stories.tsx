import { Stack, Typography } from '@mui/material';

import { ChainIcon as ChIcon, supportedChains } from './Chain';
import { ExpandIcon as ExIcon } from './ExpandIcon';
import { MVIcon as MvIcon, supportedMVs } from './Metavault';
import { ProtocolIcon as PrIcon, supportedProtocols } from './Protocol';
import { SeverityIcon as SeIcon } from './SeverityIcon';
import { supportedTokens, TokenIcon as ToIcon } from './Token';

import type { Children } from '@frontend/shared-utils';
import type { AlertColor, StackProps, SvgIconProps } from '@mui/material';

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
    width: 40,
    height: 40,
  },
};

type IconCardProps = { label: string } & Children & StackProps;

const IconCard = ({ label, children, ...rest }: IconCardProps) => (
  <Stack direction="column" alignItems="center" spacing={1} {...rest}>
    {children}
    <Typography variant="label2" textAlign="center">
      {label}
    </Typography>
  </Stack>
);

export const ChainIcon = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={4}>
      {Object.keys(supportedChains).map((key) => (
        <IconCard key={key} label={key}>
          <ChIcon name={key} {...iconProps} />
        </IconCard>
      ))}
      <IconCard label="default">
        <ChIcon name="" {...iconProps} />
      </IconCard>
    </Stack>
  </Stack>
);

export const ExpandIcon = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={4}>
      <ExIcon expanded {...iconProps} />
      <ExIcon {...iconProps} />
    </Stack>
  </Stack>
);

export const MVIcon = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={4}>
      {Object.keys(supportedMVs).map((key) => (
        <IconCard key={key} label={key}>
          <MvIcon address={key} {...iconProps} />
        </IconCard>
      ))}
      <IconCard label="default">
        <MvIcon address="default" {...iconProps} />
      </IconCard>
    </Stack>
  </Stack>
);

export const ProtocolIcon = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={4}>
      {Object.keys(supportedProtocols).map((key) => (
        <IconCard key={key} label={key}>
          <PrIcon name={key} {...iconProps} />
        </IconCard>
      ))}
      <IconCard label="default">
        <PrIcon name="default" {...iconProps} />
      </IconCard>
    </Stack>
  </Stack>
);

export const SeverityIcon = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={4}>
      {['error', 'info', 'success', 'warning'].map((key) => (
        <IconCard key={key} label={key}>
          <SeIcon severity={key as AlertColor} {...iconProps} />
        </IconCard>
      ))}
    </Stack>
  </Stack>
);

export const TokenIcon = () => (
  <Stack direction="column" spacing={2} p={2}>
    <Stack direction="row" spacing={4}>
      {Object.keys(supportedTokens).map((key) => (
        <IconCard key={key} label={key}>
          <ToIcon symbol={key} {...iconProps} />
        </IconCard>
      ))}
      <IconCard label="default">
        <ToIcon symbol="default" {...iconProps} />
      </IconCard>
    </Stack>
  </Stack>
);
