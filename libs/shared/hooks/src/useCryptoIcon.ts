import { useEffect, useState } from 'react';
import { equals } from 'ramda';
import { buildIconLink } from '@frontend/shared-utils';

const getIcon = async (name: string): Promise<string> => {
  try {
    // requires relative path
    const img = await import(
      `../../../../node_modules/@dhedge/crypto-assets/icons/${name.toLowerCase()}.png`
    );
    return img?.default ?? buildIconLink(name);
  } catch {
    return buildIconLink(name);
  }
};

export const useCryptoIcon = (iconSymbols: string[] = []): string[] => {
  const [icons, setIcons] = useState<string[]>([]);
  const [fetchedIcons, setFetchedIcons] = useState<string[]>([]);

  useEffect(() => {
    if (equals(iconSymbols, fetchedIcons)) return;

    const fetchIcons = async () => {
      const icons = await Promise.all<string>(iconSymbols.map(getIcon));
      setIcons(icons);
      setFetchedIcons(iconSymbols);
    };

    fetchIcons();
  }, [iconSymbols, fetchedIcons]);

  return icons;
};
