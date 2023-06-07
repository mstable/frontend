import { Explore } from '@frontend/mstable-explore';
import { SunsetBanner } from '@frontend/shared-ui';
import { useMount } from 'react-use';

import { useTransitionBackgroundColor } from '../components/Backgrounds';

export const Home = () => {
  const updateBkgColor = useTransitionBackgroundColor();

  useMount(() => {
    updateBkgColor(null);
  });

  return (
    <>
      <SunsetBanner borderRadius={3} my={4} />
      <Explore />
    </>
  );
};
