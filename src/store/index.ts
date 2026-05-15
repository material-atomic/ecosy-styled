import { createStore, type PayloadAction } from "@ecosy/store";
import { defaultThemes } from "../theme/default";
import type { ThemeState } from "../types/state";

const initialState: ThemeState = {
  mode: "light",
  themes: defaultThemes,
};

/**
 * The global styling store instantiated via `@ecosy/store`.
 * Contains the theme configurations and exposes actions to manipulate the active theme.
 * Both React and React Native styling engines depend on this central store.
 */
export const { store, actions } = createStore<ThemeState>({
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = (state.mode === "light" ? "dark" : "light") as ThemeState['mode'];
    },
    setTheme(state, action) {
      state.mode = (action as PayloadAction<string>).payload as ThemeState['mode'];
    },
  },
});
