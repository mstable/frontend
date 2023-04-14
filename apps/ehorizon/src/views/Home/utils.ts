import { getRandomColor } from '@frontend/shared-utils';
import { alpha } from '@mui/material';
import { range } from 'ramda';

import type { ScriptableContext } from 'chart.js';

export const months = range(0, 12).map((i) =>
  new Date(2021, i, 1).toLocaleString('en', { month: 'short' }),
);

const getRandomData = () => range(0, 12).map(() => Math.random() * 100);

const getRandomLabel = (n) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < n; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const getBackgroundColor =
  (tone: string) => (ctx: ScriptableContext<'line'>) => {
    const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);

    gradient?.addColorStop(0, alpha(tone, 0.4));
    gradient?.addColorStop(0.25, alpha(tone, 0.2));
    gradient?.addColorStop(1, alpha(tone, 0));

    return gradient;
  };

export const getRandomDataSet = () => {
  const color = getRandomColor();

  return {
    label: getRandomLabel(8),
    data: getRandomData(),
    borderColor: color,
    backgroundColor: getBackgroundColor(color),
    fill: true,
  };
};
