// ISO 4217 currency codes
export type SupportedCurrency = 'USD' | 'EUR';

export type SupportedCoingeckoId = 'ethereum' | 'matic-network';

export type SupportedPrices = Record<SupportedCoingeckoId, number | null>;
