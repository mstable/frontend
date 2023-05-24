import { useMemo } from 'react';

import { Metavault as Mv } from '@frontend/mstable-metavault';
import { metavaults } from '@frontend/shared-constants';
import { useMatch } from '@tanstack/react-location';
import { propEq } from 'ramda';
import { useMount } from 'react-use';
import { mainnet } from 'wagmi/chains';

import { useTransitionBackgroundColor } from '../components/Backgrounds';
import { UnsupportedVaultPage } from '../components/Errors';

import type { MvRoute } from '@frontend/mstable-metavault';

export const Metavault = () => {
  const updateBkgColor = useTransitionBackgroundColor();
  const {
    params: { mvid },
  } = useMatch<MvRoute>();
  const metavault = useMemo(
    () => metavaults[mainnet.id].find(propEq(mvid, 'id')),
    [mvid],
  );

  useMount(() => {
    if (metavault) {
      updateBkgColor(metavault.primaryColor);
    }
  });

  if (!metavault) return <UnsupportedVaultPage />;

  return <Mv />;
};
