# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-05-17

### 🎉 Expanded Theme Ecosystem & Factory Modernization

This update brings a massive expansion to the built-in color palettes, dropping generic configurations in favor of 22 fully-typed, production-ready Hex-color themes (Tailwind v3 standard). It also modernizes the React and React Native factory functions (`createStyled`) for robust shorthand auto-detection.

### Features & Additions
- **22 New Named Palettes**: Generated 22 explicitly named, fully typed themes (e.g. `slate`, `zinc`, `red`, `emerald`, `indigo`, etc.) using standard Hex colors for maximum cross-platform compatibility.
- **Dynamic Theme Injection**: Refactored the core ThemeState to allow swapping entire theme variants dynamically at runtime via the generic `setThemes()` slice action.
- **Enhanced `createStyled` Factory**: Updated both React Web and React Native engine factories to fully support the `resolveSxValue` utility, allowing custom stores to automatically map shorthands like `c="text"` to the correct theme palette colors.
- **Auto-detected Text Colors**: Built-in React Native `Text`, `TextInput`, `AnimatedText`, and `AnimatedTextInput` components now seamlessly inherit `theme.palette.text` by default.

### Changes & Optimizations
- **Optimized Theme Imports**: Removed the `theme/index.ts` barrel file to prevent bloated bundle sizes. Each theme is now individually importable (e.g. `import slateThemes from "@ecosy/styled/theme/slate"`).
- **Default Theme Switch**: Replaced the legacy generic `defaultThemes` with `slateThemes` as the new global fallback theme for both Web and Mobile.
- **State Clean-up**: Removed the unnecessary internal `color` state variable from `ThemeState` to simplify the state model.

## [1.0.0] - 2026-05-15

### 🎉 Initial Release

This is the first stable, production-ready release of the `@ecosy/styled` styling engine! 

### Features
- **Core Engine**: A unified styling core supporting both React Web and React Native with 100% API parity.
- **`styled` HOC**: A highly-performant Higher-Order Component for wrapping HTML tags and React Native UI elements with shorthand styling support (`p`, `m`, `bg`, etc.).
- **Dynamic Theming**: Integrated closely with `@ecosy/store` via `getThemeSlice` to provide robust, centralized global state management for Light/Dark modes and theme configurations.
- **The `sx` Prop**: Built-in support for responsive breakpoints (`base`, `sm`, `md`, `lg`, `xl`, `2xl`), platform-specific selection (`web`, `ios`, `android`), and dynamic token resolution.
- **CVA-like Variants**: The `variants()` utility natively integrated into the `styled` HOC to build state-driven, highly customizable components with strongly-typed properties.
- **Exhaustive Type Definitions**: Deep integration with TypeScript. Every export, interface, shorthand property, and hook is fully documented with JSDocs to provide excellent IntelliSense for developers.
- **Optimized Compilation**: Exported as both CommonJS and ESModules with `rollup`, ensuring dead-code elimination and optimal bundler support.

