/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Contract } from '../types';

export type Token = { symbol: string; decimals: number } & Contract;
