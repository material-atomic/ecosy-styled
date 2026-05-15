import type { Theme, ThemePalette, Themes, ThemeSizeConfig } from "./theme";

/**
 * Represents the global state slice for the theming engine.
 * Stores the current active mode (e.g. 'light' or 'dark') and all available theme configurations.
 */
export interface ThemeState<
  Config extends ThemeSizeConfig = ThemeSizeConfig,
  Palette extends ThemePalette = ThemePalette,
  ThemeMode extends (Theme & string) = Theme
> {
  mode: ThemeMode;
  themes: Themes<Config, Palette, ThemeMode>;
}
