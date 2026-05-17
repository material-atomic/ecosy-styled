import type { ThemePalette } from "../types/theme";
import { defaultComponents } from "./default";

const lightPalette: ThemePalette = {
  primary: "#18181b",
  onPrimary: "#FFFFFF",
  secondary: "#3f3f46",
  onSecondary: "#FFFFFF",
  background: "#FFFFFF",
  onBackground: "#09090b",
  surface: "#fafafa",
  onSurface: "#09090b",
  surfaceVariant: "#e4e4e7",
  onSurfaceVariant: "#18181b",
  outline: "#d4d4d8",
  inverseSurface: "#18181b",
  inverseOnSurface: "#FFFFFF",
  text: "#09090b",
  textSecondary: "#71717a",
  border: "#e4e4e7",
  error: "#ef4444",
  onError: "#FFFFFF",
  success: "#22c55e",
  onSuccess: "#FFFFFF",
};

const darkPalette: ThemePalette = {
  primary: "#fafafa",
  onPrimary: "#09090b",
  secondary: "#d4d4d8",
  onSecondary: "#09090b",
  background: "#09090b",
  onBackground: "#fafafa",
  surface: "#18181b",
  onSurface: "#fafafa",
  surfaceVariant: "#27272a",
  onSurfaceVariant: "#fafafa",
  outline: "#3f3f46",
  inverseSurface: "#fafafa",
  inverseOnSurface: "#18181b",
  text: "#fafafa",
  textSecondary: "#a1a1aa",
  border: "#27272a",
  error: "#f87171",
  onError: "#09090b",
  success: "#4ade80",
  onSuccess: "#09090b",
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
