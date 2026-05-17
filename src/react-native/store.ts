/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createElement,
  forwardRef,
  useMemo,
  type ComponentProps,
  type ComponentRef,
  type ComponentType,
} from "react";
import {
  StyleSheet,
  useWindowDimensions,
  Animated,
  View as RNView,
  Text as RNText,
  Image as RNImage,
  TextInput as RNTextInput,
  TouchableOpacity as RNTouchableOpacity,
  ScrollView as RNScrollView,
  FlatList as RNFlatList,
  Pressable as RNPressable,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  type StyleProp,
  type ImageStyle,
  type TextStyle,
  type ViewStyle
} from "react-native";
import { createStore, type PayloadAction } from "@ecosy/store";
import { createStoreOrder } from "@ecosy/react"
import slateThemes from "../theme/slate";
import { resolveSxValue, variants } from "./utils";
import { KEYS_MAPPING, propsToStyle } from "../styled/mapping";
import type { InferStyle, NamedStyles, StyledComponentProps, SxProp, SxValue, ThemeState, StyledConfigs, VariantConfig } from "./types";
import type { Theme, ThemeConfigs, ThemePalette, ThemeSizeConfig } from "../types/theme";
import type { Styled, StyledBaseProps, StyledProps, StylesCreator } from "../types/styled";

const initialState: ThemeState = {
  mode: "light",
  themes: slateThemes,
};

/**
 * The global styling store specific to the React Native environment, instantiated via `@ecosy/store`.
 * Contains the active theme configuration and exposes standard reducer actions.
 */
export const { store, actions } = createStore({
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.mode = action.payload;
    },
    setThemes(state, action: PayloadAction<any>) {
      state.themes = action.payload;
    },
  }
});

/**
 * A custom `useSelector` hook bound to the React Native styling store.
 */
export const useSelector = createStoreOrder<ThemeState, typeof store>(store);

/**
 * Hook to directly retrieve the current theme mode (e.g., "light" or "dark").
 */
export function useThemeMode() {
  return useSelector(state => state.mode);
}

/**
 * Hook to access the current active theme configuration and palette for React Native.
 * Re-renders the component when the theme mode or configuration changes.
 */
export function useTheme() {
  const { mode, themes } = useSelector(state => state);
  return useMemo(() => themes[mode], [mode, themes]);
}

/**
 * Creates a custom hook that returns memoized React Native StyleSheets.
 * The stylesheets are automatically rebuilt when the theme changes.
 * 
 * @param creator - A function returning style objects based on the current theme.
 * @returns A hook returning `{ styles, theme }`.
 */
export function makeStyles<T extends NamedStyles<T> | NamedStyles<any>>(creator: StylesCreator<T>) {
  return function useStyles() {
    const theme = useTheme();

    const styles = useMemo(() => {
      const styles = creator(theme);

      const styled = Object.entries(styles).reduce((acc, [key, item]) => {
        const style = Object.entries(item).reduce<Record<string, unknown>>((a, [k, v]) => {
          a[k] = typeof v === "function" ? v(theme) : v;
          return a;
        }, {}) as ViewStyle | TextStyle | ImageStyle;

        acc[key as keyof T] = style;

        return acc;
      }, {} as InferStyle<T>);

      return StyleSheet.create(styled);
    }, [theme]);

    return { styles, theme };
  }
}

/**
 * Hook to resolve an `sx` prop object into a valid flattened style object.
 * Supports responsive breakpoints, platform selection, and dynamic color opacity mapping (e.g. `primary.20`).
 * 
 * @param sx - The sx prop containing style shortcuts and dynamic values.
 * @returns A resolved React Native style object.
 */
export function useSx(sx?: SxProp<ThemeSizeConfig, ThemePalette>) {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  return useMemo(() => {
    if (!sx) return {};

    return Object.entries(sx).reduce<Record<string, unknown>>((acc, [key, value]) => {
      const resolved = resolveSxValue(key, value, theme, width);
      if (resolved === undefined) {
        return acc;
      }

      acc[key] = resolved;
      return acc;
    }, {});
  }, [sx, theme, width]);
}

/**
 * Hook to compute and memoize a value based on the current theme.
 * Useful for generating theme-dependent strings or numbers outside of StyleSheet.
 * 
 * @param creator - A factory function that receives the theme and returns a computed value.
 */
export function useThemeFactory<Return>(
  creator: (theme: ThemeConfigs<ThemeSizeConfig, ThemePalette>) => Return
) {
  const theme = useTheme();
  return useMemo(() => creator(theme), [theme, creator]);
}

/**
 * Hook to map shorthand properties (like `p`, `m`, `bg`) to standard React Native style properties.
 * Separates styling props from standard component props.
 * 
 * @param props - Component properties including shorthand styled props.
 * @returns An object containing `{ styled, other, theme }`.
 */
