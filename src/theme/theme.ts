"use client";

import { ThemeOptions } from "@mui/material/styles";
import config from "@/config/config.json";

// Sabit tema değerleri
const COMMON_COLORS = {
  secondary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
  },
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  border: {
    default: 'rgba(128, 128, 128, 0.2)',
    hover: 'rgba(128, 128, 128, 0.4)',
    disabled: 'rgba(128, 128, 128, 0.1)',
  },
  background: {
    light: '#ffffff',
    dark: {
      default: '#0B1018',
      paper: '#121418',
    },
  },
  text: {
    light: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    dark: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
  },
  divider: {
    light: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(255, 255, 255, 0.12)',
  },
  shadow: {
    default: 'rgba(0,0,0,0.1)',
    primary: 'rgba(0,0,0,0.2)',
  },
} as const;

/**
 * Ortak Geçiş Stilleri
 * Tüm bileşenlerde kullanılan geçiş efektleri
 */
const COMMON_TRANSITIONS = {
  default: "all 0.3s ease-in-out",
  fast: "all 0.2s ease-in-out",
  hover: {
    transform: "translateY(-4px)",
    boxShadow: (shadow: string) => `0 4px 20px ${shadow}`,
  },
} as const;

/**
 * Ortak Border Stilleri
 * Tüm bileşenlerde kullanılan temel border stilleri
 */
const COMMON_BORDER_STYLES = {
  default: {
    border: '0.5px solid',
    borderColor: COMMON_COLORS.border.default,
  },
  hover: {
    borderColor: COMMON_COLORS.border.hover,
  },
} as const;

/**
 * Tasarım Sistem Sabitleri
 * Tüm bileşenlerde kullanılan temel değerler
 */
const DESIGN_TOKENS = {
  TRANSITIONS: {
    DEFAULT: COMMON_TRANSITIONS.default,
    FAST: COMMON_TRANSITIONS.fast,
  },
  SPACING: {
    CARD: {
      PADDING: '24px',
      GAP: 4,
    },
    CHIP: {
      GAP: 1,
    },
  },
  TYPOGRAPHY: {
    BODY: {
      fontSize: "0.95rem",
      letterSpacing: "0.3px",
    },
    CHIP: {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
  },
  BORDER: {
    RADIUS: {
      DEFAULT: "16px",
      INPUT: "8px",
      CHIP: "7px",
      CARD: "16px",
    },
    COLORS: {
      default: COMMON_COLORS.border.default,
      hover: COMMON_COLORS.border.hover,
      disabled: COMMON_COLORS.border.disabled,
    },
    STYLES: {
      common: COMMON_BORDER_STYLES,
      card: {
        default: {
          ...COMMON_BORDER_STYLES.default,
        },
        hover: {
          ...COMMON_BORDER_STYLES.hover,
        },
      },
      chip: {
        default: {
          ...COMMON_BORDER_STYLES.default,
        },
        hover: {
          ...COMMON_BORDER_STYLES.hover,
        },
      },
      input: {
        underline: {
          borderBottom: '1px solid',
          borderColor: COMMON_COLORS.border.default,
        },
        focused: {
          borderColor: 'primary.main',
        },
      },
    },
  },
  COMPONENTS: {
    CHIP: {
      selected: {
        bgcolor: "primary.main",
        color: "background.paper",
        borderColor: "primary.main",
        boxShadow: `0 4px 20px ${COMMON_COLORS.shadow.primary}`,
        transform: "translateY(-4px)",
      },
      default: {
        bgcolor: "background.paper",
        color: "text.primary",
        border: "0.5px solid",
        borderColor: COMMON_COLORS.border.default,
      },
    },
    AVATAR: {
      width: 80,
      height: 80,
      bgcolor: "transparent",
      border: "2px solid",
      borderColor: COMMON_COLORS.border.default,
      display: { xs: "none", md: "block" },
      "& img": {
        objectFit: "cover",
        borderRadius: "50%",
      },
    },
  },
} as const;

/**
 * Section stilleri
 * Tüm section'larda kullanılan ortak stiller
 */
export const SECTION_STYLES = {
  mt: { xs: 4, sm: 6, md: 8, lg: 10 },
} as const;

/**
 * Stack stilleri
 * Stack bileşenlerinde kullanılan ortak spacing değerleri
 */
export const STACK_STYLES = {
  spacing: { xs: 4, md: 6 },
} as const;

/**
 * Motion stilleri
 * Framer Motion animasyonları için ortak değerler
 */
export const MOTION_STYLES = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  container: {
    mb: { xs: 4, md: 6 },
    "&:last-child": {
      mb: 0,
    },
  },
} as const;

