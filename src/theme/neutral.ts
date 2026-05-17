import type { ThemePalette } from "../types/theme";
import { defaultComponents } from "./default";

const lightPalette: ThemePalette = {
  primary: "#171717",
  onPrimary: "#FFFFFF",
  secondary: "#404040",
  onSecondary: "#FFFFFF",
  background: "#FFFFFF",
  onBackground: "#0a0a0a",
  surface: "#fafafa",
  onSurface: "#0a0a0a",
  surfaceVariant: "#e5e5e5",
  onSurfaceVariant: "#171717",
  outline: "#d4d4d4",
  inverseSurface: "#171717",
  inverseOnSurface: "#FFFFFF",
  text: "#0a0a0a",
  textSecondary: "#737373",
  border: "#e5e5e5",
  error: "#ef4444",
  onError: "#FFFFFF",
  success: "#22c55e",
  onSuccess: "#FFFFFF",
};

const darkPalette: ThemePalette = {
  primary: "#fafafa",
  onPrimary: "#0a0a0a",
  secondary: "#d4d4d4",
  onSecondary: "#0a0a0a",
  background: "#0a0a0a",
  onBackground: "#fafafa",
  surface: "#171717",
  onSurface: "#fafafa",
  surfaceVariant: "#262626",
  onSurfaceVariant: "#fafafa",
  outline: "#404040",
  inverseSurface: "#fafafa",
  inverseOnSurface: "#171717",
  text: "#fafafa",
  textSecondary: "#a3a3a3",
  border: "#262626",
  error: "#f87171",
  onError: "#0a0a0a",
  success: "#4ade80",
  onSuccess: "#0a0a0a",
};

const theme = {
  light: {
    palette: lightPalette,
    components: defaultComponents,
  },
  dark: {
    palette: darkPalette,
    components: defaultComponents,
  },
};

export default theme;
