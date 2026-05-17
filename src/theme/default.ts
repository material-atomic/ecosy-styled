import type { ThemeSize, ThemeSizeConfig } from "../types/theme";

const buttonSize: Record<ThemeSize, ThemeSizeConfig> = {
  "2xs": { height: 28, radius: 6, paddingHorizontal: 10, fontSize: 12, iconSize: 14, borderWidth: 1 },
  xs: { height: 36, radius: 8, paddingHorizontal: 12, fontSize: 13, iconSize: 16, borderWidth: 1 },
  sm: { height: 44, radius: 10, paddingHorizontal: 14, fontSize: 14, iconSize: 18, borderWidth: 1 },
  md: { height: 52, radius: 12, paddingHorizontal: 16, fontSize: 15, iconSize: 20, borderWidth: 1 },
  lg: { height: 60, radius: 14, paddingHorizontal: 18, fontSize: 16, iconSize: 22, borderWidth: 1 },
  xl: { height: 68, radius: 16, paddingHorizontal: 20, fontSize: 17, iconSize: 24, borderWidth: 1 },
  "2xl": { height: 76, radius: 18, paddingHorizontal: 22, fontSize: 18, iconSize: 26, borderWidth: 1 },
};

const inputSize: Record<ThemeSize, ThemeSizeConfig> = {
  "2xs": { height: 30, radius: 6, paddingHorizontal: 10, paddingVertical: 6, fontSize: 12, borderWidth: 1 },
  xs: { height: 38, radius: 8, paddingHorizontal: 12, paddingVertical: 8, fontSize: 13, borderWidth: 1 },
  sm: { height: 46, radius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, borderWidth: 1 },
  md: { height: 54, radius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, borderWidth: 1 },
  lg: { height: 62, radius: 14, paddingHorizontal: 18, paddingVertical: 14, fontSize: 16, borderWidth: 1 },
  xl: { height: 70, radius: 16, paddingHorizontal: 20, paddingVertical: 16, fontSize: 17, borderWidth: 1 },
  "2xl": { height: 78, radius: 18, paddingHorizontal: 22, paddingVertical: 18, fontSize: 18, borderWidth: 1 },
};

const cardSize: Record<ThemeSize, ThemeSizeConfig> = {
  "2xs": { height: 80, radius: 8, paddingHorizontal: 12, paddingVertical: 12, elevation: 1, shadowRadius: 2, gap: 8 },
  xs: { height: 96, radius: 10, paddingHorizontal: 14, paddingVertical: 14, elevation: 1, shadowRadius: 2, gap: 10 },
  sm: { height: 112, radius: 12, paddingHorizontal: 16, paddingVertical: 16, elevation: 2, shadowRadius: 3, gap: 12 },
  md: { height: 128, radius: 14, paddingHorizontal: 18, paddingVertical: 18, elevation: 2, shadowRadius: 4, gap: 14 },
  lg: { height: 144, radius: 16, paddingHorizontal: 20, paddingVertical: 20, elevation: 3, shadowRadius: 5, gap: 16 },
  xl: { height: 160, radius: 18, paddingHorizontal: 22, paddingVertical: 22, elevation: 3, shadowRadius: 6, gap: 18 },
  "2xl": { height: 176, radius: 20, paddingHorizontal: 24, paddingVertical: 24, elevation: 4, shadowRadius: 7, gap: 20 },
};

const avatarSize: Record<ThemeSize, ThemeSizeConfig> = {
  "2xs": { height: 24, radius: 12 },
  xs: { height: 32, radius: 16 },
  sm: { height: 40, radius: 20 },
  md: { height: 48, radius: 24 },
  lg: { height: 56, radius: 28 },
  xl: { height: 64, radius: 32 },
  "2xl": { height: 72, radius: 36 },
};

export const defaultComponents = {
  button: buttonSize,
  input: inputSize,
  card: cardSize,
  chip: buttonSize,
  dialog: cardSize,
  avatar: avatarSize,
};
