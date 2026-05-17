/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  combineSlices,
  createSlice,
  type ConfigureStoreOptions,
  type AnyAction,
  type CombineSlicesResult,
  type CreateSliceOptions,
  type PayloadAction,
  type Reducers,
  type Slice,
  type SliceMap
} from "@ecosy/store";
import { merge } from "@ecosy/core";
import slateThemes from "../theme/slate";
import type { ThemeState } from "../types/state";

const defaultState: ThemeState = {
  mode: "light",
  themes: slateThemes,
}

/**
 * Default reducers provided by the theme slice to toggle and set the active theme.
 */
export type DefaultReducers<State extends ThemeState = ThemeState> = {
  toggleTheme: (state: State) => void;
  setTheme(state: State, action: PayloadAction<State['mode']>): void;
};

export type ThemeSliceReducer<
  State extends ThemeState = ThemeState,
  R extends Reducers<State, AnyAction> = {}
> = DefaultReducers<State> & R;

/**
 * Generates a standard `@ecosy/store` slice specifically for theme management.
 * 
 * @param options - Custom slice options to extend initial state, reducers, or name.
 * @returns A fully configured theme Slice.
 */
export function getThemeSlice<
  State extends ThemeState,
  R extends Reducers<State, AnyAction>,
  N extends string
>(options: Partial<CreateSliceOptions<State, R, N>> = {}) {
  const {
    name = "@ecosy/styled/slice",
    reducers: extendReducers = {},
    initialState: optionState,
  } = options;

  const initialState = merge(defaultState, optionState) as State;

  const reducers: DefaultReducers<State> = {
    toggleTheme: (state) => {
      state.mode = (state.mode === "light" ? "dark" : "light") as State['mode'];
    },
    setTheme(state, action) {
      state.mode = (action as PayloadAction<string>).payload as State['mode'];
    },
  };

  return createSlice<State, ThemeSliceReducer<State, R>, N>({
    name,
    reducers: {
      ...reducers,
      ...extendReducers,
    },
    initialState,
  } as CreateSliceOptions<State, ThemeSliceReducer<State, R>, N>);
}

export type WithThemeSliceOptions<
  State extends ThemeState = ThemeState,
  R extends Reducers<State, AnyAction> = {},
  N extends string = string,
  Slices extends SliceMap<any> = {},
  Signals extends string[] = [],
> =
  & Partial<CreateSliceOptions<State, R, N>>
  & Partial<ConfigureStoreOptions<Slices, Signals>>;

/**
 * A utility to effortlessly combine custom slices with the global theme slice
 * to pass directly into `createStore`.
 * 
 * @param options - Configuration merging both slice and store options.
 * @returns A combined slices result integrating the theme alongside your custom slices.
 */
export function withThemeSlice<
  State extends ThemeState,
  Slices extends SliceMap<any>,
  R extends Reducers<State, AnyAction>,
  N extends string,
  Signals extends string[] = [],
>(options: WithThemeSliceOptions<State, R, N, Slices, Signals> = {}) {
  const { slices: extraSlices = {}, signals = [], ...themeOptions } = options;

  const theme = getThemeSlice<State, R, N>(themeOptions);

  const slices = combineSlices({
    ...extraSlices,
    theme,
  }) as CombineSlicesResult<Slices & {
    theme: Slice<State, ThemeSliceReducer<State, R>, N>;
  }>;

  return {
    slices,
    signals
  }
}
