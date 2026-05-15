# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

