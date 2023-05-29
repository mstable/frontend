import { useEffect, useState } from 'react';
import { equals } from 'ramda';

const buildIconLink = (tokenName: string): string =>
  !!tokenName
    ? `https://raw.githubusercontent.com/dhedge/crypto-icons/main/icons/${tokenName.toLowerCase()}.png`
    : '';

const getIcon = async (name: string): Promise<string> => {
  return buildIconLink(name);
  // TODO: solve the issue with dynamic import
  // try {
  //   const img = await import(
  //     `@dhedge/crypto-assets/icons/${name.toLowerCase()}.png`
  //   );
  //   return img?.default ?? buildIconLink(name);
  // } catch {
  //   return buildIconLink(name);
  // }
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