export function useStyled<Props extends StyledProps>(props: Props) {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  return useMemo(() => {
    let styled: Record<string, unknown> = {};
    const other: Record<string, unknown> = {};

    Object.entries(props).forEach(([key, value]) => {
      if (Object.keys(KEYS_MAPPING).includes(key)) {
        const rawStyle = propsToStyle({
          [key]: typeof value === "function" ? value(theme) : value
        });
        
        Object.entries(rawStyle).forEach(([sKey, sValue]) => {
          styled[sKey] = resolveSxValue(sKey, sValue as SxValue, theme, width);
        });
      } else {
        other[key] = value;
      }
    });

    type StyledValue<K> = K extends keyof StyledBaseProps ? StyledBaseProps[K] : unknown;

    return {
      styled,
      other,
      theme,
    } as {
      styled: {
        [K in Pick<Props, keyof StyledProps> as keyof Props]: StyledValue<K>
      };
      other: Omit<Props, keyof StyledProps>;
      theme: ThemeConfigs;
    };
  }, [theme, props, width]);
}

/**
 * Higher-Order Component (HOC) to wrap any React Native Component with the Ecosy Styling Engine.
 * Automatically processes shorthand props, `sx` prop, and applies CVA-like variants.
 * 
 * @param Component - The base React Native component to wrap.
 * @param creator - An optional default style object or function based on the theme.
 * @param configs - Configuration for variants and display name.
 */
export function styled<
  C extends ComponentType<any>,
  V extends VariantConfig<any> = {},
  Config extends ThemeConfigs = ThemeConfigs
>(
  Component: C,
  creator?: Styled<ComponentProps<C>["style"]>,
  configs?: StyledConfigs<V, Config>
) {
  const StyledComponent = forwardRef<ComponentRef<C>, StyledComponentProps<C, V>>((props, ref) => {
    const { sx, style, ...rest } = props;
    const { width } = useWindowDimensions();

    const variantProps: Record<string, any> = {};
    const otherProps: Record<string, any> = {};

    if (configs?.variants) {
      Object.keys(rest).forEach(key => {
        if (configs.variants && key in configs.variants) {
          variantProps[key] = (rest as Record<string, any>)[key];
        } else {
          otherProps[key] = (rest as Record<string, any>)[key];
        }
      });
    } else {
      Object.assign(otherProps, rest);
    }

    const { styled, other, theme } = useStyled(otherProps as StyledProps);

    const defaultStyle = useMemo(() => {
      return typeof creator === "function" ? (creator as StylesCreator<unknown>)(theme) : (creator || {});
    }, [theme]);

    const variantStyle = useMemo(() => {
      if (!configs?.variants) return {};
      
      const vStyle: Record<string, any> = {};
      Object.entries(configs.variants).forEach(([variantKey, variantValues]) => {
        const variantPropValue = variantProps[variantKey] || configs.defaultVariants?.[variantKey];
        if (variantPropValue && variantValues[variantPropValue as string]) {
          const vCreator = variantValues[variantPropValue as string];
          const resolvedVStyle = typeof vCreator === "function" ? (vCreator as StylesCreator<unknown>)(theme) : vCreator;
          Object.assign(vStyle, resolvedVStyle);
        }
      });
      return vStyle;
    }, [variantProps, theme]);

    const sxStyle = useMemo(() => {
      if (!sx) return {};

      return Object.entries(props.sx).reduce<Record<string, unknown>>((acc, [key, value]) => {
        const resolved = resolveSxValue(key, value as SxValue, theme, width);
        if (resolved === undefined) {
          return acc;
        }

        acc[key] = resolved;
        return acc;
      }, {});
    }, [sx, theme, width]);

    const mergedStyle = useMemo(() => {
      return StyleSheet.flatten([defaultStyle, variantStyle, sxStyle, styled, style as StyleProp<unknown>]);
    }, [defaultStyle, variantStyle, sxStyle, styled, style]);

    return createElement(Component, {
      ...other,
      style: mergedStyle,
      ref,
    });
  });

  StyledComponent.displayName = configs?.displayName || Component.displayName || `Styled(${Component.displayName || Component.name})`;

  return StyledComponent as ComponentType<StyledComponentProps<C, V>>;
}

/** Base View component with styling engine applied. */
export const View = styled(RNView);
/** Base Image component with styling engine applied. */
export const Image = styled(RNImage);
/** Base TouchableOpacity component with styling engine applied. */
export const TouchableOpacity = styled(RNTouchableOpacity);
/** Base ScrollView component with styling engine applied. */
export const ScrollView = styled(RNScrollView);
/** Base FlatList component with styling engine applied. */
export const FlatList = styled(RNFlatList);
/** Base Pressable component with styling engine applied. */
export const Pressable = styled(RNPressable);
/** Base KeyboardAvoidingView component with styling engine applied. */
export const KeyboardAvoidingView = styled(RNKeyboardAvoidingView);
/** Animated View component with styling engine applied. */
export const AnimatedView = styled(Animated.View);
/** Animated Image component with styling engine applied. */
export const AnimatedImage = styled(Animated.Image);
/** Animated ScrollView component with styling engine applied. */
export const AnimatedScrollView = styled(Animated.ScrollView);

/** Base Text component with styling engine applied. */
export const Text = styled(RNText, (theme) => ({
  color: theme.palette.text,
}));

/** Animated Text component with styling engine applied. */
export const AnimatedText = styled(Animated.Text, (theme) => ({
  color: theme.palette.text,
}));

/** Base TextInput component with styling engine applied. */
export const TextInput = styled(RNTextInput, (theme) => ({
  color: theme.palette.text,
}));

/** Animated TextInput component with styling engine applied. */
export const AnimatedTextInput = styled(Animated.createAnimatedComponent(RNTextInput), (theme) => ({
  color: theme.palette.text,
}));

export { variants };
