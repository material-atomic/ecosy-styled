import type { ThemePalette } from "../types/theme";
import { defaultComponents } from "./default";

const lightPalette: ThemePalette = {
  primary: "#db2777",
  onPrimary: "#FFFFFF",
  secondary: "#9d174d",
  onSecondary: "#FFFFFF",
  background: "#FFFFFF",
  onBackground: "#020617",
  surface: "#f8fafc",
  onSurface: "#020617",
  surfaceVariant: "#e2e8f0",
  onSurfaceVariant: "#0f172a",
  outline: "#cbd5e1",
  inverseSurface: "#0f172a",
  inverseOnSurface: "#FFFFFF",
  text: "#020617",
  textSecondary: "#64748b",
  border: "#e2e8f0",
  error: "#ef4444",
  onError: "#FFFFFF",
  success: "#22c55e",
  onSuccess: "#FFFFFF",
};

const darkPalette: ThemePalette = {
  primary: "#ec4899",
  onPrimary: "#020617",
  secondary: "#f9a8d4",
  onSecondary: "#020617",
  background: "#020617",
  onBackground: "#f8fafc",
  surface: "#0f172a",
  onSurface: "#f8fafc",
  surfaceVariant: "#1e293b",
  onSurfaceVariant: "#f8fafc",
  outline: "#334155",
  inverseSurface: "#f8fafc",
  inverseOnSurface: "#0f172a",
  text: "#f8fafc",
  textSecondary: "#94a3b8",
  border: "#1e293b",
  error: "#f87171",
  onError: "#020617",
  success: "#4ade80",
  onSuccess: "#020617",
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
