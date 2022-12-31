import { useEffect } from 'react';

import { Explore } from '@frontend/mstable-explore';

import { useTransitionBackgroundColor } from '../components/Backgrounds';

export const Home = () => {
  const updateBkgColor = useTransitionBackgroundColor();

  useEffect(() => {
    updateBkgColor(null);
  }, [updateBkgColor]);

  return <Explore pt={{ xs: 2, md: 5 }} />;
};
