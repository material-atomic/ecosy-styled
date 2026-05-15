import type { LiteralObject } from "@ecosy/core";
import type { StyledBaseProps } from "../types/styled";

/**
 * A dictionary mapping shorthand property keys (like `p`, `m`, `bg`)
 * to an array of actual CSS/React Native style property names.
 */
export const KEYS_MAPPING = {
  p: ["padding"],
  pt: ["paddingTop"],
  pb: ["paddingBottom"],
  pl: ["paddingLeft"],
  pr: ["paddingRight"],
  ps: ["paddingStart"],
  pe: ["paddingEnd"],
  px: ["paddingLeft", "paddingRight"],
  py: ["paddingTop", "paddingBottom"],
  m: ["margin"],
  mt: ["marginTop"],
  mb: ["marginBottom"],
  ml: ["marginLeft"],
  mr: ["marginRight"],
  ms: ["marginStart"],
  me: ["marginEnd"],
  mx: ["marginLeft", "marginRight"],
  my: ["marginTop", "marginBottom"],
  bg: ["backgroundColor"],
  bc: ["borderColor"],
  c: ["color"],
  fs: ["fontSize"],
  fw: ["fontWeight"],
  ff: ["fontFamily"],
  lh: ["lineHeight"],
  ls: ["letterSpacing"],
  ta: ["textAlign"],
  justify: ["justifyContent"],
  align: ["alignItems"],
  direction: ["flexDirection"],
  wrap: ["flexWrap"],
  aspect: ["aspectRatio"],
  w: ["width"],
  minW: ["minWidth"],
  maxW: ["maxWidth"],
  h: ["height"],
  minH: ["minHeight"],
  maxH: ["maxHeight"],
  r: ["borderRadius"],
  bw: ["borderWidth"],
  z: ["zIndex"],
  pos: ["position"],
  rt: ["borderTopLeftRadius", "borderTopRightRadius"],
  rb: ["borderBottomLeftRadius", "borderBottomRightRadius"],
  rl: ["borderTopLeftRadius", "borderBottomLeftRadius"],
  rr: ["borderTopRightRadius", "borderBottomRightRadius"],
  rtl: ["borderTopLeftRadius"],
  rtr: ["borderTopRightRadius"],
  rbl: ["borderBottomLeftRadius"],
  rbr: ["borderBottomRightRadius"],
};

/**
 * Transforms an object containing shorthand style props into a standard style object
 * by iterating through `KEYS_MAPPING`. Properties not defined in the mapping are kept as-is.
 * 
 * @param props - An object containing partial styled base props.
 * @returns A style object with fully expanded property names.
 */
export function propsToStyle<Styles extends LiteralObject>(props: Partial<StyledBaseProps>) {
  return Object.entries(props).reduce((acc, [key, value]) => {
    if (Object.keys(KEYS_MAPPING).includes(key)) {
      KEYS_MAPPING[key as keyof typeof KEYS_MAPPING].forEach((k) => {
        acc[k as keyof Styles] = value as Styles[keyof Styles];
      });
    } else {
      acc[key as keyof Styles] = value as Styles[keyof Styles];
    }
    return acc;
  }, {} as Styles);
}
