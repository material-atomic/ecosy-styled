/* eslint-disable @typescript-eslint/no-explicit-any */
import { Platform, type ViewStyle, type TextStyle, type ImageStyle } from "react-native";
import type { ThemeConfigs } from "../types/theme";
import type { SxValue, VariantConfig } from "./types";
import type { Styled, StylesCreator } from "../types/styled";

const sxColorKeys = new Set([
  "color",
  "backgroundColor",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor",
  "shadowColor",
  "textDecorationColor",
  "textShadowColor",
  "overlayColor",
]);

/**
 * Converts a HEX color string and an opacity value into an RGBA string.
 * 
 * @param hex - The hex color code (e.g. '#FF0000', 'FFF').
 * @param opacity - The opacity level from 0 to 1.
 * @returns An `rgba(...)` string representing the color with opacity.
 */
export function hexToRgba(hex: string, opacity: number): string {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  if (hex.length !== 6 && hex.length !== 8) {
    return `#${hex}`;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Recursively resolves an `SxValue` based on the current theme, platform, and screen dimensions.
 * Handles:
 * - Platform selection (ios/android/default)
 * - Responsive breakpoints (base/sm/md/lg/xl/2xl)
 * - Color opacity modifiers (e.g. `primary.20`)
 * - String numeric coercions
 * 
 * @param key - The style property key being resolved.
 * @param value - The raw sx value to resolve.
 * @param theme - The active ThemeConfigs.
 * @param windowWidth - The current window width for responsive checks.
 * @returns The resolved primitive value (string, number, boolean) or undefined.
 */
export function resolveSxValue(key: string, value: SxValue, theme: ThemeConfigs, windowWidth?: number) {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    if ("ios" in value || "android" in value || "default" in value) {
      value = Platform.select<string | number | boolean>(value as Record<string, any>);
    } else if ("base" in value) {
      const responsiveValue = value as Record<string, string | number | boolean>;
      if (!windowWidth) {
        value = responsiveValue.base;
      } else {
        if (windowWidth >= 1400 && responsiveValue["2xl"] !== undefined) value = responsiveValue["2xl"];
        else if (windowWidth >= 1200 && responsiveValue.xl !== undefined) value = responsiveValue.xl;
        else if (windowWidth >= 992 && responsiveValue.lg !== undefined) value = responsiveValue.lg;
        else if (windowWidth >= 768 && responsiveValue.md !== undefined) value = responsiveValue.md;
        else if (windowWidth >= 576 && responsiveValue.sm !== undefined) value = responsiveValue.sm;
        else value = responsiveValue.base;
      }
    }
  }

  if (typeof value === "string") {
    if (sxColorKeys.has(key)) {
      if (value in theme.palette) {
        return theme.palette[value as keyof typeof theme.palette];
      }
      
      if (value.includes(".")) {
        const [colorKey, opacityStr] = value.split(".");
        if (colorKey in theme.palette) {
          const colorHex = theme.palette[colorKey as keyof typeof theme.palette];
          const opacity = Number(opacityStr) / 100;
          if (!Number.isNaN(opacity) && typeof colorHex === "string" && colorHex.startsWith("#")) {
            return hexToRgba(colorHex, opacity);
          }
        }
      }
    }

    if (value === "true") return true;
    if (value === "false") return false;

    const numeric = Number(value);
    if (!Number.isNaN(numeric) && value.trim() !== "") {
      return numeric;
    }
  }

  return value;
}

/**
 * A utility to implement CVA-like variants pattern independent of the `styled` HOC.
 * Returns a function that accepts the theme and props to compute final styles dynamically.
 * 
 * @param base - Base styles to apply regardless of variant.
 * @param configs - Configuration mapping for variants and default variant states.
 * @returns A resolver function `(theme, props) => StyleProp`.
 */
export function variants<
  Configs extends ThemeConfigs = ThemeConfigs,
  S extends ViewStyle | TextStyle | ImageStyle = ViewStyle | TextStyle | ImageStyle,
  V extends VariantConfig<Configs, ViewStyle | TextStyle | ImageStyle> = VariantConfig<Configs, ViewStyle | TextStyle | ImageStyle>
>(
  base?: Styled<S, Configs>,
  configs?: {
    variants?: V;
    defaultVariants?: {
      [K in keyof V]?: keyof V[K];
    };
  }
) {
  return function resolveVariants(
    theme: Configs,
    props?: { [K in keyof V]?: keyof V[K] }
  ): S {
    const vStyle: Record<string, unknown> = {};

    if (base) {
      const baseStyle = typeof base === "function" ? (base as StylesCreator<unknown>)(theme) : base;
      Object.assign(vStyle, baseStyle);
    }

    if (configs?.variants) {
      Object.entries(configs.variants).forEach(([variantKey, variantValues]) => {
        const variantPropValue = props?.[variantKey] || configs.defaultVariants?.[variantKey];
        if (variantPropValue && variantValues[variantPropValue as string]) {
          const vCreator = variantValues[variantPropValue as string];
          const resolvedVStyle = typeof vCreator === "function" ? (vCreator as StylesCreator<unknown>)(theme) : vCreator;
          Object.assign(vStyle, resolvedVStyle);
        }
      });
    }

    return vStyle as S;
  };
}