/**
 * Deneyim Kartı Stilleri
 * ExperienceCard bileşeni için ortak stiller
 */
export const EXPERIENCE_CARD_STYLES = {
  card: {
    background: "background.paper",
    position: "relative",
    transition: COMMON_TRANSITIONS.default,
  },
  avatar: DESIGN_TOKENS.COMPONENTS.AVATAR,
  metaContainer: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: { xs: 1, md: 3 },
    alignItems: { xs: "flex-start", md: "center" },
  },
  cardHighlighted: {
    border: "1px solid",
    borderColor: "primary.main",
    boxShadow: (theme) => `0 4px 20px ${theme.palette.primary.main}40`,
  },
  position: {
    color: "primary.main",
    mb: 1,
    fontWeight: "bold",
    textAlign: { xs: "center", md: "left" },
  },
  description: {
    color: "text.secondary",
  },
  skillSection: {
    width: "100%",
  },
  skillContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: DESIGN_TOKENS.SPACING.CHIP.GAP,
  },
  skillChip: (isSelected: boolean) => ({
    ...DESIGN_TOKENS.TYPOGRAPHY.CHIP,
    borderRadius: DESIGN_TOKENS.BORDER.RADIUS.CHIP,
    transition: COMMON_TRANSITIONS.default,
    cursor: "pointer",
    height: 32,
    ...(isSelected ? DESIGN_TOKENS.COMPONENTS.CHIP.selected : DESIGN_TOKENS.COMPONENTS.CHIP.default),
  }),
} as const;

/**
 * Eğitim Kartı Stilleri
 * EducationCard bileşeni için ortak stiller
 */
export const EDUCATION_CARD_STYLES = {
  card: {
    background: "background.paper",
    position: "relative",
    transition: COMMON_TRANSITIONS.default,
  },
  avatar: DESIGN_TOKENS.COMPONENTS.AVATAR,
  metaContainer: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: { xs: 1, md: 3 },
    alignItems: { xs: "flex-start", md: "center" },
  },
  schoolName: {
  },
  department: {
    mb: 2,
    textAlign: { xs: "center", md: "left" },
  },
} as const;

/**
 * Tema oluşturma fonksiyonu
 * @param isDarkMode - Karanlık mod durumu
 * @returns Tema konfigürasyonu
 */
const theme: ThemeOptions = {
  palette: {
    mode: config.theme.mode,
    primary: {
      main: config.theme.primaryColor,
    },
    secondary: COMMON_COLORS.secondary,
    error: COMMON_COLORS.error,
    warning: COMMON_COLORS.warning,
    info: COMMON_COLORS.info,
    success: COMMON_COLORS.success,
    grey: COMMON_COLORS.grey,
    background: {
      default: config.theme.mode === 'dark' ? COMMON_COLORS.background.dark.default : COMMON_COLORS.background.light,
      paper: config.theme.mode === 'dark' ? COMMON_COLORS.background.dark.paper : COMMON_COLORS.background.light,
    },
    text: config.theme.mode === 'dark' ? COMMON_COLORS.text.dark : COMMON_COLORS.text.light,
    divider: config.theme.mode === 'dark' ? COMMON_COLORS.divider.dark : COMMON_COLORS.divider.light,
    shadow: COMMON_COLORS.shadow,
    border: COMMON_COLORS.border,
  },
  typography: {
    fontFamily: config.theme.fontFamily,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      ...DESIGN_TOKENS.TYPOGRAPHY.BODY,
    },
    body2: {
      fontSize: '0.875rem',
      letterSpacing: '0.25px',
    },
  },
  shape: {
    borderRadius: parseInt(DESIGN_TOKENS.BORDER.RADIUS.DEFAULT),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: DESIGN_TOKENS.BORDER.RADIUS.DEFAULT,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          ...DESIGN_TOKENS.COMPONENTS.CHIP.default,
          borderRadius: DESIGN_TOKENS.BORDER.RADIUS.CHIP,
          fontSize: DESIGN_TOKENS.TYPOGRAPHY.CHIP.fontSize,
          fontWeight: DESIGN_TOKENS.TYPOGRAPHY.CHIP.fontWeight,
          '&.Mui-selected': DESIGN_TOKENS.COMPONENTS.CHIP.selected,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: DESIGN_TOKENS.BORDER.RADIUS.INPUT,
          },
        },
      },
    },
  },
};

export default theme; 