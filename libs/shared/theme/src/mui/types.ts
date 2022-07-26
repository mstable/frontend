import type { TypographyStyle } from '@mui/material';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    highlight: string;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontFamilies: Record<'main' | 'code', string>;
    fontSizes: Record<'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl', number>;
    lineHeights: Record<'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl', number | string>;
    letterSpacings: Record<'short' | 'normal' | 'space', string>;
    buttonSmall: TypographyStyle;
    buttonMedium: TypographyStyle;
    buttonLarge: TypographyStyle;
    label1: TypographyStyle;
    label2: TypographyStyle;
    placeholder: TypographyStyle;
    hint: TypographyStyle;
    value1: TypographyStyle;
    value2: TypographyStyle;
    value3: TypographyStyle;
    value4: TypographyStyle;
    value5: TypographyStyle;
    value6: TypographyStyle;
  }

  interface TypographyVariantsOptions {
    fontFamilies?: Record<'main' | 'code', string>;
    fontSizes?: Record<'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl', number>;
    lineHeights?: Record<
      'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl',
      number | string
    >;
    letterSpacings?: Record<'short' | 'normal' | 'space', string>;
    buttonSmall?: TypographyStyle;
    buttonMedium?: TypographyStyle;
    buttonLarge?: TypographyStyle;
    label1?: TypographyStyle;
    label2?: TypographyStyle;
    placeholder?: TypographyStyle;
    hint?: TypographyStyle;
    value1?: TypographyStyle;
    value2?: TypographyStyle;
    value3?: TypographyStyle;
    value4?: TypographyStyle;
    value5?: TypographyStyle;
    value6?: TypographyStyle;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    // remove defaults
    h6: false;
    subtitle1: false;
    subtitle2: false;
    button: false;
    caption: false;
    overline: false;
    // add custom
    fontFamilies: true;
    fontSizes: true;
    lineHeights: true;
    letterSpacings: true;
    buttonSmall: true;
    buttonMedium: true;
    buttonLarge: true;
    label1: true;
    label2: true;
    placeholder: true;
    hint: true;
    value1: true;
    value2: true;
    value3: true;
    value4: true;
    value5: true;
    value6: true;
  }
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
    gradients: {
      colorCloud: string;
      numbTop: string;
      numbBottom: string;
    };
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

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    active: true;
  }

  interface ChipPropsSizeOverrides {
    large: true;
  }
}

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
