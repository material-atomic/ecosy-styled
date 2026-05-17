import type { ThemePalette } from "../types/theme";
import { defaultComponents } from "./default";

const lightPalette: ThemePalette = {
  primary: "#111827",
  onPrimary: "#FFFFFF",
  secondary: "#374151",
  onSecondary: "#FFFFFF",
  background: "#FFFFFF",
  onBackground: "#030712",
  surface: "#f9fafb",
  onSurface: "#030712",
  surfaceVariant: "#e5e7eb",
  onSurfaceVariant: "#111827",
  outline: "#d1d5db",
  inverseSurface: "#111827",
  inverseOnSurface: "#FFFFFF",
  text: "#030712",
  textSecondary: "#6b7280",
  border: "#e5e7eb",
  error: "#ef4444",
  onError: "#FFFFFF",
  success: "#22c55e",
  onSuccess: "#FFFFFF",
};

const darkPalette: ThemePalette = {
  primary: "#f9fafb",
  onPrimary: "#030712",
  secondary: "#d1d5db",
  onSecondary: "#030712",
  background: "#030712",
  onBackground: "#f9fafb",
  surface: "#111827",
  onSurface: "#f9fafb",
  surfaceVariant: "#1f2937",
  onSurfaceVariant: "#f9fafb",
  outline: "#374151",
  inverseSurface: "#f9fafb",
  inverseOnSurface: "#111827",
  text: "#f9fafb",
  textSecondary: "#9ca3af",
  border: "#1f2937",
  error: "#f87171",
  onError: "#030712",
  success: "#4ade80",
  onSuccess: "#030712",
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
