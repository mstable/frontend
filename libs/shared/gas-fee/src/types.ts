export type GasPriceConfig = 'fast' | 'average' | 'slow';

export type GasPrices = Record<GasPriceConfig, number | null>;
