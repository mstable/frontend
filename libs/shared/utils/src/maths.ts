export const countDecimals = (value: number) => {
  if (Math.floor(value) === value) return 0;

  return value.toString().split('.')[1].length || 0;
};

export const countFirstDecimal = (value: number) => {
  if (Math.floor(value) === value) return 0;

  const dec = value.toString().split('.')[1];
  let digits = 0;
  for (const v of dec) {
    digits += 1;
    if (v !== '0') {
      break;
    }
  }

  return digits;
};
