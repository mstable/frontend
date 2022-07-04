import type { TypographyStyle } from '@mui/material';

// declare module '@mui/material/styles/createPalette' {
//   interface TypeAction {
//     disabledBorder: string;
//     disabledFieldBackground: string;
//   }

//   interface TypeBackground {
//     overlay: string;
//   }

//   interface TypeText {
//     error: string;
//     link: string;
//   }
// }

declare module '@mui/material/styles' {
  // interface Border {
  //   default: string;
  //   heavy: string;
  // }

  interface TypographyVariants {
    fontFamilies: Record<'main' | 'code', string>;
    fontSizes: Record<'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl', number>;
    lineHeights: Record<'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl', number | string>;
    letterSpacings: Record<'short' | 'normal' | 'space', string>;
    value1: TypographyStyle;
    value2: TypographyStyle;
    value3: TypographyStyle;
    value4: TypographyStyle;
    value5: TypographyStyle;
  }

  interface TypographyVariantsOptions {
    fontFamilies?: Record<'main' | 'code', string>;
    fontSizes?: Record<'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl', number>;
    lineHeights?: Record<
      'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl',
      number | string
    >;
    letterSpacings?: Record<'short' | 'normal' | 'space', string>;
    value1?: TypographyStyle;
    value2?: TypographyStyle;
    value3?: TypographyStyle;
    value4?: TypographyStyle;
    value5?: TypographyStyle;
  }

  //   interface SimplePaletteColorOptions {
  //     contrastText?: string;
  //     contrastTextReverse?: string;
  //     dark?: string;
  //     light?: string;
  //     main: string;
  //   }

  //   interface PaletteColor {
  //     contrastText: string;
  //     contrastTextReverse?: string;
  //     dark: string;
  //     light: string;
  //     main: string;
  //   }

  //   interface Palette {
  //     border: Border;
  //     brand: SimplePaletteColorOptions;
  //   }

  //   interface PaletteOptions {
  //     border?: Border;
  //     brand?: SimplePaletteColorOptions;
  //   }
}

declare module '@mui/material/styles/createMixins' {
  interface VerticalDrawerMixin {
    width: CSSProperties;
    flexShrink: number;
    '& .MuiDrawer-paper': {
      width: CSSProperties;
    };
  }

  interface Mixins {
    paddings: {
      page: {
        paddingX: CSSProperties;
        paddingY: CSSProperties;
      };
      section: {
        paddingX: CSSProperties;
        paddingY: CSSProperties;
      };
    };
    centered: {
      display: string;
      justifyContent: string;
      alignItems: string;
    };
    drawerY: {
      sm: VerticalDrawerMixin;
      md: VerticalDrawerMixin;
      lg: VerticalDrawerMixin;
    };
    gradients: {
      colorCloud: string;
      numbTop: string;
      numbBottom: string;
    };
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    fontFamilies: true;
    fontSizes: true;
    lineHeights: true;
    letterSpacings: true;
    code1: true;
    code2: true;
  }
}

// declare module '@mui/material/AppBar' {
//   interface AppBarPropsColorOverrides {
//     default: true;
//     inherit: false;
//     primary: false;
//     secondary: false;
//     transparent: false;
//   }
// }

// declare module '@mui/material/Alert' {
//   interface AlertPropsVariantOverrides {
//     filled: false;
//     outlined: false;
//   }
// }

declare module '@mui/material/Avatar' {
  interface AvatarPropsVariantOverrides {
    large: true;
    medium: true;
    small: true;
  }
}

declare module '@mui/material/AvatarGroup' {
  // AvatarGroup variants must match Avatar variants exactly
  interface AvatarGroupPropsVariantOverrides {
    // add customs
    large: true;
    medium: true;
    small: true;
  }
}

// declare module '@mui/material/Badge' {
//   interface BadgePropsColorOverrides {
//     default: false;
//     error: true;
//     info: false;
//     primary: false;
//     secondary: false;
//     success: false;
//     warning: false;
//   }
// }

