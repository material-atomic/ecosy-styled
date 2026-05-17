/**
 * Theme palette values used throughout the app.
 *
 * Each token includes a base color and optionally a matching "on" color
 * for text/icon content that appears on top of that background.
 */
export interface ThemePalette {
  /** Main brand color for primary actions and highlights. */
  primary: string;
  /** Text/icon color to use on top of `primary`. */
  onPrimary: string;
  /** Secondary accent color for less prominent UI elements. */
  secondary: string;
  /** Text/icon color to use on top of `secondary`. */
  onSecondary: string;
  /** Default app background color. */
  background: string;
  /** Text/icon color to use on top of `background`. */
  onBackground: string;
  /** Surface container color for cards, sheets, and panels. */
  surface: string;
  /** Text/icon color to use on top of `surface`. */
  onSurface: string;
  /** Variant surface color used for outlines, borders, or layered surfaces. */
  surfaceVariant: string;
  /** Text/icon color to use on top of `surfaceVariant`. */
  onSurfaceVariant: string;
  /** Outline/border color for separators and lines. */
  outline: string;
  /** Inverted surface used for contrast-heavy elements or dialogs. */
  inverseSurface: string;
  /** Text/icon color to use on top of `inverseSurface`. */
  inverseOnSurface: string;
  /** Default text color for primary content. */
  text: string;
  /** Secondary text color for less prominent content. */
  textSecondary: string;
  /** Default border color for UI elements. */
  border: string;
  /** Color used for error states and alerts. */
  error: string;
  /** Text/icon color to use on top of `error`. */
  onError: string;
  /** Color used for success states and confirmations. */
  success: string;
  /** Text/icon color to use on top of `success`. */
  onSuccess: string;
}

export type Colors = keyof ThemePalette;

/** Pre-defined supported theme modes. */
export type Theme = "light" | "dark";

/** Pre-defined standard sizes spanning from 2xs to 2xl. */
export type ThemeSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/** Pre-defined standard component keys that consume theme sizes. */
export type ThemeComponent = "button" | "input" | "card" | "chip" | "dialog" | "avatar";

/**
 * Configuration schema for component dimensions, padding, borders, and shadows.
 * Each size variant maps to a set of these configs.
 */
export interface ThemeSizeConfig {
  height: number;
  radius: number;
  /** Horizontal padding for components like buttons or inputs. */
  paddingHorizontal?: number;
  /** Vertical padding for components like buttons or inputs. */
  paddingVertical?: number;
  /** Minimum width for scalable components. */
  minWidth?: number;
  /** Minimum height for scalable components. */
  minHeight?: number;
  /** Font size for text elements inside the component. */
  fontSize?: number;
  /** Icon size for components with leading/trailing icons. */
  iconSize?: number;
  /** Border width for outlined or elevated components. */
  borderWidth?: number;
  /** Elevation level for shadows on Android-like surfaces. */
  elevation?: number;
  /** Shadow radius for shadow styling. */
  shadowRadius?: number;
  /** Gap between internal content elements. */
  gap?: number;
}

/**
 * Master configuration object holding the active palette and component size scales.
 */
export interface ThemeConfigs<
  SizeConfig extends ThemeSizeConfig = ThemeSizeConfig,
  Palette extends ThemePalette = ThemePalette
> {
  /** The color palette mapping for the active theme mode. */
  palette: Palette;
  /**
   * Size configuration grouped by component type.
   * Each component can define its own size scale.
   */
  components: Record<ThemeComponent, Record<ThemeSize, SizeConfig>>;
}

/**
 * Mapping of theme modes (e.g. 'light', 'dark') to their full theme configurations.
 */
export type Themes<
  Config extends ThemeSizeConfig = ThemeSizeConfig,
  Palette extends ThemePalette = ThemePalette,
  ThemeMode extends Theme & string = Theme,
> = {
    [K in ThemeMode]: ThemeConfigs<Config, Palette>;
  };
