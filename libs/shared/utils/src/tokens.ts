export const buildIconLink = (tokenName: string): string =>
  tokenName
    ? `https://raw.githubusercontent.com/dhedge/crypto-icons/main/icons/${tokenName.toLowerCase()}.png`
    : '';
