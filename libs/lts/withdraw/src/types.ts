import type { MakeGenerics } from '@tanstack/react-location';

export type WithdrawRoute = MakeGenerics<{
  Search: {
    address: string;
  };
}>;
