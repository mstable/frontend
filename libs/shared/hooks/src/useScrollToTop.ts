import { useLocation } from '@tanstack/react-location';
import { useEffect } from 'react';

export const useScrollToTop = () => {
  const {
    history: {
      location: { pathname },
    },
  } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
};
