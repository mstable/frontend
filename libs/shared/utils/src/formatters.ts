export const middleTruncate = (address: string, start = 6, end = 4): string =>
  `${address.slice(0, start)}…${address.slice(-end)}`;
