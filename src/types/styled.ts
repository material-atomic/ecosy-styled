import type { ThemeConfigs, ThemePalette } from "./theme";

/**
 * Represents a function that returns a styling object based on the current theme.
 */
export type StylesCreator<T, Configs extends ThemeConfigs = ThemeConfigs> = (theme: Configs) => T;

/**
 * A flexible style type that can either be a static style object or a function
 * that returns a style object when provided with the theme configuration.
 */
export type Styled<S, Configs extends ThemeConfigs = ThemeConfigs> = S | StylesCreator<S, Configs>;

/** Shorthand for padding style properties. */
export interface StyledPadding {
  /** Map to `padding`. */
  p: number;
  /** Map to `paddingLeft` and `paddingRight`. */
  px: number;
  /** Map to `paddingTop` and `paddingBottom`. */
  py: number;
  /** Map to `paddingLeft`. */
  pl: number;
  /** Map to `paddingRight`. */
  pr: number;
  /** Map to `paddingTop`. */
  pt: number;
  /** Map to `paddingBottom`. */
  pb: number;
  /** Map to `paddingStart`. */
  ps: number;
  /** Map to `paddingEnd`. */
  pe: number;
}

/** Shorthand for margin style properties. */
export interface StyledMargin {
  /** Map to `margin`. */
  m: number;
  /** Map to `marginLeft` and `marginRight`. */
  mx: number;
  /** Map to `marginTop` and `marginBottom`. */
  my: number;
  /** Map to `marginLeft`. */
  ml: number;
  /** Map to `marginRight`. */
  mr: number;
  /** Map to `marginTop`. */
  mt: number;
  /** Map to `marginBottom`. */
  mb: number;
  /** Map to `marginStart`. */
  ms: number;
  /** Map to `marginEnd`. */
  me: number;
}

/** Shorthand for color style properties. */
export interface StyledColors<Palette extends ThemePalette = ThemePalette> {
  /** Map to `backgroundColor`. */
  bg: string | keyof Palette;
  /** Map to `borderColor`. */
  bc: string | keyof Palette;
  /** Map to `color`. */
  c: string | keyof Palette;
}

/** Shorthand for font and typography style properties. */
export interface StyledFonts {
  /** Map to `fontSize`. */
  fs: number;
  /** Map to `fontFamily`. */
  ff: string;
  /** Map to `fontWeight`. */
  fw: number | string;
  /** Map to `lineHeight`. */
  lh: number;
  /** Map to `letterSpacing`. */
  ls: number | string;
}

/** Shorthand for text alignment property. */
export interface StyledAlign {
  /** Map to `textAlign`. */
  ta: string;
}

/** Standard flexbox style properties. */
export interface FlexStyle {
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: string;
  flexWrap?: string;
  aspectRatio?: string | number;
}

/** Shorthand for flexbox alignment style properties. */
export interface StyledFlexAlign<Flex extends FlexStyle = FlexStyle> {
  /** Map to `justifyContent`. */
  justify: Flex["justifyContent"];
  /** Map to `alignItems`. */
  align: Flex["alignItems"];
  /** Map to `flexDirection`. */
  direction: Flex["flexDirection"];
  /** Map to `flexWrap`. */
  wrap: Flex["flexWrap"];
  /** Map to `aspectRatio`. */
  aspect: Flex["aspectRatio"];
}

/** Shorthand for sizing and border radius style properties. */
export interface StyledSizes {
  /** Map to `width`. */
  w: number | string;
  /** Map to `minWidth`. */
  minW: number | string;
  /** Map to `maxWidth`. */
  maxW: number | string;
  /** Map to `height`. */
  h: number | string;
  /** Map to `minHeight`. */
  minH: number | string;
  /** Map to `maxHeight`. */
  maxH: number | string;
  /** Map to `borderRadius`. */
  r: number;
  /** Map to `borderTopLeftRadius` and `borderTopRightRadius`. */
  rt: number;
  /** Map to `borderBottomLeftRadius` and `borderBottomRightRadius`. */
  rb: number;
  /** Map to `borderTopLeftRadius` and `borderBottomLeftRadius`. */
  rl: number;
  /** Map to `borderTopRightRadius` and `borderBottomRightRadius`. */
  rr: number;
  /** Map to `borderTopLeftRadius`. */
  rtl: number;
  /** Map to `borderTopRightRadius`. */
  rtr: number;
  /** Map to `borderBottomLeftRadius`. */
  rbl: number;
  /** Map to `borderBottomRightRadius`. */
  rbr: number;
  /** Map to `borderWidth`. */
  bw: number;
}

/** Shorthand for positioning properties. */
export interface StyledPosition {
  /** Map to `position`. */
  pos: "absolute" | "relative" | "fixed" | "static" | "sticky";
  /** Map to `zIndex`. */
  z: number;
}

/**
 * The base interface representing all available styling shorthand properties.
 * These properties are mapped to their corresponding CSS/React Native style attributes.
 */
export type StyledBaseProps<
  Flex extends FlexStyle = FlexStyle,
  Palette extends ThemePalette = ThemePalette
> =
  & StyledPadding
  & StyledMargin
  & StyledColors<Palette>
  & StyledFonts
  & StyledAlign
  & StyledFlexAlign<Flex>
  & StyledSizes
  & StyledPosition;

/**
 * Represents the final properties object accepted by a Styled component.
 * Allows each property to be either a static value or a theme-dependent function.
 */
export type StyledProps<
  Flex extends FlexStyle = FlexStyle,
  Palette extends ThemePalette = ThemePalette
> = {
  [K in keyof StyledBaseProps<Flex, Palette>]?: Styled<StyledBaseProps<Flex, Palette>[K]>;
};
