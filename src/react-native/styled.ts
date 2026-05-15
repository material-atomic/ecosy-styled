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
  Text as RNText,
  TextInput as RNTextInput,
  View as RNView,
  Image as RNImage,
  TouchableOpacity as RNTouchableOpacity,
  ScrollView as RNScrollView,
  FlatList as RNFlatList,
  Pressable as RNPressable,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  type ImageStyle,
  type StyleProp,
  type TextStyle,
  type ViewStyle
} from "react-native";
import type {
  InferStyle,
  InferTheme,
  NamedStyles,
  StyledComponentProps,
  SxProp,
  SxValue,
  StyledConfigs,
  VariantConfig,
} from "./types";
import { createStoreOrder } from "@ecosy/react";
import { KEYS_MAPPING, propsToStyle } from "../styled/mapping";
import { resolveSxValue, variants } from "./utils";
import type { Subscriber } from "@ecosy/core";
import type { Styled, StyledBaseProps, StyledProps, StylesCreator } from "../types/styled";
import type { ThemeConfigs } from "../types/theme";
import type { ThemeState } from "../types/state";

interface StoreState<State extends ThemeState> {
  theme: State;
}

/**
 * Factory function to create a fully typed styling engine based on a custom store.
 * 
 * @param store - A custom `@ecosy/store` instance containing the ThemeState.
 * @returns A set of styling utilities including useTheme, makeStyles, useSx, styled, and base components.
 */
export function createStyled<
  State extends ThemeState,
  Store extends Subscriber<StoreState<State>>
>(store: Store) {
  type Inferred = InferTheme<State>;

  const useSelector = createStoreOrder<StoreState<State>, Store>(store);

  /**
   * Hook to access the current active theme configuration and palette.
   * Re-renders the component when the theme mode or configuration changes.
   */
  function useTheme() {
    const { mode, themes } = useSelector((state) => state.theme);
    return useMemo(() => themes[mode], [mode, themes]);
  }

  /**
   * Creates a custom hook that returns memoized React Native StyleSheets.
   * The stylesheets are automatically rebuilt when the theme changes.
   * 
   * @param creator - A function returning style objects based on the current theme.
   * @returns A hook returning `{ styles, theme }`.
   */
  function makeStyles<T extends NamedStyles<T> | NamedStyles<any>>(creator: StylesCreator<T>) {
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
  function useSx(sx?: SxProp<Inferred['config'], Inferred['palette']>) {
    const theme = useTheme();
    const { width } = useWindowDimensions();

    return useMemo(() => {
      if (!sx) return {};

      return Object.entries(sx).reduce<Record<string, unknown>>((acc, [key, value]) => {
        const resolved = resolveSxValue(key, value as SxValue, theme as ThemeConfigs, width);
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
  function useThemeFactory<Return>(
    creator: (theme: ThemeConfigs<Inferred['config'], Inferred['palette']>) => Return
  ) {
    const theme = useTheme();
    return useMemo(() => creator(theme), [theme, creator]);
  }

  /**
   * Hook to map shorthand properties (like `p`, `m`, `bg`) to standard style properties.
   * Separates styling props from standard component props.
   * 
   * @param props - Component properties including shorthand styled props.
   * @returns An object containing `{ styled, other, theme }`.
   */
  function useStyled<Props extends StyledProps>(props: Props) {
    const theme = useTheme();

    return useMemo(() => {
      let styled: Record<string, unknown> = {};
      const other: Record<string, unknown> = {};

      Object.entries(props).forEach(([key, value]) => {
        if (Object.keys(KEYS_MAPPING).includes(key)) {
          styled = Object.assign(styled, propsToStyle({
            [key]: typeof value === "function" ? value(theme) : value
          }));
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
    }, [theme, props]);
  }

  /**
   * Higher-Order Component (HOC) to wrap any React Component with the Ecosy Styling Engine.
   * Automatically processes shorthand props, `sx` prop, and applies CVA-like variants.
   * 
   * @param Component - The base React Native component to wrap.
   * @param creator - An optional default style object or function based on the theme.
   * @param configs - Configuration for variants and display name.
   */
  function styled<C extends ComponentType<any>, V extends VariantConfig<any> = {}>(
    Component: C,
    creator?: Styled<ComponentProps<C>["style"]>,
    configs?: StyledConfigs<V>
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
          const resolved = resolveSxValue(key, value as SxValue, theme as ThemeConfigs, width);
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

  const Text = styled(RNText);
  const TextInput = styled(RNTextInput);
  const View = styled(RNView);
  const Image = styled(RNImage);
  const TouchableOpacity = styled(RNTouchableOpacity);
  const ScrollView = styled(RNScrollView);
  const FlatList = styled(RNFlatList);
  const Pressable = styled(RNPressable);
  const KeyboardAvoidingView = styled(RNKeyboardAvoidingView);
  const AnimatedView = styled(Animated.View);
  const AnimatedText = styled(Animated.Text);
  const AnimatedImage = styled(Animated.Image);
  const AnimatedScrollView = styled(Animated.ScrollView);

  return {
    useTheme,
    makeStyles,
    useSx,
    useThemeFactory,
    useStyled,
    styled,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Pressable,
    KeyboardAvoidingView,
    AnimatedView,
    AnimatedText,
    AnimatedImage,
    AnimatedScrollView,
    variants,
  }
}