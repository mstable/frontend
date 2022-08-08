export type SupportedCurrency = 'usd' | 'eur';

export type SupportedCoingeckoId = 'ethereum' | 'matic-network';

export type SupportedPrices = Record<SupportedCoingeckoId, number | null>;
