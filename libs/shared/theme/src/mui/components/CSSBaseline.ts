import type { Theme, ThemeOptions } from '@mui/material';

export const getCSSBaseline = (base: Theme): ThemeOptions => ({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
            font-family: 'Plus Jakarta Sans';
          }

          @font-face {
            font-family: 'PT Mono';
          }

          body {
            font-family: ${base.typography.fontFamily};
            font-weight: ${base.typography.body1.fontWeight};
            font-size: ${base.typography.body1.fontSize}px;
            line-height: ${base.typography.body1.lineHeight};
            letter-spacing: ${base.typography.body1.letterSpacing};
            color: ${base.palette.text.primary};
            background-color: ${base.palette.background.default}
          }
        `,
    },
  },
});
