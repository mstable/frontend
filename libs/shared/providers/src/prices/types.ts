// ISO 4217 currency codes
export type SupportedCurrency = 'USD' | 'EUR';

export type SupportedCoingeckoId = 'ethereum' | 'matic-network';

export type SupportedPrices = Record<SupportedCoingeckoId, number | null>;

export type UseTokenPriceHistoryRequest = {
  // to be extended https://www.coingecko.com/en/api/documentation
  tokenId: 'ethereum';
  // UNIX Timestamp
  from: number;
  //  UNIX Timestamp
  to: number;
};

export type UseTokenPriceHistoryResponse = [timestamp: number, price: number][];
