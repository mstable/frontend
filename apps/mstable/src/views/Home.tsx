import { Navigate } from '@tanstack/react-location';
import { useMount } from 'react-use';

import { useTransitionBackgroundColor } from '../components/Backgrounds';

export const Home = () => {
  const updateBkgColor = useTransitionBackgroundColor();

  useMount(() => {
    updateBkgColor(null);
  });

  return <Navigate to={`/flatcoin`} />;
};