// declare module '@mui/material/Button' {
//   interface ButtonPropsVariantOverrides {
//     alert: true;
//   }
// }

// declare module '@mui/material/ButtonGroup' {
//   interface ButtonGroupPropsColorOverrides {
//     error: false;
//     info: false;
//     inherit: false;
//     primary: false;
//     success: false;
//     warning: false;
//   }

//   interface ButtonGroupPropsVariantOverrides {
//     outlined: false;
//     text: false;
//   }
// }

// declare module '@mui/material/Checkbox' {
//   interface CheckboxClasses {
//     /** Styles applied to the root element if the color is error. */
//     colorError: string;
//   }
//   interface CheckboxPropsColorOverrides {
//     default: false;
//     info: false;
//     inherit: false;
//     secondary: false;
//     success: false;
//     warning: false;
//   }

//   interface CheckboxPropsSizeOverrides {
//     small: false;
//   }
// }

// declare module '@mui/material/CircularProgress' {
//   interface CircularProgressPropsColorOverrides {
//     error: false;
//     info: false;
//     inherit: false;
//     primary: true;
//     secondary: false;
//     success: false;
//     warning: false;
//   }
// }

// declare module '@mui/material/Chip' {
//   interface ChipPropsVariantOverrides {
//     // remove defaults
//     filled: false;
//     outlined: false;
//     // add customs
//     default: true;
//     noSpace: true;
//     status: true;
//   }

//   interface ChipPropsColorOverrides {
//     brand: true;
//     default: false;
//     primary: false;
//   }
// }

// declare module '@mui/material/IconButton' {
//   interface IconButtonPropsColorOverrides {
//     default: false;
//     error: false;
//     info: false;
//     inherit: false;
//     success: false;
//     warning: false;
//   }
//   interface IconButtonPropsSizeOverrides {
//     xSmall: true;
//   }
// }

// declare module '@mui/material/InputBase' {
//   interface InputBasePropsColorOverrides {
//     error: false;
//     info: false;
//     secondary: false;
//     warning: false;
//   }
// }

// declare module '@mui/material/LinearProgress' {
//   interface LinearProgressPropsColorOverrides {
//     error: true;
//     info: false;
//     inherit: false;
//     primary: true;
//     secondary: false;
//     success: false;
//     warning: false;
//   }
// }

// declare module '@mui/material/OutlinedInput' {
//   interface OutlinedInputClasses {
//     /** Styles applied to the root element if the color is primary. */
//     colorPrimary: string;
//     /** Styles applied to the root element if the color is success. */
//     colorSuccess: string;
//   }
// }

// declare module '@mui/material/Pagination' {
//   interface PaginationPropsVariantOverrides {
//     outline: false;
//   }

//   interface PaginationPropsColorOverrides {
//     primary: false;
//     secondary: false;
//   }
// }

// declare module '@mui/material/Radio' {
//   interface RadioClasses {
//     /** Styles applied to the root element if the color is error. */
//     colorError: string;
//   }
// }

// declare module '@mui/material/SvgIcon' {
//   interface SvgIconPropsColorOverrides {
//     brand: true;
//   }
// }

// declare module '@mui/material/Switch' {
//   interface SwitchPropsColorOverrides {
//     default: false;
//     error: false;
//     info: false;
//     secondary: false;
//     success: false;
//     warning: false;
//   }
// }

// declare module '@mui/material/TextField' {
//   interface TextFieldPropsColorOverrides {
//     error: false;
//     info: false;
//     secondary: false;
//     warning: false;
//   }
// }

// declare module '@mui/material/ToggleButton' {
//   interface ToggleButtonPropsColorOverrides {
//     error: false;
//     info: false;
//     primary: false;
//     standard: false;
//     success: false;
//     warning: false;
//   }
// }

// declare module '@mui/material/ToggleButtonGroup' {
//   interface ToggleButtonGroupPropsColorOverrides {
//     error: false;
//     info: false;
//     primary: false;
//     standard: false;
//     success: false;
//     warning: false;
//   }
// }
