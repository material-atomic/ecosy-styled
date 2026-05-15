/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  FlexStyle,
  ImageStyle,
  ShadowStyleIOS,
  TextProps as RNTextProps,
  ViewProps as RNViewProps,
  ImageProps as RNImageProps,
  TextInputProps as RNTextInputProps,
  TouchableOpacityProps as RNTouchableOpacityProps,
  TextStyle,
  TextStyleAndroid,
  TextStyleIOS,
  TransformsStyle,
  ViewStyle,
} from "react-native";
import type {
  ThemePalette,
  ThemeSizeConfig as BaseThemeSizeConfig,
  ThemeConfigs as BaseThemeConfigs,
  Theme,
  ThemeConfigs,
} from "../types/theme";
import type { ComponentPropsWithRef, ComponentType } from "react";
import type { Styled, StyledProps } from "../types/styled";
import type { ThemeState as BaseThemeState } from "../types/state";

/**
 * Extends the common ThemeSizeConfig to include Android-specific properties like `elevation`.
 */
export interface ThemeSizeConfig extends BaseThemeSizeConfig {
  /** Elevation level for shadows on Android-like surfaces. */
  elevation?: number;
}

/** Represents the base theme configuration. */
export type ThemeConfig<
  SizeConfig extends ThemeSizeConfig = ThemeSizeConfig,
  Palette extends ThemePalette = ThemePalette
> = BaseThemeConfigs<SizeConfig, Palette>;

/** Map of FlexStyle properties where each can be a value or a theme function. */
export type FlexStyled = {
  [K in keyof FlexStyle]: Styled<FlexStyle[K]>;
};

/** Map of ShadowStyleIOS properties where each can be a value or a theme function. */
export type ShadowStyledIOS = {
  [K in keyof ShadowStyleIOS]: Styled<ShadowStyleIOS[K]>;
};

/** Map of TransformsStyle properties where each can be a value or a theme function. */
export type TransformsStyled = {
  [K in keyof TransformsStyle]: Styled<TransformsStyle[K]>;
};

/** Map of ViewStyle properties where each can be a value or a theme function. */
export type ViewStyled = {
  [K in keyof ViewStyle]: Styled<ViewStyle[K]>;
};

/** Map of TextStyleIOS properties where each can be a value or a theme function. */
export type TextStyledIOS = {
  [K in keyof TextStyleIOS]: Styled<TextStyleIOS[K]>;
};

/** Map of TextStyleAndroid properties where each can be a value or a theme function. */
export type TextStyledAndroid = {
  [K in keyof TextStyleAndroid]: Styled<TextStyleAndroid[K]>;
};

/** Map of general TextStyle properties where each can be a value or a theme function. */
export type TextStyled = {
  [K in keyof TextStyle]: Styled<TextStyle[K]>;
};

/** Map of ImageStyle properties where each can be a value or a theme function. */
export type ImageStyled = {
  [K in keyof ImageStyle]: Styled<ImageStyle[K]>;
};

/** State definition specific to the React Native theme containing mode and themes mapping. */
export type ThemeState<
  Config extends ThemeSizeConfig = ThemeSizeConfig,
  Palette extends ThemePalette = ThemePalette,
  ThemeMode extends (Theme & string) = Theme,
> = BaseThemeState<Config, Palette, ThemeMode>;

/**
 * Defines a value that can be customized based on the active platform (iOS vs Android vs Default).
 */
export type PlatformSelect<T> = {
  ios?: T;
  android?: T;
  default?: T;
};

/**
 * Defines a value that can dynamically change based on predefined responsive breakpoints.
 */
export type ResponsiveSelect<T> = {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
};

/**
 * Represents a styled value that can be a primitive, a platform-specific object, 
 * or a responsive-specific object.
 */
export type SxValue = string | number | boolean | null | undefined | PlatformSelect<string | number | boolean> | ResponsiveSelect<string | number | boolean>;

/**
 * The type for the `sx` prop, allowing both styled system shorthands and custom standard styles.
 */
export type SxProp<
  Config extends ThemeSizeConfig = ThemeSizeConfig,
  Palette extends ThemePalette = ThemePalette
> = Partial<Record<keyof (ViewStyle & TextStyle), SxValue | (keyof ThemeConfigs<Config, Palette>) | PlatformSelect<keyof ThemeConfigs<Config, Palette>> | ResponsiveSelect<keyof ThemeConfigs<Config, Palette>>>>;

/**
 * Defines the structure for CVA-like variants, mapping a variant category and its string keys
 * to specific conditional styles in React Native.
 */
export type VariantConfig<Configs extends ThemeConfigs = ThemeConfigs> = Record<string, Record<string, Styled<ViewStyle | TextStyle | ImageStyle, Configs>>>;

/**
 * Configuration options when creating a Styled component.
 */
export interface StyledConfigs<
  V extends VariantConfig<Configs>,
  Configs extends ThemeConfigs = ThemeConfigs
> {
  /** Optional custom display name for React DevTools. */
  displayName?: string;
  /** Custom variant definitions. */
  variants?: V;
  /** Default active variants. */
  defaultVariants?: {
    [K in keyof V]?: keyof V[K];
  };
}

/** Utility type to extract variant prop typings from a VariantConfig. */
export type VariantProps<V> = V extends VariantConfig<any>
  ? {
      [K in keyof V]?: keyof V[K];
    }
  : {};

/**
 * The combined props for a Styled React Native component, including base props,
 * styling props (`sx`, `style`), and active variant selections.
 */
export type StyledComponentProps<
  C extends ComponentType<any>,
  V extends VariantConfig<any> = Record<string, any>
> = ComponentPropsWithRef<C> & StyledProps & VariantProps<V> & {
  sx?: SxProp;
};

/** Map of named style keys to their respective Style definition types. */
export type NamedStyles<T> = { [P in keyof T]: ViewStyled | TextStyled | ImageStyled };

/** Infers a compiled StyleSheet representation from a `NamedStyles` map. */
export type InferStyle<T extends NamedStyles<T> | NamedStyles<any>> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
}

/** Extracts and normalizes the config, palette, and theme mode from a `ThemeState`. */
export type InferTheme<State> = State extends ThemeState<infer Config, infer Palette, infer ThemeMode>
  ? {
    config: Config extends ThemeSizeConfig ? Config : ThemeSizeConfig;
    palette: Palette extends ThemePalette ? Palette : ThemePalette;
    theme: ThemeMode extends Theme ? ThemeMode : Theme;
  } : {
    config: ThemeSizeConfig;
    palette: ThemePalette;
    theme: Theme;
  };

/** Attaches the `StyledProps` generic to a base Props type. */
export type PropsWithStyled<Props> = Props & StyledProps;
/** Text component props mixed with `StyledProps`. */
export type TextProps = PropsWithStyled<RNTextProps>;
/** View component props mixed with `StyledProps`. */
export type ViewProps = PropsWithStyled<RNViewProps>;
/** Image component props mixed with `StyledProps`. */
export type ImageProps = PropsWithStyled<RNImageProps>;
/** TextInput component props mixed with `StyledProps`. */
export type TextInputProps = PropsWithStyled<RNTextInputProps>;
/** TouchableOpacity component props mixed with `StyledProps`. */
export type TouchableOpacityProps = PropsWithStyled<RNTouchableOpacityProps>;
