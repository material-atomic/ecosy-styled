/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CSSProperties, JSX } from "react";
import type { ThemeConfigs, ThemePalette, Themes, ThemeSizeConfig } from "../types/theme";
import type { StyledBaseProps, StyledProps, Styled } from "../types/styled";

export type { ThemeConfigs, ThemePalette, Themes, ThemeSizeConfig, StyledBaseProps, StyledProps };

export type ThemeState<
  Config extends ThemeSizeConfig = ThemeSizeConfig,
  Palette extends ThemePalette = ThemePalette,
> = {
  mode: string;
  themes: Record<string, ThemeConfigs<Config, Palette>>;
};

/**
 * Type utility to infer the specific config and palette types from a given ThemeState.
 */
export type InferTheme<State> = State extends ThemeState<infer C, infer P>
  ? { config: C; palette: P }
  : never;

/**
 * Defines a value that can be customized based on the active platform (Web vs Default).
 */
export type PlatformSelect<T> = {
  web?: T;
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
export type SxValue = string | number | boolean | PlatformSelect<string | number | boolean> | ResponsiveSelect<string | number | boolean>;

/**
 * The type for the `sx` prop, allowing both styled system shorthands and custom standard styles.
 */
export type SxProp = {
  [K in keyof StyledBaseProps]?: SxValue;
} & {
    [key: string]: SxValue;
  };

/**
 * Defines the structure for CVA-like variants, mapping a variant category and its string keys
 * to specific conditional styles.
 */
export type VariantConfig<Configs extends ThemeConfigs = ThemeConfigs> = Record<string, Record<string, Styled<CSSProperties, Configs>>>;

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

/**
 * The combined props for a Styled Web component, including native HTML attributes,
 * styling props (`sx`, `style`), and active variant selections.
 */
export type StyledComponentProps<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
  V extends VariantConfig<any> = {}
> = React.ComponentProps<C> & {
  sx?: SxProp;
  style?: CSSProperties;
} & {
  [K in keyof V]?: keyof V[K];
};

export type NamedStyles<T> = {
  [P in keyof T]: CSSProperties;
};

export type InferStyle<T extends NamedStyles<T> | NamedStyles<any>> = {
  [P in keyof T]: CSSProperties;
};
