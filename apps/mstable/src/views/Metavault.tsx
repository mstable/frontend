import { useEffect, useMemo } from 'react';

import { Metavault as Mv } from '@frontend/mstable-metavault';
import { supportedMetavaults } from '@frontend/shared-constants';
import { useMatch } from '@tanstack/react-location';
import { propEq } from 'ramda';
import { useNetwork } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import { useTransitionBackgroundColor } from '../components/Backgrounds';
import { UnsupportedMvPage } from '../components/Errors';

import type { MstableRoute } from '../routes';

export const Metavault = () => {
  const updateBkgColor = useTransitionBackgroundColor();
  const { chain } = useNetwork();
  const {
    params: { mvid },
  } = useMatch<MstableRoute>();
  const metavault = useMemo(
    () => supportedMetavaults[chain?.id ?? mainnet.id].find(propEq('id', mvid)),
    [chain?.id, mvid],
  );

  useEffect(() => {
    if (metavault) {
      updateBkgColor(metavault.primaryColor);
    }
  }, [metavault, updateBkgColor]);

  if (!metavault) return <UnsupportedMvPage />;

  return <Mv pt={{ xs: 2, md: 5 }} />;
};
