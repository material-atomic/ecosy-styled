import type { ThemePalette } from "../types/theme";
import { defaultComponents } from "./default";

const lightPalette: ThemePalette = {
  primary: "#1c1917",
  onPrimary: "#FFFFFF",
  secondary: "#44403c",
  onSecondary: "#FFFFFF",
  background: "#FFFFFF",
  onBackground: "#0c0a09",
  surface: "#fafaf9",
  onSurface: "#0c0a09",
  surfaceVariant: "#e7e5e4",
  onSurfaceVariant: "#1c1917",
  outline: "#d6d3d1",
  inverseSurface: "#1c1917",
  inverseOnSurface: "#FFFFFF",
  text: "#0c0a09",
  textSecondary: "#78716c",
  border: "#e7e5e4",
  error: "#ef4444",
  onError: "#FFFFFF",
  success: "#22c55e",
  onSuccess: "#FFFFFF",
};

const darkPalette: ThemePalette = {
  primary: "#fafaf9",
  onPrimary: "#0c0a09",
  secondary: "#d6d3d1",
  onSecondary: "#0c0a09",
  background: "#0c0a09",
  onBackground: "#fafaf9",
  surface: "#1c1917",
  onSurface: "#fafaf9",
  surfaceVariant: "#292524",
  onSurfaceVariant: "#fafaf9",
  outline: "#44403c",
  inverseSurface: "#fafaf9",
  inverseOnSurface: "#1c1917",
  text: "#fafaf9",
  textSecondary: "#a8a29e",
  border: "#292524",
  error: "#f87171",
  onError: "#0c0a09",
  success: "#4ade80",
  onSuccess: "#0c0a09",
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
